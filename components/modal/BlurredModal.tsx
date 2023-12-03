import { BlurView } from "expo-blur";
import { StyleSheet, View, Modal, TouchableOpacity, Text } from "react-native";

interface BlurredModalProps {
  id: string;
  openModalId: string;
  setOpenModalId: (openModalId: string) => void;
  children?: React.ReactNode;
}

export default function BlurredModal({
  id,
  openModalId,
  setOpenModalId,
  children,
}: BlurredModalProps) {
  const styles = StyleSheet.create({
    container: {
      width: "95%",
      maxWidth: 900,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 24,
      paddingHorizontal: 16,
      borderRadius: 30,
      shadowOffset: { width: 0, height: 2 },
      shadowColor: "grey",
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 10, // for android
      // position: "relative",
      minHeight: 318,
    },
  });

  const onClose = () => {
    setOpenModalId("");
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={openModalId === id}
      onRequestClose={onClose}
    >
      <BlurView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.container}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                top: 12,
                right: 12,

                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <Text>Close</Text>
              </View>
            </TouchableOpacity>
            {children}
          </View>
        </View>
      </BlurView>
    </Modal>
  );
}
