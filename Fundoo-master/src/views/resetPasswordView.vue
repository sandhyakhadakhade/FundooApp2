<template>
  <div class="hello">
    <resetPassword></resetPassword>
  </div>
</template>

<script>
/******************************************************************************
 *  @Purpose        : Create a resetPassword page to reset the new password.
 *  @file           : resetPasswordView.vue        
 *  @author         : sandhyarani khadakhade
 *  @version        : v0.1
 ******************************************************************************/
import resetPassword from "@/components/resetPassword.vue";
export default {
  components: {
    resetPassword: resetPassword
  },
  name: "hello",
  data() {
    return {};
  }
};
</script>

<style>
</style>
