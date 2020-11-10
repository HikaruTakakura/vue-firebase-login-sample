<template>
  <div class="center">
    <div>{{ userName }}さん、こんにちは！</div>
    <div v-if="$store.getters.isSignedIn" class="center">
      <button @click="signOut">サインアウト</button>
    </div>
    <div v-else>
      <button @click="signIn">サインイン</button>
    </div>
  </div>
</template>

<script>
import { signIn, signOut } from "@/firebase"

export default {
  data() {
    return {
      inputName: "",
      inputImage: null,
    }
  },
  methods: {
    signIn,
    signOut,
  },
  computed: {
    user() {
      // getters の user なのがポイント！
      return this.$store.getters.user
    },
    userName() {
      return this.user.name || this.user.displayName || "ゲスト"
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
