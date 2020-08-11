<template>
  <div class="hello">
    <login></login>
  </div>
</template>

<script>
/********************************************************************************
 *  @Purpose        : To create a login page for login to the registered account.
 *  @file           : login.jsx        
 *  @author         : sandhyarani khadakhade
 *  @version        : v0.1
 *********************************************************************************/
import login from "@/components/login.vue";
export default {
  components: {
    login: login
  },
  name: "hello",
  data() {
    return {};
  }
};
</script>

<style>
</style>




