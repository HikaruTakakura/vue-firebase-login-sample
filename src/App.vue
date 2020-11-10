<template>
  <div>
    <UserAuth />
    <div v-if="$store.state.user">
      <UserNameEditForm />
      <UserImageEditForm />
    </div>
  </div>
</template>

<script>
import UserAuth from "@/components/UserAuth.vue"
import UserNameEditForm from "@/components/UserNameEditForm.vue"
import UserImageEditForm from "@/components/UserImageEditForm.vue"

export default {
  components: {
    UserAuth,
    UserNameEditForm,
    UserImageEditForm,
  },
}
</script>
