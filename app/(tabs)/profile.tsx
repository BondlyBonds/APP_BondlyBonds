import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);

  // Fetch the profile data
  useEffect(() => {
    const fetchProfile = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        Alert.alert("Error", "No user is logged in.");
        return;
      }

      try {
        const docRef = doc(db, "profiles", userId); // Ensure userId is valid
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          Alert.alert("Error", "No profile found. Please create one.");
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch profile.";
        Alert.alert("Error", errorMessage);
      }
    };

    fetchProfile();
  }, []);

  // Handle profile update
  const handleUpdate = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert("Error", "No user is logged in.");
      return;
    }

    try {
      const docRef = doc(db, "profiles", userId);
      await updateDoc(docRef, profile);
      setEditMode(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update profile.";
      Alert.alert("Error", errorMessage);
    }
  };

  // Return loading message until the profile is fetched
  if (!profile) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      {editMode ? (
        <>
          <TextInput
            style={styles.input}
            value={profile.name || ""}
            onChangeText={(text) => setProfile({ ...profile, name: text })}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={profile.address || ""}
            onChangeText={(text) => setProfile({ ...profile, address: text })}
            placeholder="Address"
          />
          <Button title="Save" onPress={handleUpdate} />
        </>
      ) : (
        <>
          <Text style={styles.label}>Name: {profile.name}</Text>
          <Text style={styles.label}>Address: {profile.address}</Text>
          <Button title="Edit Profile" onPress={() => setEditMode(true)} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  input: { backgroundColor: "#1e1e2d", padding: 10, marginBottom: 10, color: "#fff", borderRadius: 8 },
  label: { color: "#fff", fontSize: 16, marginBottom: 10 },
});
