# vue-firebase-signin-sample


## Project setup
```
npm install
```


### firebaseConfig を設定

`public` リポジトリなので、 `firebaseConfig` を別ファイルに切り分けて `gitignore` してます。
自分の適当な Firebase プロジェクトの `firebaseConfig` を `@/firebase.js` に貼り付けてください。

```
// import firebaseConfig from "@/firebaseConfig";

// ↓ 自分の firebaseConfig に置き換える

const firebaseConfig = {
  apiKey: "AIza...",
  ...
};
```


### Compiles and hot-reloads for development
```
npm run serve
```


# ポイント解説


### サインイン状態

サインイン状態の変更は`firebase.auth().onAuthStateChanged`を使って補足する。

サインイン状態に変化があるたびに、中に入れた関数が呼び出される。
サインアウトの場合は`user`の値は`null`。
```
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // サインイン中
    // public-users コレクションから user.uid に対応するドキュメントを取得する。
    //
    // 初サインインでまだ public-users コレクションにドキュメントがない場合もあるが、
    // この時点でドキュメントを作成する必要は必ずしも無い。
    // 他のコードの部分で、public-users がまだ存在しないかもしれないという前提でコードを書く。
  } else {
    // サインアウト中
  }
});
```


### サインイン・サインアウトの処理をまとめておく

以下のように `@/firebase.js` の中に書いておくと、

```
export const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};
export const signOut = () => {
  return firebase.auth().signOut();
};
```

Vueファイルの中で簡単に使えていい感じ。

```
<template>
  <div>
    <div v-if="!user">
      <span @click="signIn">ログイン</span>
    </div>
    <div v-else>
      <span @click="signOut">ログアウト</span>
    </div>
  </div>
</template>

<script>
import { signIn, signOut } from "@/firebase";
export default {
  methods: {
    signIn,
    signOut
  },
}
</script>
```


### publicUser の更新処理

`store`の`action`に以下のように定義しておく。

```
const actions = {
  updateUser({ commit }, { user, publicUser }) {
    commit("updateUser", { user, publicUser });
  },
  updatePublicUser({ state, commit }, diff) {
    if (state.user) {
      db.collection("public-users")
        .doc(state.user.uid)
        .update(diff)
        .then(() => {
          commit("updateUser", {
            user: state.user,
            publicUser: {
              ...state.publicUser,
              ...diff
            }
          });
        });
    } else {
      throw "エラー！ログインしてません。";
    }
  }
};
```

コンポーネントからは、更新したい項目の差分（`diff`）を与えて`dispatch`するだけ。

```
<script>
export default {
  data() {
    return {
      inputName: ""
    };
  },
  methods: {
    updatePublicUser() {
      if (this.user && this.inputName !== "") {
        this.$store
          .dispatch("updatePublicUser", {
            name: this.inputName
          })
          .then(() => {
            this.inputName = "";
          });
      }
    }
  }
};
</script>
```

このように、コンポーネントに書くコードがすっきりする。

`state`の`publicUser`を、`diff`と合体した値で更新している部分がわかりにくいかも。

```
commit("updateUser", {
  user: state.user,
  publicUser: {
    ...state.publicUser,
    ...diff
  }
});
```
