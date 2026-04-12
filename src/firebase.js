import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1hM5G7OAbJogQlwTt_ArMy_ZROEZ66_c",
  authDomain: "navrang26-cd6f2.firebaseapp.com",
  projectId: "navrang26-cd6f2",
  storageBucket: "navrang26-cd6f2.firebasestorage.app",
  messagingSenderId: "94648690565",
  appId: "1:94648690565:web:6430c51c87c4c4480206ec",
  measurementId: "G-RGG0G5NEBN",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
