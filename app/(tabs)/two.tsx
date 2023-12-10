import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Térinformatika gyakorlat demo alkalmazás</Text>
      <Text style={{ marginBottom: 12 }}>
        Az alkalmazás oktatási célra készült
      </Text>
      <Text>Készítette: Koltai Balázs BT1LC7</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  panel: {
    flexDirection: "column",
    bottom: "0%",
    width: "100%",
    height: "20%",
    backgroundColor: "white",
    position: "absolute",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  title: {
    color: "#241f1f",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    alignSelf: "center",
  },
  img: {
    height: 18,
    width: 18,
    tintColor: "white",
  },
  map: {
    flex: 1,
  },

  card: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: "orange",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
