import React, { useState, useCallback, useRef, useMemo } from "react";
import {
  StyleSheet,
  Animated,
  View,
  Image,
  SafeAreaView,
  Text,
} from "react-native";
import MapViewGestures from "@dev-event/react-native-maps-draw";
import MapView, { Polygon, Marker } from "react-native-maps";
import MenuCard from "../../components/menuCard";
import EditPolygonModal from "../../components/modal/EditPolygonModal";
import { v4 as uuidv4 } from "uuid";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

export interface Polygon {
  id: string;
  name: string;
  imgPath: string;
  centerLatLng?: {
    latitude: number;
    longitude: number;
  };
  distance?: number;
  initialLatLng?: {
    latitude: number;
    longitude: number;
  };
  lastLatLng?: {
    latitude: number;
    longitude: number;
  };
  polygons: {
    latitude: number;
    longitude: number;
  }[];
}

export default function TabOneScreen() {
  const mapRef = useRef<MapView>(null);

  type TTouchPoint = {
    x: number;
    y: number;
  };

  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [points, setPoints] = useState<TTouchPoint[]>([]);
  const [isActiveDraw, setDrawMode] = useState<boolean>(false);
  const [openModalId, setOpenModalId] = useState<string>("");
  const [currentPolygonId, setCurrentPolygonId] = useState<string>("");

  const handleMapReady = useCallback(() => {
    mapRef.current && setIsReady(true);
  }, []);

  const convertByPoint = async (item: any) =>
    await mapRef.current?.coordinateForPoint(item);

  const handleCanvasEndDraw = useCallback(
    (locations: any) => {
      const closedPolygon = {
        id: uuidv4(), // Generate a unique ID (you may need to install a library like uuid for this)
        name: "", // Set a default name or prompt the user for input
        imgPath: "", // Set a default image path or prompt the user for input
        ...locations,
        polygons: [...locations.polygons, locations.polygons[0]],
      };
      setCurrentPolygonId(closedPolygon.id);
      setOpenModalId("modal");
      setPolygons([...polygons, closedPolygon]);
      setDrawMode(false);
    },
    [polygons]
  );

  const isVisiblePolygons = useMemo(
    () => isReady && polygons && polygons.length > 0,
    [isReady, polygons]
  );

  const timestamp = Date.now();

  const downloadJsonFile = async () => {
    try {
      const jsonContent = JSON.stringify(polygons, null, 2); // Convert object to JSON string with formatting

      const fileUri = `${FileSystem.documentDirectory}poligons-${timestamp}.json`;

      await FileSystem.writeAsStringAsync(fileUri, jsonContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // Open the file for the user to share or view
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error("Error downloading JSON file:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <MapView ref={mapRef} style={styles.map} onMapReady={handleMapReady}>
          {isVisiblePolygons &&
            polygons.map((polygon, index) => (
              <React.Fragment key={index}>
                {polygon.centerLatLng && (
                  <Marker
                    onPress={() => {
                      setOpenModalId("modal");
                      setCurrentPolygonId(polygon.id);
                    }}
                    coordinate={polygon.centerLatLng}
                  >
                    <View style={styles.card}>
                      <Image
                        source={require("../../assets/images/location.png")}
                        resizeMode={"stretch"}
                        style={styles.img}
                      />
                    </View>
                  </Marker>
                )}
                <AnimatedPolygon
                  coordinates={polygon.polygons}
                  fillColor="rgba(255, 171, 171, 0.5)"
                  strokeColor="rgba(255, 171, 171, 0.88)"
                  strokeWidth={1}
                />
              </React.Fragment>
            ))}
        </MapView>

        {isActiveDraw && (
          <MapViewGestures
            points={points}
            widthLine={3}
            colorLine={"green"}
            onEndDraw={handleCanvasEndDraw}
            onChangePoints={setPoints}
            backgroundCanvas={"rgba(0, 0, 0, 0.0)"}
            convertByPoint={convertByPoint}
          />
        )}
      </View>
      <View style={styles.panel}>
        <Text style={styles.title}>Menu</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <MenuCard
            enabled={isActiveDraw}
            title={"Hozzáadás"}
            onTap={() => {
              setPoints([]);
              setDrawMode(!isActiveDraw);
            }}
            onTapDownload={() => downloadJsonFile()}
          />
        </View>
      </View>
      <EditPolygonModal
        id={"modal"}
        openModalId={openModalId}
        setOpenModalId={setOpenModalId}
        polygons={polygons}
        setPolygons={setPolygons}
        currentPolygonId={currentPolygonId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
