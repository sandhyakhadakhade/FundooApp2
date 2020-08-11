
<template>
  <div id="app">
    <div>
      <create-notes v-on:createNote="createNote($event)"></create-notes>
    </div>
    <div>
      <display-notes
        v-bind:card="getAllNotes"
        v-on:emitChangeColor="ChangeColor($event)"
        v-on:emitDeleteNote="deleteNote($event)"
        v-on:emitArchiveNote="archiveNote($event)"
        v-on:emitReminderNote="reminderNote($event)"
        v-on:removeReminder="removeReminderNote($event)"
        v-on:addColl="addCollabratorNote($event)"
        v-on:deleteLabel="deleteLabel($event)"
        v-on:addLabel="addLabels($event)"
        v-on:updateCheckList="updateCheckList($event)"
        v-on:addCheckList="addCheckListToNote($event)"
        v-on:onOpenCheckListNote="onOpenCheckListNote($event)"
      ></display-notes>
    </div>
  </div>
</template>
  <script>
import { getNotes } from "../services/noteService.js";

import createNotes from "./createNotes.vue";
import displayNotes from "./displayNotes.vue";
import { searchMessageService } from "../services/data_service/messageService";
// import dashboard from "./dashboard";
// import { messageService } from "../services/data_service/messageService";

export default {
  name: "dash",
  components: {
    createNotes,
    displayNotes
  },
  data() {
    return {
      getAllNotes: [],
      searchKey: []
    };
  },
  methods: {
    createNote() {
      // console.log("Event in noteList", note);
      this.displayNote();
    },
    ChangeColor() {
      // console.log("Event in noteList change color", note);
      this.displayNote();
    },
    deleteNote() {
      // console.log("Event in noteList delete note", note);
      this.displayNote();
    },
    archiveNote() {
      this.displayNote();
    },
    reminderNote() {
      this.displayNote();
    },
    removeReminderNote() {
      this.displayNote();
    },
    addCollabratorNote(){
      this.displayNote();
    },
    deleteLabel(){
      this.displayNote();
    },
    addLabels(){
      this.displayNote();
    },
    updateCheckList(){
      this.displayNote();
    },
    addCheckListToNote(){
      this.displayNote();
    },
    onOpenCheckListNote(){
      this.displayNote();
    },
    //get all notes
    async displayNote() {
      var result = await getNotes(localStorage.getItem("token"));
      // console.log("number of notes ", result);
      // console.log("data", result.data.data.data);
      this.getAllNotes = [];
      var response = result.data.data.data;
      // console.log("response", response);
      for (let index = 0; index < response.length; index++) {
        if (
          response[index].isDeleted == false &&
          response[index].isArchived == false
        ) {
          // console.log("is deleted", response[index].isDeleted);
          this.getAllNotes.unshift(response[index]);
        } else {
          // this.isPin=response;
        }
      }
      console.log("Get all notes",this.getAllNotes);
    }
  },
  mounted() {
    this.displayNote();
 
    
  }
};
</script>

 