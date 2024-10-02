import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Header from "./src/components/Header";
import Form from "./src/screens/Form";

export default function App() {
  return (
    <View style={styles.appContainer}>
      <Header />
      <FlatList
        data={[{}]}
        renderItem={() => <Form />}
        keyExtractor={(item, index) => index.toString()}
        style={styles.container}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5fffb",
  },
});
