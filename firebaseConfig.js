import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCE5oqYeVRVtn-MkHZbDZChZxy-JpEgpNs",
  authDomain: "bondlybonds-24117.firebaseapp.com",
  projectId: "bondlybonds-24117",
  storageBucket: "bondlybonds-24117.firebasestorage.app",
  messagingSenderId: "824510937130",
  appId: "1:824510937130:web:ac6c4ab06146a176056b53",
  measurementId: "G-1ZBM1ZKZJ8"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);