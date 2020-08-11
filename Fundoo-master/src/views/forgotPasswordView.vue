<template>
  <div class="hello">
    <forgotPassword></forgotPassword>
  </div>
</template>

<script>
/****************************************************************************************
 *  @Purpose        : To create a forgot password page for recover the password
                      using mail.
 *  @file           : forgotPassword.vue      
 *  @author         : sandhyarani khadakhade
 *  @version        : v0.1
 *****************************************************************************************/
import forgotPassword from "@/components/forgotPassword.vue";
export default {
  components: {
    forgotPassword: forgotPassword
  },
  name: "hello",
  data() {
    return {};
  }
};
</script>

<style>
</style>




