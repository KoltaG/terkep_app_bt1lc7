import React, { useState, useCallback, useRef, useMemo } from "react";
import {
  StyleSheet,
  Animated,
  View,
  Image,
  SafeAreaView,
  Text,
} from "react-native";

export default function TabTwoScreen() {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
