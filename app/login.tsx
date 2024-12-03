// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Image,
//   Keyboard,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { auth } from "../firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Validation Error", "Please fill in all fields.");
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       Alert.alert("Validation Error", "Please enter a valid email address.");
//       return;
//     }

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.replace("/(tabs)"); // Redirect to Home (Tabs Layout)
//     } catch (error) {
//       if (error instanceof Error) {
//         Alert.alert("Login Error", error.message);
//       } else {
//         Alert.alert("Login Error", "An unknown error occurred.");
//       }
//     }
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <KeyboardAvoidingView
//         style={styles.container}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         <Text style={styles.title}>Login</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => router.push("/SignUp")}>
//           <Text style={styles.signupText}>New here? Sign Up</Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
//   title: { fontSize: 24, fontWeight: "bold", color: "#00ffcc", marginBottom: 20 },
//   input: { width: "80%", padding: 15, marginVertical: 10, backgroundColor: "#1e1e2d", color: "#fff", borderRadius: 8 },
//   button: { backgroundColor: "#00ffcc", padding: 15, borderRadius: 8 },
//   buttonText: { color: "#121212", fontSize: 16, fontWeight: "bold" },
//   signupText: { color: "#aaa", marginTop: 10, fontSize: 12 },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert ,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { auth } from "../firebaseConfig";
import LinearGradient from 'react-native-linear-gradient';

import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)"); // Redirect to Home (Tabs Layout)
    } catch (error) {
      // Check if the error is an instance of Error and handle appropriately
      if (error instanceof Error) {
        Alert.alert("Login Error", error.message);
      } else {
        Alert.alert("Login Error", "An unknown error occurred.");
      }
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Background Image */}
        <Image
          source={require("../assets/images/image.png")}
          style={styles.backgroundImage}
        />
        

        {/* Login Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>

          {/* Input Fields */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <TouchableOpacity onPress={() => router.push("/SignUp")}>
            <Text style={styles.signupText}>New here? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E10", // Fallback color in case the image fails to load
  },
  backgroundImage: {
    position: "absolute", // Stays in place as the background
    left:-60,
    width: 500,
    height: 460,
    borderRadius: 0,
    resizeMode: "contain", // Ensures the image fills the screen proportionally
    alignItems: "center", // Aligns contents of the image to the center horizontally
    justifyContent: "flex-start", // Moves content inside the image to the top
    paddingTop: 0, // Add some spacing to fine-tune
  },
  content: {
    flex: 1, // Takes up the remaining space on top of the background image
    justifyContent: "center", // Centers the login form vertically
    alignItems: "center", // Centers the login form horizontally
    paddingHorizontal: 20,
    paddingTop:300,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#00FFFF",
    marginBottom:5,
  },
  input: {
    width: "90%", // Adjust width for smaller screens
    padding: 15,
    marginVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for input fields
    borderRadius: 8,
    color: "#fff",
  },
  button: {
    width: "90%",
    padding: 15,
    backgroundColor: "#00ffcc",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  signupText: {
    color: "#fff",
    marginTop: 20,
    fontSize: 14,
  },
});
