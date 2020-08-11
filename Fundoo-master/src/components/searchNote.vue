<template>
  <div>
    <br>
    <br>
    <br>
    <display-notes v-bind:card="filteredData"></display-notes>
    <h1>{{ searchNotes }}</h1>
    <!-- <h2>{{foundedNote}}</h2> -->
  </div>
</template>
<script>
import { searchMessageService } from "../services/data_service/messageService";
import displayNotes from "./displayNotes.vue";
import { getNotes } from "../services/noteService.js";
export default {
  name: "searchNote",
  components: {
    displayNotes
  },
  data() {
    return {
      input: "",
      getAllNotes: [],
      foundedNote: [],
      filteredData: []
    };
  },

  computed: {
    searchNotes: function() {
      this.subscription = searchMessageService
        .getSearchkey()
        .subscribe(word => {
          console.log("navbar message", word.text);
          this.input = word.text;
          this.searchCard(word.text);
        });
    }
  },
  methods: {
    searchCard(value) {
      // console.log("in search card", value);
      this.foundedNote = [];
      // var data = this.getAllNotes.filter(search => {
      //   console.log("card", search);

      // if (search.title == value || search.description == value) {
      //   console.log(search);
      //   return search;
      // }
      //    });
      var data = this.getAllNotes.filter(search => {
        console.log("card", search);
        if (search.title == undefined || search.description == undefined) {
          console.log("card not found");
        } else if (
          search.title.startsWith(value) ||
          search.description.startsWith(value)
        ) {
          console.log(search);
          return search;
        }
      });
      this.filteredData = data;
      console.log("search card", data);
    },

    //get all notes
    async getAllCards() {
      var result = await getNotes(localStorage.getItem("token"));
      this.getAllNotes = [];

      var response = result.data.data.data;
      for (let index = 0; index < response.length; index++) {
        if (
          response[index].isDeleted == false &&
          response[index].isArchived == false || response[index].isArchived == true
        ) {
          // console.log("is deleted", response[index].isDeleted);
          this.getAllNotes.unshift(response[index]);
        } else {
          // this.isPin=response;
        }
      }
      console.log("NotesList", this.getAllNotes);
      // this.searchNotes;
      // this.searchCard();
    }
  },
  mounted() {
    console.log("in search mounted");
    this.getAllCards();
  }
};
</script>
<style>
/* .flex.card.xs12.lg4.sm5.justify-space-around.justify-space-between.align-content-start {
    padding-top: 90px;
} */
</style>
