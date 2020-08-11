<template>
<div>
<createNotes></createNotes>
<displayNote v-bind:card="getAllLabels"></displayNote>
</div>
</template>
<script>
import displayNote from "./displayNotes";
import createNotes from './createNotes';
import router from '../router'
import {getNotes} from '../services/noteService'
export default {
    name:'labelNotes',
    components:{
            displayNote,
            createNotes
    },
  data() {
    return {
        getAllLabels:[],
        getAllNotes:[]
    };
  },
methods:{

//get all notes
    async displayNote() {
        this.getAllLabels=[];
      var result = await getNotes(localStorage.getItem("token"));
      var labelid = localStorage.getItem('labelId')
      this.getAllNotes = [];
      var responsLabel=[]
          var response = result.data.data.data;
      for (let index = 0; index < response.length; index++) {
          for(let i=0;i<response[index].noteLabels.length;i++){
          if(response[index].noteLabels[i].id == labelid){
          this.getAllLabels.unshift(response[index]);
          }
        } 
      }
    }
},

//reload the page in same component
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
      this.displayNote()
  },
mounted(){
    // console.log('in label',this.$route.params);
    this.displayNote()
}


};
</script>

<style>
</style>
