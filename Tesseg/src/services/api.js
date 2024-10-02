import axios from "axios";


export const consultaCNPJ = async (cnpj) => {
  try {
    const response = await axios.get(
      `https://www.receitaws.com.br/v1/cnpj/${cnpj}`
    );

    // console.log(response.data) essa api não retorna imagem =(
    return response.data;
  } catch (error) {
    console.error("Erro ao consultar CNPJ:", error);
    throw error;
  }
};
