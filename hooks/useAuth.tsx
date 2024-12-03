import { useEffect } from "react";
import { useRouter } from "expo-router";
import { auth } from "../firebaseConfig";

export default function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/login"); // Redirect to Login page if unauthenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);
}
