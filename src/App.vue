<template>
  <div class="center">
    <div>{{ userName }}さん、こんにちは！</div>
    <div v-if="!user">
      <span @click="signIn">ログイン</span>
    </div>
    <div class="center" v-else>
      <span @click="signOut">ログアウト</span>
      <div>
        <input type="text" v-model="inputName" />
        <button @click="updatePublicUser">名前を更新</button>
      </div>
    </div>
  </div>
</template>

<script>
import { signIn, signOut } from "@/firebase";
export default {
  data() {
    return {
      inputName: ""
    };
  },
  methods: {
    signIn,
    signOut,
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
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    publicUser() {
      return this.$store.state.publicUser;
    },
    userName() {
      // publicUser が存在しない場合も考慮した設計にする
      return (
        (this.publicUser && this.publicUser.name) ||
        (this.user && this.user.displayName) ||
        "ゲスト"
      );
    }
  }
};
</script>

<style scoped>
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
