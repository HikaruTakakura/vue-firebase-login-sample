# vue-firebase-signin-sample

サインインのサンプルです。

ブランチ `1-sign-in-only` ではサインイン機能のみ、

ブランチ `2-user-profiles` ではユーザー情報（名前と画像）の編集のコードがみれます。

## node_modules のインストール

```bash
npm install
```

## firebaseConfig を設定

`public` リポジトリなので、 `firebaseConfig` を別ファイルに切り分けて `gitignore` してます。
自分の適当な Firebase プロジェクトの `firebaseConfig` を `@/firebase.js` に貼り付けてください。

```bash
// import firebaseConfig from "@/firebaseConfig";

// ↓ 自分の firebaseConfig に置き換える

const firebaseConfig = {
  apiKey: "AIza...",
  ...
};
```

## 開発サーバーの起動

```bash
npm run serve
```

## ポイント解説

### サインイン状態

サインイン状態の変更は`firebase.auth().onAuthStateChanged`を使って補足する。

サインイン状態に変化があるたびに、中に入れた関数が呼び出される。
サインアウトの場合は`user`の値は`null`。

```js
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // サインイン中
    // user_profiles コレクションから user.uid に対応するドキュメントを取得する。
    //
    // 初サインインでまだ user_profiles コレクションにドキュメントがない場合、ドキュメントを作成する。
  } else {
    // サインアウト中
  }
})
```

### userProfile の更新処理

`store`の`action`に以下のように定義しておく。

```js
const actions = {
  // ログイン状態が変化するときに呼び出す
  setUserAndProfile({ commit }, { user, userProfile }) {
    commit("setUser", user)
    commit("setUserProfile", userProfile)
  },
  // ユーザーの情報を更新するときに呼び出す
  updateUserProfile({ state, commit }, userProfileDiff) {
    // Diff = Difference
    const userProfile = {
      ...state.userProfile,
      ...userProfileDiff,
    }
    if (state.user) {
      return db
        .collection("user_profiles")
        .doc(state.user.uid)
        .set(userProfile)
        .then(() => {
          commit("setUserProfile", userProfile)
        })
    }
  },
}
```

コンポーネントからは、更新したい項目の差分（`diff`）を与えて`dispatch`するだけ。

```js
<script>
export default {
  data() {
    return {
      inputName: ""
    }
  },
  methods: {
     updateUserName() {
      // ...
      this.$store.dispatch("updateUserProfile", {
        name: this.inputName
      })
    },
  },
}
</script>
```

このように、コンポーネントに書くコードがすっきりする。

### getters で user の情報をまとめる

`state` では `user` と `userProfile` に分かれていて使いづらいので、`getters` で２つを一緒くたにした値をつくる。

```js
const getters = {
  user(state) {
    return {
      ...state.user,
      ...state.userProfile, // たとえば state.user.photoURL を state.userProfile.photoURL で上書きできる
    }
  },
  // ...
}
```

### ストレージの CORS 設定

以下を見ながら CORS の設定をする。
ターミナル（コマンドプロンプト）からインストールするときにいくつか質問されるが、全部空白のままエンターキーをおして OK。

<https://firebase.google.com/docs/storage/web/download-files?hl=ja#cors_configuration>
