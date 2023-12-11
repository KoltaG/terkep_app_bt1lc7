import React, { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type TMenuCard = {
  enabled: boolean;
  title: string;
  onTap: () => void;
  onTapDownload?: () => void;
};
const MenuCard: FC<TMenuCard> = ({ title, onTap, onTapDownload, enabled }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
      }}
    >
      <TouchableOpacity style={styles.button} onPress={onTap}>
        <View
          style={{
            backgroundColor: enabled ? "green" : "orange",
            height: 40,
            width: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 16,
          }}
        >
          <Image
            source={require("../../assets/images/palette.png")}
            resizeMode={"stretch"}
            style={styles.img}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      {onTapDownload && (
        <TouchableOpacity style={styles.button} onPress={onTapDownload}>
          <View
            style={{
              backgroundColor: "orange",
              height: 40,
              width: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
            }}
          >
            <Image
              source={require("../../assets/images/download.png")}
              resizeMode={"stretch"}
              style={styles.img}
            />
          </View>
          <Text style={styles.title}>Letöltés</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MenuCard;

const styles = StyleSheet.create({
  title: {
    color: "#241f1f",
    fontSize: 14,
    marginTop: 8,
    fontWeight: "500",
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
  },
  img: {
    height: 24,
    width: 24,
    tintColor: "white",
  },
});
