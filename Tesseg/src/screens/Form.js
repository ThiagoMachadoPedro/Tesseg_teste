import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import {
  buscarEmpresaPorCNPJ,
  salvarEmpresa,
  buscarEmpresas,
  atualizarEmpresa,
} from "../services/server";
import Table from "../components/Table";
import styles from "../components/FormStyles";
import * as ImagePicker from "expo-image-picker";

const Form = () => {
  const [cnpj, setCNPJ] = useState("");
  const [empresaData, setEmpresaData] = useState(null);
  const [imagem, setImagem] = useState("");
  const [empresas, setEmpresas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(5);
  const [editing, setEditing] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState(null);

  const handleCNPJSearch = async () => {
    try {
      const data = await buscarEmpresaPorCNPJ(cnpj);
      setEmpresaData(data);
      setImagem(data.imagem || "");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      const payload = { ...empresaData, imagem };
      if (editing) {
        const message = await atualizarEmpresa(payload, currentEditingId);
        alert(message);
      } else {
        const message = await salvarEmpresa(payload);
        alert(message);
      }

      resetForm();
      fetchEmpresas();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert(
        "Erro",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  const resetForm = () => {
    setCNPJ("");
    setEmpresaData(null);
    setImagem("");
    setEditing(false);
    setCurrentEditingId(null);
  };

  const fetchEmpresas = async () => {
    try {
      const { empresas, total } = await buscarEmpresas(currentPage, limit);
      setEmpresas(empresas);
      setTotal(total);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchEmpresas();
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Empresas</Text>

      <Text style={styles.textCnpj}>CNPJ:</Text>
      <TextInputMask
        type={"cnpj"}
        value={cnpj}
        onChangeText={setCNPJ}
        placeholder="Digite o CNPJ"
        style={styles.inputCnpj}
      />
      <TouchableOpacity style={styles.buttonFindAll} onPress={handleCNPJSearch}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Buscar CNPJ</Text>
      </TouchableOpacity>

      {empresaData && (
        <View style={styles.dataContainer}>
          {editing ? (
            <>
              {/* Campos do formulário */}
              <Text style={styles.label}>Nome da Empresa:</Text>
              <TextInput
                value={empresaData.nome}
                onChangeText={(text) =>
                  setEmpresaData({ ...empresaData, nome: text })
                }
                placeholder="Nome da Empresa"
                style={styles.inputField}
              />

              <Text style={styles.label}>CNPJ</Text>
              <TextInput
                value={empresaData.cnpj}
                onChangeText={(text) =>
                  setEmpresaData({ ...empresaData, cnpj: text })
                }
                placeholder="CNPJ"
                style={styles.inputField}
              />

              <Text style={styles.label}>Endereço</Text>
              <TextInput
                value={empresaData.logradouro}
                onChangeText={(text) =>
                  setEmpresaData({ ...empresaData, logradouro: text })
                }
                placeholder="Endereço"
                style={styles.inputField}
              />

              <Text style={styles.label}>Número</Text>
              <TextInput
                value={empresaData.numero}
                onChangeText={(text) =>
                  setEmpresaData({ ...empresaData, numero: text })
                }
                placeholder="Endereço"
                style={styles.inputField}
              />

              <Text style={styles.label}>Bairro</Text>
              <TextInput
                value={empresaData.bairro}
                onChangeText={(text) =>
                  setEmpresaData({ ...empresaData, bairro: text })
                }
                placeholder="Bairro"
                style={styles.inputField}
              />

              <Text style={styles.label}>Estado</Text>
              <TextInput
                value={empresaData.estado}
                onChangeText={(text) =>
                  setEmpresaData({ ...empresaData, estado: text })
                }
                placeholder="Estado"
                style={styles.inputField}
              />

              <Text style={styles.label}>Telefone</Text>
              <TextInput
                value={empresaData.telefone}
                onChangeText={(text) =>
                  setEmpresaData({ ...empresaData, telefone: text })
                }
                placeholder="Telefone"
                style={styles.inputField}
              />

              <Text style={styles.label}>Imagem:</Text>
              <TouchableOpacity onPress={handleImagePick}>
                <Text style={{ color: "blue" }}>Selecionar Imagem</Text>
              </TouchableOpacity>
              {imagem ? (
                <Image source={{ uri: imagem }} style={styles.image} />
              ) : (
                <Text>Nenhuma imagem selecionada.</Text>
              )}
            </>
          ) : (
            <View>
              <Text style={styles.label}>Nome da Empresa:</Text>
              <Text style={styles.value}>{empresaData.nome}</Text>

              <Text style={styles.label}>CNPJ</Text>
              <Text style={styles.value}>{empresaData.cnpj}</Text>

              <Text style={styles.label}>Endereço</Text>
              <Text style={styles.value}>{empresaData.logradouro}</Text>

              <Text style={styles.label}>Número</Text>
              <Text style={styles.value}>{empresaData.numero}</Text>

              <Text style={styles.label}>Bairro</Text>
              <Text style={styles.value}>{empresaData.bairro}</Text>

              <Text style={styles.label}>Estado</Text>
              <Text style={styles.value}>{empresaData.estado}</Text>

              <Text style={styles.label}>Imagem:</Text>
              <TouchableOpacity onPress={handleImagePick}>
                  <Text style={{ color: "blue" }}>Selecionar Imagem</Text>
              </TouchableOpacity>
              {imagem ? (
                <Image source={{ uri: imagem }} style={styles.image} />
              ) : (
                <Text>Nenhuma imagem selecionada.</Text>
              )}
            </View>
          )}
        </View>
      )}

      <TouchableOpacity style={styles.buttonSaveUpdate} onPress={handleSave}>
        <Text style={styles.buttonText}>
          {editing ? "Atualizar" : "Salvar"}
        </Text>
      </TouchableOpacity>

      {editing && (
        <TouchableOpacity style={styles.buttonExitEdit} onPress={resetForm}>
          <Text style={styles.buttonText}>Sair do Editar</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.title}>Empresas Cadastradas</Text>
      <Table
        fetchEmpresas={fetchEmpresas}
        empresas={empresas}
        setEmpresas={setEmpresas}
        setEditing={setEditing}
        setCurrentEditingId={setCurrentEditingId}
        setEmpresaData={setEmpresaData}
        setCNPJ={setCNPJ}
        setImagem={setImagem}
      />

      <View style={styles.pagination}>
        <Button
          title="Anterior"
          onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        <Text>
          Página {currentPage} de {Math.ceil(total / limit)}
        </Text>
        <Button
          title="Próximo"
          onPress={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(total / limit))
            )
          }
          disabled={currentPage * limit >= total}
        />
      </View>
    </View>
  );
};

export default Form;
