import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "1",
  authDomain: "2",
  projectId: "3",
  storageBucket: "4",
  messagingSenderId: "5",
  appId: "6",
  measurementId: "7"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
