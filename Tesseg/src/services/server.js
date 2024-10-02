import axios from "axios";
import { consultaCNPJ } from "./api";

const API_URL = "http://192.168.15.15:3000/api/empresas";

export const buscarEmpresaPorCNPJ = async (cnpj) => {
  if (cnpj.length === 18) {
    try {
      const data = await consultaCNPJ(cnpj.replace(/\D/g, ""));
      return data;
    } catch (error) {
      throw new Error("Erro ao buscar CNPJ");
    }
  } else {
    throw new Error("CNPJ inválido. Verifique o formato.");
  }
};

export const salvarEmpresa = async (empresaData) => {
  // Validação dos campos
  if (
    !empresaData.cnpj ||
    !empresaData.nome ||
    !empresaData.logradouro ||
    !empresaData.numero ||
    !empresaData.bairro ||
    !empresaData.uf ||
    !empresaData.telefone
  ) {
    throw new Error("❌ Erro: Todos os campos devem ser preenchidos.");
  }

  try {
    const response = await axios.post(API_URL, {
      cnpj: empresaData.cnpj.replace(/\D/g, ""),
      nome: empresaData.nome,
      logradouro: empresaData.logradouro,
      numero: empresaData.numero,
      bairro: empresaData.bairro,
      estado: empresaData.uf,
      telefone: empresaData.telefone,
      imagem: empresaData.imagem,
    });


    const message = response.data.message || "✅ Dados salvos com sucesso!";
    return message;
  } catch (error) {

    const errorMessage =
      "❌ Erro: Não foi possível salvar os dados. Tente novamente.";
    throw new Error(errorMessage);
  }
};


export const atualizarEmpresa = async (empresaData, currentEditingId) => {
  try {
    const requestData = {
      cnpj: empresaData.cnpj.replace(/\D/g, ""),
      nome: empresaData.nome,
      logradouro: empresaData.logradouro,
      numero: empresaData.numero,
      bairro: empresaData.bairro,
      estado: empresaData.uf,
      telefone: empresaData.telefone,
    };

    if (empresaData.imagem) {
      requestData.imagem = empresaData.imagem;
    }

    await axios.put(`${API_URL}/${currentEditingId}`, requestData);
   
    return "✅ Empresa atualizada com sucesso!";
  } catch (error) {
    console.error(
      "Erro ao atualizar empresa:",
      error.response ? error.response.data : error.message
    );
    const errorMessage =
      "❌ Erro ao atualizar empresa: " +
      (error.response ? error.response.data : error.message);
    alert(errorMessage);
    throw new Error(errorMessage);
  }
};

export const buscarEmpresas = async (currentPage, limit) => {
  try {
    const response = await axios.get(
      `${API_URL}?page=${currentPage}&limit=${limit}`
    );
    if (response.data && Array.isArray(response.data.data)) {
      return {
        empresas: response.data.data,
        total: response.data.total,
      };
    } else {
      throw new Error("Estrutura de resposta inesperada");
    }
  } catch (error) {
    throw new Error("Erro ao buscar empresas.");
  }
};
