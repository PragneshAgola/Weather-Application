import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6GclPNWBOS0ywBuYzH2WDZLDrUZwPUGA",
  authDomain: "weather-http-1de71.firebaseapp.com",
  projectId: "weather-http-1de71",
  storageBucket: "weather-http-1de71.appspot.com",
  messagingSenderId: "985984382409",
  appId: "1:985984382409:web:025a045cee23b7632da418",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
