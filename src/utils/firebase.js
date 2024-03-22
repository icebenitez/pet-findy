import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyBGC4CbgAQqtaSAwkcpDsDFJwS4FUSONiw",
  authDomain: "dog-findy.firebaseapp.com",
  projectId: "dog-findy",
  storageBucket: "dog-findy.appspot.com",
  messagingSenderId: "107110841092",
  appId: "1:107110841092:web:b0f53c6c7d4e5dc545ae51",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
