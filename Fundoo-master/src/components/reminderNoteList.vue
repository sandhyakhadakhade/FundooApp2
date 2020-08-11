
<template>
  <div id="app">
    <create-notes v-on:createNote="createNote($event)"></create-notes>
    <displayNotes
      v-bind:card="notes"
      v-on:emitChangeColor="ChangeColor($event)"
      v-on:emitArchiveNote="archiveNote($event)"
      v-on:removeReminder="removeReminderNote($event)"
      v-on:addColl="addCollabratorNote($event)"
      v-on:deleteLabel="deleteLabel($event)"
      v-on:addLabel="addLabels($event)"
      v-on:updateCheckList="updateCheckList($event)"
      v-on:addCheckList="addCheckListToNote($event)"
      v-on:onOpenCheckListNote="onOpenCheckListNote($event)"
    ></displayNotes>
  </div>
</template>
  <script>
import { getNotes } from "../services/noteService.js";
import createNotes from "./createNotes.vue";
import displayNotes from "./displayNotes.vue";

export default {
  name: "dash",
  components: {
    createNotes,
    displayNotes
  },
  data() {
    return {
      notes: []
    };
  },
  methods: {
    createNote() {
      // console.log("Event in noteList", note);
      this.getAllCards();
    },
    ChangeColor() {
      // console.log("Event in noteList change color", note);
      this.getAllCards();
    },
    archiveNote() {
      // console.log("Event in noteList archive", note);
      this.getAllCards();
    },
    removeReminderNote() {
      this.getAllCards();
    },
    addCollabratorNote() {
      this.getAllCards();
    },
    deleteLabel() {
      this.getAllCards();
    },
    addLabels() {
      this.getAllCards();
    },
    updateCheckList() {
      this.getAllCards();
    },
    addCheckListToNote() {
      this.getAllCards();
    },
    onOpenCheckListNote() {
      this.getAllCards();
    },
    //get all reminder
    async getAllCards() {
      var result = await getNotes(localStorage.getItem("token"));
      this.notes = [];
      var response = result.data.data.data;

      for (let index = 0; index < response.length; index++) {
        if (
          response[index].reminder.length > 0 &&
          response[index].isDeleted == false
        ) {
          this.notes.unshift(response[index]);
        } else {
          // this.isPin=response;
        }
      }
    }
  },
  mounted() {
    // console.log("IN mounted", this.notes);
    this.getAllCards();
  }
};
</script>

 