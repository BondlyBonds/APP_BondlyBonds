// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Keyboard,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { auth, db } from "../firebaseConfig";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc, collection } from "firebase/firestore";

// export default function SignupPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user"); // Default role is "user"

//   const handleSignup = async () => {
//     if (!email || !password) {
//       Alert.alert("Validation Error", "Please fill in all fields.");
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       Alert.alert("Validation Error", "Please enter a valid email address.");
//       return;
//     }

//     if (password.length < 6) {
//       Alert.alert(
//         "Validation Error",
//         "Password must be at least 6 characters long."
//       );
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       const userId = userCredential.user.uid;
//       // Save role and other details in Firestore
//       await setDoc(doc(collection(db, "profiles"), userId), {
//         email,
//         role,
//         isProfileComplete: false, // Profile is incomplete by default
//       });

//       Alert.alert("Signup Successful", "Please complete your profile.");
//       router.replace("/create-profile"); // Redirect to profile creation
//     } catch (error) {
//       if (error instanceof Error) {
//         Alert.alert("Signup Error", error.message);
//       } else {
//         Alert.alert("Signup Error", "An unknown error occurred.");
//       }
//     }
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <KeyboardAvoidingView
//         style={styles.container}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         <View style={styles.container}>
//           <Text style={styles.title}>Sign Up</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />
//           <View style={styles.roleSelector}>
//             <TouchableOpacity
//               style={[
//                 styles.roleButton,
//                 role === "user" && styles.selectedRoleButton,
//               ]}
//               onPress={() => setRole("user")}
//             >
//               <Text
//                 style={[
//                   styles.roleButtonText,
//                   role === "user" && styles.selectedRoleButtonText,
//                 ]}
//               >
//                 User
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.roleButton,
//                 role === "provider" && styles.selectedRoleButton,
//               ]}
//               onPress={() => setRole("provider")}
//             >
//               <Text
//                 style={[
//                   styles.roleButtonText,
//                   role === "provider" && styles.selectedRoleButtonText,
//                 ]}
//               >
//                 Provider
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity style={styles.button} onPress={handleSignup}>
//             <Text style={styles.buttonText}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
//   title: { fontSize: 24, color: "#00ffcc", marginBottom: 20 },
//   input: { width: "80%", padding: 15, marginVertical: 10, backgroundColor: "#1e1e2d", color: "#fff", borderRadius: 8 },
//   roleSelector: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginVertical: 20,
//   },
//   roleButton: {
//     padding: 10,
//     borderRadius: 5,
//     marginHorizontal: 10,
//     borderWidth: 1,
//     borderColor: "#00ffcc",
//   },
//   selectedRoleButton: {
//     backgroundColor: "#00ffcc",
//   },
//   roleButtonText: {
//     color: "#00ffcc",
//   },
//   selectedRoleButtonText: {
//     color: "#121212",
//   },
//   button: { backgroundColor: "#00ffcc", padding: 15, borderRadius: 8 },
//   buttonText: { color: "#121212", fontSize: 16, fontWeight: "bold" },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import { useRouter } from "expo-router";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is "user"

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters long."
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userId = userCredential.user.uid;
      // Save role and other details in Firestore
      await setDoc(doc(collection(db, "profiles"), userId), {
        email,
        role,
        isProfileComplete: false, // Profile is incomplete by default
      });

      Alert.alert("Signup Successful", "Please complete your profile.");
      router.replace("/create-profile"); // Redirect to profile creation
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Signup Error", error.message);
      } else {
        Alert.alert("Signup Error", "An unknown error occurred.");
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

        {/* Signup Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Sign Up</Text>

          {/* Input Fields */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Role Selection */}
          <View style={styles.roleSelector}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === "user" && styles.selectedRoleButton,
              ]}
              onPress={() => setRole("user")}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  role === "user" && styles.selectedRoleButtonText,
                ]}
              >
                User
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === "provider" && styles.selectedRoleButton,
              ]}
              onPress={() => setRole("provider")}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  role === "provider" && styles.selectedRoleButtonText,
                ]}
              >
                Provider
              </Text>
            </TouchableOpacity>
          </View>

          {/* Signup Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Login Redirect */}
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.signupText}>Already have an account? Log In</Text>
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
    left: -60,
    width: 500,
    height: 450,
    borderRadius: 0,
    resizeMode: "contain", // Ensures the image fills the screen proportionally
  },
  content: {
    flex: 1, // Takes up the remaining space on top of the background image
    justifyContent: "center", // Centers the signup form vertically
    alignItems: "center", // Centers the signup form horizontally
    paddingHorizontal: 20,
    paddingTop: 350,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00FFFF",
    marginBottom: 5,
  },
  input: {
    width: "90%", // Adjust width for smaller screens
    padding: 15,
    marginVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for input fields
    borderRadius: 8,
    color: "#fff",
  },
  roleSelector: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  roleButton: {
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#00ffcc",
    width:120,
  },
  selectedRoleButton: {
    backgroundColor: "#00ffcc",
  },
  roleButtonText: {
    textAlign:'center',
    color: "#00ffcc",
  },
  selectedRoleButtonText: {
    color: "#121212",
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
