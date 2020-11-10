<template>
  <div>
    <input type="text" v-model="inputName" />
    <button v-on:click="updateUserName">名前を更新</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputName: "",
    }
  },
  computed: {
    user() {
      // getters の user なのがポイント！
      return this.$store.getters.user
    },
  },
  methods: {
    updateUserName() {
      if (this.inputName === "") {
        // 入力した値が空
      } else if (!this.user) {
        // ログインしていない
      } else {
        this.$store.dispatch("updateUserProfile", { name: this.inputName })
        this.inputName = ""
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
