<template>
  <div id="app" @click="closeMenu">
    <v-app>
      <!-- <v-flex d-flex xs12> -->
      <v-content fluid grid-list-md text-xs-center style="padding-top: 0px;">
        <!-- <v-layout  justify-center  class="notescontent" id="notescontent"> -->
        <v-container grid-list-lg text-xs-center>
          <!-- <v-flex d-flex xs12 sm6 md3> -->

          <v-layout align-start justify-center row wrap :class="view ? 'list_View1' : 'grid_View'">
            <v-flex d-flex xs12 sm6 md6 lg6 v-for="(note) in card" :key="note.id" class="card">
              <v-layout row wrap>
                <!-- :class="view ? 'card_hover' : 'list_View1'"</div> -->
                <v-card class="card_hover" v-bind:style="{ 'background-color': note.color}">
                  <div class="notePin1" @click="openDialog(note)">
                    <v-card-title primary-title v-if="note.title.length > 0">
                      <v-card-text>
                        <h3 style="font-family: initial;">{{note.title}}</h3>
                      </v-card-text>
                      <v-spacer></v-spacer>

                      <div v-if="flag==false" @click="unpin(note.id)" class="notePin">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <img v-on="on" src="../assets/pinBeforeClick.svg" />
                          </template>
                          <span>Pin Note</span>
                        </v-tooltip>
                      </div>
                      <div v-if="flag==true" @click="pin(note.id)" class="notePin">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <img v-on="on" src="../assets/pinAfterClick.svg" />
                          </template>
                          <span>Unpin Note</span>
                        </v-tooltip>
                      </div>
                    </v-card-title>

                    <v-card-title>
                      <span>{{note.description}}</span>
                    </v-card-title>
                  </div>

                  <div
                    class="display_checkList"
                    v-for="(list,index) in note.noteCheckLists"
                    :key="index"
                  >
                    <div
                      @click="updateCheckListName(list,openStatus)"
                      v-if="list.status == 'open' && list.isDeleted == false "
                    >
                      <!-- <v-divider></v-divider>  && list.isDeleted == 'false'-->
                      <img src="../assets/checkBox.svg" />
                      {{list.itemName}}
                    </div>
                  </div>
                  <div
                    class="display_checkList"
                    v-for="listClose in note.noteCheckLists"
                    :key="listClose.index"
                  >
                    <div v-if="listClose.status == 'close' && listClose.isDeleted == false ">
                      <v-divider></v-divider>
                      <div
                        @click="updateCheckListName(listClose,closeStatus)"
                        class="close_CheckBox"
                      >
                        <img src="../assets/onClose.svg" />
                        {{listClose.itemName}}
                      </div>
                    </div>
                  </div>

                  <div class="display_normal">
                    <div class="text-xs-left" v-if="note.reminder.length > 0">
                      <v-chip
                        color="gray"
                        v-model="chip1"
                        v-bind:style="{ 'background-color': note.color}"
                      >
                        <img color="gray" src="../assets/clockIcon.svg" />
                        {{ note.reminder | moment("HH:mm") }}
                        <v-icon @click="removeReminder(note.id)">close</v-icon>
                        <v-snackbar
                          v-model="snackbar"
                          :bottom="y === 'bottom'"
                          :timeout="timeout"
                        >Reminder deleted</v-snackbar>
                      </v-chip>
                    </div>
                    <div v-for="nlabel in note.noteLabels" :key="nlabel.id">
                      <div v-if="nlabel.label.length > 0">
                        <v-chip color="#ccc" @click="nevigateToLabelNotes(nlabel.id,nlabel.label)">
                          {{ nlabel.label}}
                          <v-icon @click="deleteNoteLabel(note.id,nlabel.id)">close</v-icon>
                        </v-chip>
                      </div>
                    </div>
                    <div v-for="(collaborator,index) in note.collaborators" :key="index">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            flat
                            icon
                            small
                            v-on="on"
                            style=" height: 30px; width:30px; box-shadow: 1px 1px 1px 1px grey;background-color: pink;"
                          >{{ collaborator.firstName.substr(0, 1)}}</v-btn>
                        </template>
                        <span>{{collaborator.email}}</span>
                      </v-tooltip>
                    </div>
                  </div>
                  <v-card-actions>
                    <div class="icon_note">
                      <noteIcons
                        v-bind:notes="note"
                        v-bind:labels="noteLabels"
                        v-on:archiveNote="archiveNoteEvent($event)"
                        v-on:changeColor="changeColorEvent($event)"
                        v-on:deleteNote="deleteNoteEvent($event)"
                        v-on:reminderNote="reminderNoteEvent($event)"
                        v-on:addCollabrator="addCollabrator($event)"
                        v-on:addLabelNote="addLabelNote($event)"
                      ></noteIcons>
                    </div>
                    <div class="noteIcon"></div>
                  </v-card-actions>

                  <div v-if="note.questionAndAnswerNotes.length > 0">
                    <v-divider></v-divider>
                    <span>Question Asked</span>
                    <!-- display  Question -->

                    <div
                      class="QustionAndAnswer"
                      @click="navigateToQustionAndAnswer(note.id)"
                      v-html="note.questionAndAnswerNotes[0].message"
                    ></div>
                  </div>
                </v-card>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
        <v-dialog class="dialog_box" v-model="dialog" max-width="555" style="height: 316px;">
          <v-card v-bind:style="{ 'background-color': classArray.color}">
            <editNote
              v-bind:noteData="classArray"
              v-on:addCheckListToNote="addCheckListToNote($event)"
              v-on:onOpenCheckList="onOpenCheckList($event)"
            ></editNote>
          </v-card>
        </v-dialog>
        <!-- </v-layout> -->
      </v-content>
      <!-- </v-flex> -->
    </v-app>
  </div>
</template>
  <script>
/*****************************************************************************************************
 *  @Purpose        : Here we will display all notes
 *  @file           : displayNotes.vue
 *  @author         : sandhyarani khadakhade
 *  @version        : v0.1
 *****************************************************************************************************/
import editNote from "./editNote";
import router from "../router";
// import navbar from "./navbar";
import {
  messageService,
  searchMessageService,
  labelMessageService,
  dailogBoxService
} from "../services/data_service/messageService";
import {
  isTrashed,
  removeReminder,
  getLabels,
  deleteNoteLabels,
  updateCheckList,
  updatePin
} from "../services/noteService.js";
import noteIcons from "./noteIcons.vue";
export default {
  name: "dash",
  components: {
    noteIcons,
    editNote
  },
  props: ["card"],
  data() {
    return {
      showList: false,
      onOpen: false,
      view: "",
      hide1: "",
      openStatus: "close",
      closeStatus: "open",
      URL: "http://34.213.106.173/",
      image: localStorage.getItem("image"),
      view: false,
      flag: false,
      noteLabels: [],
      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      text: "Hello, I",
      dialog: false,

      notes: [
        // {title: "tech", text: "javaScript" },
        // {title: "vue", text: "learn more"},
        // {title: "js", text: "good"}
      ],
      menu: [
        { title: "Delete note", key: 0, isdeleted: false },
        { title: "Change labels", key: 1 }
      ],
      //bind multiple classes ti an item
      hover: false,
      chip1: true,
      classArray: [],
      seen: false,
      inMenu: false,
      isMenu: false,
      title: "",
      searchKey: ""
      // text: ""
    };
  },

  methods: {
    //unpin Note
    async unpin(noteId) {
      this.flag = true;
      var token = localStorage.getItem("token");
      let pinObj = {
        isPined: false,
        noteIdList: [noteId]
      };
      await updatePin(pinObj, token);
    },
    //pin note
    // async pin(notId) {
    //   this.flag = false;
    //   var token = localStorage.getItem("token");
    //   let pinObj = {
    //     isPined: true,
    //     // noteIdList: [noteId]
    //   };
    //   await updatePin(pinObj, token);
    // },

    //  pinArray(notesData) {
    //     let pinArr = [];
    //     for (let i = 0; i < notesData.length; i++) {
    //         if (notesData[i].pinned) {
    //             pinArr.push(notesData[i]);
    //         }
    //     }
    //     return pinArr;
    // }
    navigateToQustionAndAnswer(id) {
      localStorage.setItem("noteId", id);
      this.$router.push({ path: "/qustionAnswer/" + id });
    },
    changeColorEvent(note) {
      this.$emit("emitChangeColor", note);
    },
    archiveNoteEvent(note) {
      this.$emit("emitArchiveNote", note);
    },
    deleteNoteEvent(note) {
      this.$emit("emitDeleteNote", note);
    },
    reminderNoteEvent(note) {
      this.$emit("emitReminderNote", note);
    },
    addCollabrator(note) {
      this.$emit("addColl", note);
    },
    addLabelNote(note) {
      this.$emit("addLabel", note);
    },
    addCheckListToNote(note) {
      this.$emit("addCheckList", note);
    },
    onOpenCheckList(note) {
      this.$emit("onOpenCheckListNote", note);
    },
    clickNav: function(item) {
      alert(item);
    },
    openDialog(note) {
      this.classArray = note;
      this.dialog = true;
    },
    closeMenu: function() {
      if (this.isMenu) {
        this.inMenu = true;
        this.isMenu = false;
      } else {
        this.inMenu = false;
      }
    },
    opMenu: function(op, index, note) {
      if (op == 0) {
        this.notes.splice(index, 1);
        var value = (this.menu[0].isdeleted = true);
        var id = note.id;
        this.deleteNote(value, id);
      } else if (op == 1) {
        // alert("Change Labels");
      }
      this.inMenu = false;
    },
    handleClick() {
      alert("welcome");
    },
    //removeRemainder
    async removeReminder(notesId) {
      this.snackbar = true;
      var token = localStorage.getItem("token");
      let removedata = {
        noteIdList: [notesId]
      };
      await removeReminder(removedata, token);
      this.$emit("removeReminder", removedata);
    },
    //delete note
    async deleteNote(value, id) {
      var token = localStorage.getItem("token");
      let deleteData = {
        isDeleted: value,
        noteIdList: [id]
      };
      await isTrashed(deleteData, token);
    },
    async getAllLabel() {
      var result = await getLabels(localStorage.getItem("token"));
      this.noteLabels = result.data.data.details;
      // console.log("get all labels", this.labelData.label);
    },
    //delete Label
    async deleteNoteLabel(noteId, labelID) {
      var token = localStorage.getItem("token");
      let data = {
        id: labelID,
        noteIdList: [noteId]
      };
      await deleteNoteLabels(data, token);
      this.$emit("deleteLabel", data);
    },
    async updateCheckListName(checkListData, status) {
      // console.log("note", checkListData.notesId, checkListData.id);
      var token = localStorage.getItem("token");
      let noteData = {
        noteId: checkListData.notesId,
        checklistId: checkListData.id
      };
      let obj = {
        isDeleted: false,
        itemName: checkListData.itemName,
        status: status
      };
      let data = await updateCheckList(noteData, obj, token);
      this.$emit("updateCheckList", data);
    },
    // labelOnClick(name){
    //    labelMessageService.sendLabelName(name);
    // },
    nevigateToLabelNotes(id, labelName) {
      localStorage.setItem("labelId", id);
      router.push({ path: "/label/" + labelName });
    }
  },
  mounted() {
    // console.log("cards in disp", this.card);
    this.getAllLabel();
    // subscribe to home component messages
    this.subscription = messageService.getMessage().subscribe(message => {
      if (message.text == true) {
        // add message to local state if not empty
        // console.log(message);
        this.view = message.text;
      } else {
        this.view = message.text;
      }
    });

    this.subscription = dailogBoxService.getDailogBox().subscribe(value => {
      console.log("In update dailog  box ", value.text);
      // if(data.text == true){
      if (value.text == "true") {
        this.dialog = true;
      } else {
        this.dialog = false;
      }
    });
    // return this.dialog
  }
};
</script>
  <style>
@import "../styles/displayNotes.css";
</style>






















