import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../../firebaseConfig";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // To handle loading state
  const [initialCheck, setInitialCheck] = useState(false); // To avoid conflicting with splash screen

  useEffect(() => {
    // Perform initial check after splash screen interaction
    if (!initialCheck) return;

    // Check user authentication status
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user is logged in, navigate to feeds
        router.replace("/(tabs)/feeds");
      } else {
        // If not logged in, navigate to login/signup
        router.replace("/login");
      }
      setLoading(false); // Stop loading once redirection is handled
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, [initialCheck]);

  useEffect(() => {
    // Simulating splash screen completion by waiting for user interaction
    setTimeout(() => setInitialCheck(true), 500); // Replace 500 with your dynamic splash trigger
  }, []);

  if (loading || !initialCheck) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ffcc" />
      </View>
    );
  }

  return null; // This screen won't render anything as redirection happens
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
});
