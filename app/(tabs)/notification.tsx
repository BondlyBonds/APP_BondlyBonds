import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function NotificationPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Notifications Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
  text: { color: "#00ffcc", fontSize: 20, fontWeight: "bold" },
});
