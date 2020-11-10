<template>
  <div>
    <div>
      <div v-if="user.photoURL && user.name">
        <img v-bind:src="user.photoURL" v-bind:alt="user.name + 'の画像'" />
      </div>
      <div>
        <!-- accept="image/*" にすると、画像ファイルだけが選択可能になる -->
        <input type="file" accept="image/*" v-on:change="changeFile" />
        <button v-on:click="updateUserImage">画像を更新</button>
        <span>{{ feedbackText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      feedbackText: "",
    }
  },
  computed: {
    user() {
      // getters の user なのがポイント！
      return this.$store.getters.user
    },
  },
  methods: {
    changeFile(e) {
      this.inputImage = e.target.files[0]
    },
    updateUserImage() {
      if (!this.inputImage) {
        // 画像が選択されていない
      } else if (!this.user) {
        // ログインしていない
      } else {
        this.feedbackText = "アップロード中..."
        // アップロード先を指定する
        // ファイル名がかぶらないように、 user.id を先頭につける
        const fileName = this.user.id + "_" + this.inputImage.name
        const photoRef = firebase.storage().ref("/user_photos/" + fileName)
        // put で保存したあと、その URL を取り出して userProfile に含める
        photoRef
          .put(this.inputImage)
          .then(() => photoRef.getDownloadURL())
          .then(photoURL => {
            this.$store.dispatch("updateUserProfile", { photoURL }).then(() => {
              this.feedbackText = ""
            })
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
