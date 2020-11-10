<template>
  <div class="center">
    <div>{{ userName }}さん、こんにちは！</div>
    <div v-if="$store.getters.isSignedIn" class="center">
      <button v-on:click="signOut">サインアウト</button>
    </div>
    <div v-else>
      <button v-on:click="signIn">サインイン</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      inputImage: null,
    }
  },
  methods: {
    // https://firebase.google.com/docs/auth/web/google-signin?hl=ja
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    signOut() {
      firebase.auth().signOut()
    },
  },
  computed: {
    user() {
      // getters の user なのがポイント！
      return this.$store.getters.user
    },
    userName() {
      return this.$store.getters.userName
    },
  },
}
</script>

<style scoped>
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
