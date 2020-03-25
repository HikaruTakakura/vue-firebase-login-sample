import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import { db, createDocObject } from "@/firebase";

Vue.use(Vuex);

const state = {
  // user のプロパティ・メソッド一覧
  // https://firebase.google.com/docs/reference/js/firebase.User
  user: null,
  publicUser: null
};
const mutations = {
  updateUser(state, { user, publicUser }) {
    state.user = user;
    state.publicUser = publicUser;
  }
};
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

const store = new Vuex.Store({
  state,
  mutations,
  actions
});
export default store;

// user のログイン状態が変化したら、store を更新
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const userRef = db.collection("public-users").doc(user.uid);
    userRef.get().then(doc => {
      const publicUser = doc.exists ? createDocObject(doc) : null;
      store.dispatch("updateUser", {
        user,
        publicUser
      });
    });
  } else {
    store.dispatch("updateUser", { user: null, publicUser: null });
  }
});
