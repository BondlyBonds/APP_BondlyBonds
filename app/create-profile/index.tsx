import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";

export default function CreateProfile() {
  const [step, setStep] = useState(0); // Step 0: Choose Role, Step 1-3: Profile Creation
  const [profileData, setProfileData] = useState({
    name: "",
    email: auth.currentUser?.email || "",
    address: "",
    bio: "",
    workField: "",
    rightToWork: false,
    drivingLicense: false,
    role: "", // "user" or "provider"
  });

  const router = useRouter();

  const handleSave = async () => {
    if (!profileData.name || !profileData.address || !profileData.role) {
      Alert.alert("Validation Error", "Please fill all required fields.");
      return;
    }

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("No user is logged in.");

      await setDoc(doc(db, "profiles", userId), profileData);
      Alert.alert("Profile Created", "Your profile has been saved!");
      router.replace("/(tabs)/feeds"); // Redirect to feeds or home
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save profile.";
      Alert.alert("Error", errorMessage);
    }
  };

  const renderRoleSelection = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>
      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => {
          setProfileData({ ...profileData, role: "user" });
          setStep(1);
        }}
      >
        <Text style={styles.buttonText}>I am a User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => {
          setProfileData({ ...profileData, role: "provider" });
          setStep(1);
        }}
      >
        <Text style={styles.buttonText}>I am a Provider</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFields = () => {
    if (step === 1) {
      return (
        <>
          <TextInput
            placeholder="Name *"
            style={styles.input}
            value={profileData.name}
            onChangeText={(text) => setProfileData({ ...profileData, name: text })}
          />
          <TextInput
            placeholder="Address *"
            style={styles.input}
            value={profileData.address}
            onChangeText={(text) => setProfileData({ ...profileData, address: text })}
          />
        </>
      );
    } else if (step === 2 && profileData.role === "provider") {
      return (
        <>
          <TextInput
            placeholder="Bio"
            style={styles.input}
            value={profileData.bio}
            onChangeText={(text) => setProfileData({ ...profileData, bio: text })}
          />
          <TextInput
            placeholder="Work Field"
            style={styles.input}
            value={profileData.workField}
            onChangeText={(text) => setProfileData({ ...profileData, workField: text })}
          />
        </>
      );
    } else if (step === 3 && profileData.role === "provider") {
      return (
        <>
          <TextInput
            placeholder="Right to Work (true/false)"
            style={styles.input}
            value={profileData.rightToWork.toString()}
            onChangeText={(text) => setProfileData({ ...profileData, rightToWork: text === "true" })}
          />
          <TextInput
            placeholder="Driving License (true/false)"
            style={styles.input}
            value={profileData.drivingLicense.toString()}
            onChangeText={(text) => setProfileData({ ...profileData, drivingLicense: text === "true" })}
          />
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      {step === 0 ? (
        renderRoleSelection()
      ) : (
        <>
          <Text style={styles.title}>
            {profileData.role === "provider" ? `Provider Profile (Step ${step}/3)` : `User Profile`}
          </Text>
          {renderFields()}
          <View style={styles.buttonContainer}>
            {step > 1 && (
              <Button title="Back" onPress={() => setStep(step - 1)} />
            )}
            <Button
              title={step === 3 || profileData.role === "user" ? "Save" : "Next"}
              onPress={step === 3 || profileData.role === "user" ? handleSave : () => setStep(step + 1)}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  title: { fontSize: 24, color: "#00ffcc", marginBottom: 20 },
  input: { backgroundColor: "#1e1e2d", padding: 10, marginBottom: 10, color: "#fff", borderRadius: 8 },
  roleButton: { backgroundColor: "#00ffcc", padding: 15, marginVertical: 10, borderRadius: 8 },
  buttonText: { textAlign: "center", color: "#121212", fontSize: 16, fontWeight: "bold" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
});
