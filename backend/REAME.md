CREATE TABLE empresas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cnpj VARCHAR(14) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  logradouro VARCHAR(255),
  numero VARCHAR(10),
  bairro VARCHAR(100),
  estado VARCHAR(2),
  telefone VARCHAR(15),
  imagem VARCHAR(255)
);
