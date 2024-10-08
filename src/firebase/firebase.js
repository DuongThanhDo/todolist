import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "api-app-todolist.firebaseapp.com",
  databaseURL: "https://api-app-todolist-default-rtdb.firebaseio.com",
  projectId: "api-app-todolist",
  storageBucket: "api-app-todolist.appspot.com",
  messagingSenderId: "359320697999",
  appId: "1:359320697999:web:b2ad5db1720210a9f684fa",
  measurementId: "G-MXLWK0KDXS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database }