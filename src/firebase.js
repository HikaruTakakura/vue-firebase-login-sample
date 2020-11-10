import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

/*
  public リポジトリなので gitignore してます。
  15行目を削除して、自分のアプリの firebaseConfig を貼り付けてください。

  const firebaseConfig = {
    apiKey: "AIza...",
    ...
  };
*/
import { firebaseConfig } from "@/firebaseConfig"

firebase.initializeApp(firebaseConfig)
