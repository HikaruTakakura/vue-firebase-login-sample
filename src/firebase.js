import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

/*
  public リポジトリなので gitignore してます
  自分のプロジェクトの firebaseConfig を貼り付けてください

  const firebaseConfig = {
    apiKey: "AIza...",
    ...
  };
*/
import firebaseConfig from "@/firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();

// firestore utility methods
export const createDocObject = doc => {
  return {
    id: doc.id,
    ...doc.data()
  };
};

// https://firebase.google.com/docs/auth/web/google-signin?hl=ja
export const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};
export const signOut = () => {
  return firebase.auth().signOut();
};
