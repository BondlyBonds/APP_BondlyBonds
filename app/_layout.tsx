import { Stack } from "expo-router";
import { useState } from "react";
import SplashScreen from "./splash";

export default function Layout() {
  const [isReady, setIsReady] = useState(false);

  // This function will be called explicitly from SplashScreen on swipe or button click
  const handleSplashComplete = () => {
    console.log("Splash screen complete. Proceeding to app...");
    setIsReady(true);
  };

  // Show splash screen until user interaction triggers readiness
  if (!isReady) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="SignUp" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
