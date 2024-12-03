// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Animated,
//   Dimensions,
//   PanResponder,
// } from "react-native";

// const { width, height } = Dimensions.get("window");

// interface SplashScreenProps {
//   onComplete: () => void;
// }

// export default function SplashScreen({ onComplete }: SplashScreenProps) {
//   const [rotation] = useState(new Animated.Value(0));
//   const [hasSwiped, setHasSwiped] = useState(false);

//   const panResponder = PanResponder.create({
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderRelease: (_, gestureState) => {
//       if (!hasSwiped && (gestureState.dx < -50 || gestureState.dx > 50)) {
//         setHasSwiped(true);
//         onComplete();
//       }
//     },
//   });

//   Animated.loop(
//     Animated.timing(rotation, {
//       toValue: 1,
//       duration: 8000,
//       useNativeDriver: true,
//     })
//   ).start();

//   const rotationInterpolation = rotation.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["20deg", "360deg"],
//   });

//   const diamondPositions = [
//     { top: height * 0.30, left: width * 0.5 - 40 },
//     { top: height * 0.4, left: width * 0.75 },
//     { top: height * 0.7, left: width * 0.5 - 40 },
//     { top: height * 0.4, left: width * 0.25 - 40 },
//   ];

//   return (
//     <View style={styles.container} {...panResponder.panHandlers}>
//         <Image
//           source={require("../assets/images/Splash.png")}
//           style={styles.background}
          
//         />

//       {/* <View style={styles.background}>
//         <View style={styles.outerCircle} />
//         <View style={styles.innerCircle} />
//         <View style={styles.line} />
//       </View> */}
//       {/* <View style={styles.logoContainer}>
//         <Image
//           source={require("../assets/images/logo.jpeg")}
//           style={styles.logo}
//         />
//         <Text style={styles.logoText}>bondly</Text>
//       </View> */}
//       {/* <Animated.View
//         style={[
//           styles.diamondContainer,
//           { transform: [{ rotate: rotationInterpolation }] },
//         ]}
//       >
//         {[
//           { icon: require("../assets/images/tutoring.jpg"), text: "Tutoring" },
//           { icon: require("../assets/images/delivery.jpg"), text: "Delivering" },
//           { icon: require("../assets/images/creative.png"), text: "Creative" },
//           { icon: require("../assets/images/relation.jpg"), text: "Arts" },
//         ].map((item, index) => (
//           <View
//             key={index}
//             style={[styles.diamond, diamondPositions[index]]}
//           >
//             <Image style={styles.diamondImage} source={item.icon} />
//             <Text style={styles.diamondText}>{item.text}</Text>
//           </View>
//         ))}
//       </Animated.View> */}
//       {/* <View style={styles.footer}>
//         <Text style={styles.footerText}>Tutoring</Text>
//         <Text style={styles.footerText}>Delivering</Text>
//         <Text style={styles.footerText}>Creative</Text>
//         <Text style={styles.footerText}>Arts</Text>
//       </View> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//     justifyContent:'center',
//     alignItems:'center',
//   },
//   background: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',

//   },
//   outerCircle: {
//     width: width * 0.9,
//     height: width * 0.9,
//     borderRadius: width * 0.45,
//     borderWidth: 3,
//     borderColor: "#ddd",
//     position: "absolute",
//   },
//   innerCircle: {
//     width: width * 0.7,
//     height: width * 0.7,
//     borderRadius: width * 0.35,
//     borderWidth: 1.5,
//     borderColor: "#bbb",
//     position: "absolute",
//   },
//   line: {
//     width: 2,
//     height: height * 0.6,
//     backgroundColor: "#ddd",
//     position: "absolute",
//   },
//   logoContainer: {
//     alignItems: "center",
//     marginBottom: 5,
//   },
//   logo: {
//     width: 130,
//     height: 130,
//     borderRadius: 60,
//     backgroundColor: "#fff",
//   },
//   logoText: {
//     marginTop: 0,
//     fontSize: 44,
//     fontWeight: "bold",
//     color: "##0C0C0C",
//   },
//   diamondContainer: {
//     position: "absolute",
//     width: width * 0.8,
//     height: height * 0.8,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   diamond: {
//     position: "absolute",
//     alignItems: "center",
//     justifyContent: "center",
//     width: 90,
//     height: 70,
//     transform: [{ rotate: "0deg" }],
//   },
//   diamondImage: {
//     width: 80,
//     height: 90,
//     borderRadius: 60,
//     transform: [{ rotate: "0deg" }],
//   },
//   diamondText: {
//     marginTop: 5,
//     fontSize: 18,
//     color: "#777",
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     position: "absolute",
//     bottom: 50,
//     width: "100%",
//   },
//   footerText: {
//     fontSize: 12,
//     color: "#777",
//   },
// });
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Animated, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [opacity] = useState(new Animated.Value(1)); // Initialize opacity to 1

  useEffect(() => {
    // Start the fade-out animation after 3 seconds
    const fadeOut = Animated.timing(opacity, {
      toValue: 0,
      duration: 1500, // Fade-out duration (1.5 seconds)
      useNativeDriver: true,
    });

    const timeout = setTimeout(() => {
      fadeOut.start(() => onComplete()); // Call onComplete after animation finishes
    }, 4000); // Delay before fade-out starts (3 seconds)

    return () => clearTimeout(timeout); // Cleanup the timeout on unmount
  }, [opacity, onComplete]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Image
        source={require("../assets/images/Splash.png")}
        style={styles.background}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Match the logo's background color
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // Ensure image fits within bounds
  },
});
