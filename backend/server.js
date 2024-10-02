const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");
const path = require("path");
const fs = require("fs");

const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do armazenamento do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome do arquivo
  },
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados
const dbConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "tesseg",
};

const connectDb = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Conectado ao banco de dados MySQL");
    return connection;
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
};

app.post("/api/empresas", upload.single("imagem"), async (req, res) => {
  const { nome, cnpj, logradouro, numero, bairro, estado, telefone } = req.body;
  const imagem = req.file ? req.file.path : "";

  if (
    !cnpj ||
    !nome ||
    !logradouro ||
    !numero ||
    !bairro ||
    !estado ||
    !telefone
  ) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const connection = await connectDb();
  const sql =
    "INSERT INTO empresas (cnpj, nome, logradouro, numero, bairro, estado, telefone, imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    const [result] = await connection.execute(sql, [
      cnpj,
      nome,
      logradouro,
      numero,
      bairro,
      estado,
      telefone,
      imagem || null,
    ]);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error("Erro ao inserir dados:", error);
    res.status(500).json({ error: "Erro ao salvar os dados." });
  } finally {
    connection.end();
  }
});

app.get("/api/empresas", async (req, res) => {
  const connection = await connectDb();
  const page = parseInt(req.query.page) || 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  const offset = (page - 1) * (limit || 0);

  try {
    let empresasQuery;
    let queryParams;

    if (limit) {
      empresasQuery =
        "SELECT SQL_CALC_FOUND_ROWS * FROM empresas LIMIT ? OFFSET ?";
      queryParams = [limit, offset];
    } else {
      empresasQuery = "SELECT * FROM empresas";
      queryParams = [];
    }

    // console.log("Executando consulta:", empresasQuery, queryParams);

    const [empresas] = await connection.execute(empresasQuery, queryParams);

    let total = empresas.length;

    if (limit) {
      const [count] = await connection.execute("SELECT FOUND_ROWS() AS total");
      total = count[0].total;
    }

    // Retorna os dados encontrados
    res.json({
      total,
      page,
      limit: limit || "all",
      data: empresas,
    });
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res
      .status(500)
      .json({ error: "Erro ao buscar dados", details: error.message });
  } finally {
    connection.end();
  }
});

app.put("/api/empresas/:id", async (req, res) => {
  const { id } = req.params;
  const { cnpj, nome, logradouro, numero, bairro, estado, telefone, imagem } =
    req.body;

  // Log dos dados recebidos
  // console.log("Dados recebidos para atualização:", {
  //   cnpj,
  //   nome,
  //   logradouro,
  //   numero,
  //   bairro,
  //   estado,
  //   telefone,
  //   imagem,
  // });

  const connection = await connectDb();

  try {
    if (!cnpj || !nome) {
      return res.status(400).json({ error: "CNPJ e Nome são obrigatórios." });
    }

    await connection.execute(
      "UPDATE empresas SET cnpj = ?, nome = ?, logradouro = ?, numero = ?, bairro = ?, estado = ?, telefone = ?, imagem = ? WHERE id = ?",
      [
        cnpj,
        nome,
        logradouro || null,
        numero || null,
        bairro || null,
        estado || null,
        telefone || null,
        imagem || null,
        id,
      ]
    );
    res.json({ message: "Empresa atualizada com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar empresa:", error);
    res.status(500).json({ error: "Erro ao atualizar empresa." });
  } finally {
    connection.end();
  }
});

app.delete("/api/empresas/:id", async (req, res) => {
  const { id } = req.params;
  const connection = await connectDb();

  try {
    await connection.execute("DELETE FROM empresas WHERE id = ?", [id]);
    res.json({ message: "Empresa excluída com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir empresa:", error);
    res.status(500).json({ error: "Erro ao excluir empresa." });
  } finally {
    connection.end();
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
