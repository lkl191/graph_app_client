import React, { createContext } from "react";
import "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSEGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

export const app = initializeApp(firebaseConfig)

const Auth = getAuth(app)


export const FirebaseAuth = () => {
  Auth.onAuthStateChanged((user) => {
    if (user) {
      user
        .getIdToken(true)
        .then((token) => {
          return token;
        })
        .catch(function (error) {
          return "example";
        });
    } else {
      console.log("user not found");
    }
  });
};

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  return <AuthContext.Provider value={null} {...props} />;
};
