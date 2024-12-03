import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function PremiumPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Premium Features</Text>
      <Text style={styles.description}>
        Unlock exclusive features like advanced analytics, priority support, and more.
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Subscribe Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
  title: { fontSize: 24, color: "#00ffcc", marginBottom: 10 },
  description: { color: "#aaa", fontSize: 16, textAlign: "center", marginBottom: 20 },
  button: { backgroundColor: "#00ffcc", padding: 15, borderRadius: 8 },
  buttonText: { color: "#121212", fontWeight: "bold" },
});
