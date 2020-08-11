<template>
  <div class="hello">
    <registration></registration>
  </div>
</template>

<script>
/********************************************************************************
 *  @Purpose        : Create a registration page to register the users .
 *  @file           : registrationView.vue       
 *  @author         : sandhyarani khadakhade
 *  @version        : v0.1
 *********************************************************************************/
import registration from "@/components/registration.vue";
export default {
  components: {
    registration: registration
  },
  name: "hello",
  data() {
    return {};
  }
};
</script>

<style>
</style>




