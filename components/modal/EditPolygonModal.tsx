import React, { useState, useEffect } from "react";
import { Button, Text, TextInput, View } from "react-native";
import BlurredModal from "./BlurredModal";
import { Polygon } from "../../app/(tabs)";

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

  return (
    <BlurredModal
      id={id}
      openModalId={openModalId}
      setOpenModalId={setOpenModalId}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          paddingTop: 32,
        }}
      >
        <Text>id</Text>
        <TextInput
          style={{ borderColor: "grey", borderWidth: 1, marginBottom: 24 }}
          value={currentPolygon?.id || ""}
        />
        <Text>Terület neve</Text>
        <TextInput
          style={{ borderColor: "grey", borderWidth: 1, marginBottom: 24 }}
          value={currentPolygon?.name || ""}
          onChangeText={handleNameChange}
        />
        <Text>Kép</Text>
        <TextInput
          style={{ borderColor: "grey", borderWidth: 1, marginBottom: 32 }}
          value={currentPolygon?.imgPath || ""}
          onChangeText={handleImageChange}
        />
      </View>
      <Button title="Remove Polygon" onPress={handleRemovePolygon} />
    </BlurredModal>
  );
};

export default EditPolygonModal;
