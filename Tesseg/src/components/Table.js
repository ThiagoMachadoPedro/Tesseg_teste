import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import styles from "./TableStyles";

const Table = ({
  fetchEmpresas,
  empresas,
  setEditing,
  setCurrentEditingId,
  setEmpresaData,
  setCNPJ,
  setImagem,
}) => {
  const handleEdit = (empresa) => {
    setEmpresaData(empresa);
    setImagem(empresa.imagem);
    setCNPJ(empresa.cnpj);
    setCurrentEditingId(empresa.id);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir esta empresa?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: async () => {
          try {
            await axios.delete(`http://192.168.15.15:3000/api/empresas/${id}`);
            alert("Empresa excluída com sucesso.");
            fetchEmpresas();
          } catch (error) {
            console.error("Erro ao excluir empresa:", error);
            alert("Erro ao excluir empresa.");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.dataContainer}>
      <Text>Nome da Empresa: {item.nome}</Text>
      <Text>CNPJ: {item.cnpj}</Text>
      <Text>Logradouro: {item.logradouro}</Text>
      <Text>Número: {item.numero}</Text>
      <Text>Bairro: {item.bairro}</Text>
      <Text>Estado: {item.estado}</Text>
      <Text>Contato: {item.telefone}</Text>
      {item.imagem && (
        <Image source={{ uri: item.imagem }} style={styles.image} />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton} 
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={empresas}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.list}
    />
  );
};


export default Table;
