<template>
  <div>
    <UserAuth />
    <UserProfileForm v-if="$store.state.user" />
  </div>
</template>

<script>
import UserAuth from "@/components/UserAuth.vue"
import UserProfileForm from "@/components/UserProfileForm.vue"

export default {
  components: {
    UserAuth,
    UserProfileForm,
  },
}
</script>
