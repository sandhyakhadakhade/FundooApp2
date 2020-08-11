<template>
  <div style="padding-top: 70px;">
    <displayNotes
      v-bind:card="archiveList"
      v-on:emitArchiveNote="eventArchiveNotes($event)"
      v-on:emitChangeColor="ChangeColor($event)"
      v-on:emitReminderNote="reminderNote($event)"
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
/*****************************************************************************************************
 *  @Purpose        : Here we will display archive notes
 *  @file           : archiveNoteList.vue     
 *  @author         : sandhyarani khadakhade
 *  @version        : v0.1
 *****************************************************************************************************/
import { getArchiveNoteList } from "../services/noteService.js";
import displayNotes from "./displayNotes.vue";
export default {
  name: "archive",
  components: {
    displayNotes
  },
  data() {
    return {
      archiveList: []
    };
  },
  methods: {
    eventArchiveNotes() {
      this.getAllCards();
    },
    ChangeColor() {
      this.getAllCards();
    },
    reminderNote() {
      this.getAllCards();
    },
    removeReminderNote(){
      this.getAllCards();
    },
    addCollabratorNote(){
      this.getAllCards();
    },
    deleteLabel(){
      this.getAllCards();
    },
    addLabels(){
      this.getAllCards();
    },
    updateCheckList(){
      this.getAllCards();
    },
    addCheckListToNote(){
      this.getAllCards();
    },
    onOpenCheckListNote(){
      this.getAllCards();
    },
    //get all archive notes
    async getAllCards() {
  
      var result = await getArchiveNoteList(localStorage.getItem("token"));
      // console.log("archive notes",result);
         this.archiveList = [];
      var notesData = result.data.data.data;
      for (let i = 0; i < notesData.length; i++) {
        if (notesData[i].isArchived && notesData[i].isDeleted == false) {
          this.archiveList.push(notesData[i]);
        }
      }
    }
  },
  async mounted() {
    this.getAllCards();
  }
};
</script>
<style>
.space {
  height: 12px;
}
</style>
