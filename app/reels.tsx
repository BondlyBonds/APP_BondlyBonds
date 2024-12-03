import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, PanResponder } from "react-native";
import { collection, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../firebaseConfig";

const { width, height } = Dimensions.get("window");

// Define the structure of a reel
interface Reel {
  videoUrl: string;
  caption: string;
}

export default function ReelsPage() {
  const [reels, setReels] = useState<Reel[]>([]); // Explicitly typed state
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reels"), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data() as Reel); // Cast data to Reel type
      setReels(data);
    });
    return () => unsubscribe();
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dx > 50) {
        alert("Swipe Right: Request Work");
      } else if (gestureState.dx < -50) {
        alert("Swipe Left: Open Profile");
      }
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {reels.length > 0 && (
        <Image source={{ uri: reels[currentIndex].videoUrl }} style={styles.reel} />
      )}
      <Text style={styles.caption}>
        {reels[currentIndex]?.caption || "No reels to show"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" },
  reel: { width, height: height * 0.8, resizeMode: "cover" },
  caption: { color: "#fff", fontSize: 16, marginTop: 20 },
});
