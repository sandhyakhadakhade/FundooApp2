<template>
<div>
<!-- <noteList v-bind:searchKey="search"></noteList> -->
</div>
</template>
<script>
/****************************************************************************************
 *  @Purpose        : Here we have to create a dashboard and it contains few components. 
 *  @file           : dashboard.vue    
 *  @author         :sandhyarani khadakhade
 *  @version        : v0.1
 *****************************************************************************************/
import noteList from './noteList'
export default {
  name: "dash",
  components: {
    noteList,
  },
 data(){
   return{
     search:"",
   }
 },
};
</script>
