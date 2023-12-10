import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import BlurredModal from "./BlurredModal";
import { Polygon } from "../../app/(tabs)";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

const placeholder = require("../../assets/images/placeholder.png");

interface EditPolygonModalProps {
  id: string;
  openModalId: string;
  setOpenModalId: (openModalId: string) => void;
  currentPolygonId: string;
  polygons: Polygon[];
  setPolygons: (polygons: Polygon[]) => void;
}

const EditPolygonModal = ({
  id,
  openModalId,
  setOpenModalId,
  currentPolygonId,
  polygons,
  setPolygons,
}: EditPolygonModalProps) => {
  const [currentPolygon, setCurrentPolygon] = useState<Polygon | null>(null);

  useEffect(() => {
    // Find the current polygon based on currentPolygonId
    const foundPolygon = polygons.find(
      (polygon) => polygon.id === currentPolygonId
    );
    setCurrentPolygon(foundPolygon || null);
  }, [currentPolygonId, polygons]);

  const onClose = () => {
    setOpenModalId("");
  };

  const handleNameChange = (value: string) => {
    if (currentPolygon) {
      const updatedPolygons = polygons.map((polygon) =>
        polygon.id === currentPolygon.id ? { ...polygon, name: value } : polygon
      );
      setPolygons(updatedPolygons);
    }
  };

  const handleImageChange = (value: string) => {
    if (currentPolygon) {
      const updatedPolygons = polygons.map((polygon) =>
        polygon.id === currentPolygon.id
          ? { ...polygon, imgPath: value }
          : polygon
      );
      setPolygons(updatedPolygons);
    }
  };

  const handleRemovePolygon = () => {
    if (currentPolygon) {
      const updatedPolygons = polygons.filter(
        (polygon) => polygon.id !== currentPolygon.id
      );
      setPolygons(updatedPolygons);
      onClose();
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Engedélyezd a kamera használatát a beállításokban!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      handleImageChange(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      handleImageChange(result.assets[0].uri);
    }
  };

  return (
    <BlurredModal
      id={id}
      openModalId={openModalId}
      setOpenModalId={setOpenModalId}
    >
      <View
        style={{
          width: "100%",
          paddingTop: 32,
        }}
      >
        <Text>id</Text>
        <TextInput style={styles.input} value={currentPolygon?.id || ""} />
        <Text>Terület neve</Text>
        <TextInput
          style={styles.input}
          value={currentPolygon?.name || ""}
          onChangeText={handleNameChange}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <Text>Kép</Text>
          <TouchableOpacity onPress={() => handleImageChange("")}>
            <Text style={{ color: "#f5737a" }}>Kép törlése</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => pickImage()}
          style={{ marginBottom: 12 }}
        >
          <Image
            source={
              currentPolygon?.imgPath
                ? { uri: currentPolygon?.imgPath }
                : placeholder
            }
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={[styles.dangerButton, { marginRight: 12 }]}
          onPress={handleRemovePolygon}
        >
          <Text style={styles.buttonText}>Poligon törlése</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.successButton]}
          onPress={() => setOpenModalId("")}
        >
          <Text style={styles.buttonText}>Poligon mentése</Text>
        </TouchableOpacity>
      </View>
    </BlurredModal>
  );
};

export default EditPolygonModal;

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    height: 200,
    width: "100%",
  },
  input: {
    fontSize: 15,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderColor: "grey",
    borderWidth: 1,
    marginBottom: 24,
  },
  dangerButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#f5737a",
  },
  buttonText: {
    color: "white",
  },
  successButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#59b259",
  },
});
