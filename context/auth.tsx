import React, { createContext, useEffect, useState } from "react";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth, User } from "firebase/auth";

export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSEGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

export const app = initializeApp(firebaseConfig)

export const Auth = getAuth(app)

export const FirebaseAuth = () => {
  const Auth = getAuth(app)
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

export const AuthContext = createContext<{
  user?: User
  setUser?: React.Dispatch<React.SetStateAction<User>>
}>({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>()
  useEffect(() => {
    if (!user) {
      Auth.onAuthStateChanged((u) => {
        setUser(u)
      })
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
};
