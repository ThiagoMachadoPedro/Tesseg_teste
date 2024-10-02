import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  textCnpj: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  inputCnpj: {
    backgroundColor: "#cccccc",
    padding: 13,
    marginBottom: 10,
    fontSize: 18,
    borderRadius: 10,
    color: "#333333",
  },
  buttonFindAll: {
    backgroundColor: "#ff9933",
    color: "white",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  dataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  inputField: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonExitEdit: {
    backgroundColor: "#ff3333",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonSaveUpdate: {
    color: "white",
    backgroundColor: "blue",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginVertical: 10,
  },
  nomeEmpresa: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cnpj: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logradouro: {
    fontSize: 16,
  },
  numero: {
    fontSize: 16,
  },
  bairro: {
    fontSize: 16,
  },
  estado: {
    fontSize: 16,
  },
  contato: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default styles;
