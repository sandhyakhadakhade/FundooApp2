<template>
  <div>
    <div class="update_note">
      <v-flex xs12>
        <div class="update_title">
          <textarea v-model="noteData.title"></textarea>
        </div>
      </v-flex>

      <div class="display_checkList" v-for="list in noteData.noteCheckLists" :key="list.id">
        <div @mouseover="showDeleteButton(list.id)" @mouseout="hideDeleteButton(list.id)">
          <div
            class="flex_close"
            @click="updateCheckListName(list,openStatus)"
            v-if="list.status == 'open' && list.isDeleted == false"
          >
            &nbsp; &nbsp;
            <img src="../assets/checkBox.svg" />
            <input @click="click(list.id)" class="open_input" v-model="list.itemName" />
            <div class="flex_close">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <img
                    @click="updateCheckListNote(list,list.itemName,closeStatus)"
                    dark
                    v-on="on"
                    v-if="list.id == editCheckList"
                    style="padding-right: 12px;"
                    src="../assets/tick.svg"
                  />
                </template>
                <span>Rename checkList</span>
              </v-tooltip>
            </div>

            <div class="flex_close">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <img
                    dark
                    v-on="on"
                    @click="deleteCheckListItem(list,list.status)"
                    v-if="list.id==checkListName && list.id != editCheckList"
                    src="../assets/close.svg"
                  />
                </template>
                <span>delete</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </div>

      <div v-show="showList" v-for="(list,index) in checkList" :key="list.id">
        <div @mouseover="showDeleteButton(list.id)" @mouseout="hideDeleteButton(list.id)">
          <v-divider></v-divider>&nbsp; &nbsp;
          <img @click="onClose(list)" src="../assets/checkBox.svg" />
          <input class="tick_box" placeholder="List Item" v-model="list.itemName" />
          <img
            @click="deleteCheckListItem(list,list.status,index)"
            v-if="list.id==checkListName && list.id != editCheckList"
            src="../assets/close.svg"
          />
          <v-divider></v-divider>
        </div>
      </div>

      <div v-show="view">
        <v-divider></v-divider>&nbsp; &nbsp;
        <img src="../assets/addLabels.svg" />
        <input
          class="tick_box"
          v-on:keyup.enter="showCheckList('true',noteData.id,checkListName)"
          placeholder="List Item"
        />
        <v-divider></v-divider>
      </div>
      <div v-show="onOpen">
        <span>&nbsp; &nbsp; {{ count }} completed item</span>
        <div v-for="list in closeCheckList" :key="list.id">
          <div @mouseover="showDeleteButton(list.id)" @mouseout="hideDeleteButton(list.id)">
            <v-divider></v-divider>&nbsp; &nbsp;
            <img @click="openClickCheckList(list)" src="../assets/onClose.svg" />
            <input class="tick_box1" placeholder="List Item" v-model="list.itemName" />
            <img
              v-if="list.id==checkListName && list.id != editCheckList"
              src="../assets/close.svg"
            />

            <v-divider></v-divider>
          </div>
        </div>
      </div>

      <div
        class="display_checkList"
        v-for="(listClose,index) in noteData.noteCheckLists"
        :key="index"
      >
        <div @mouseover="showDeleteButton(listClose.id)" @mouseout="hideDeleteButton(listClose.is)">
          <div v-if="listClose.status == 'close' && listClose.isDeleted == false">
            <v-divider></v-divider>
            <div @click="updateCheckListName(listClose,closeStatus)">
              &nbsp; &nbsp;
              <img src="../assets/onClose.svg" />
              <input @click="click(listClose.id)" class="close_input" v-model="listClose.itemName" />
              <!-- {{listClose.itemName}} -->

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <img
                    @click="updateCheckListNote(list,listClose.itemName,openStatus)"
                    dark
                    v-on="on"
                    v-if="listClose.id == editCheckList"
                    style="padding-right: 12px;"
                    src="../assets/tick.svg"
                  />
                </template>
                <span>Rename checkList</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <img
                    dark
                    v-on="on"
                    @click="deleteCheckListItem(listClose)"
                    v-if="listClose.id==checkListName && listClose.id != editCheckList"
                    src="../assets/close.svg"
                  />
                </template>
                <span>delete</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </div>

      <!-- 
      <div v-show="showList" v-for="list in checkList" :key="list.id">
        <v-divider></v-divider>&nbsp; &nbsp;
        <img @click="onClose(list)" src="../assets/checkBox.svg">
        <input class="tick_box" placeholder="List Item" v-model="list.itemName">
        <img src="../assets/close.svg">
        <v-divider></v-divider>
      </div>

      <div v-show="view">
        <v-divider></v-divider>&nbsp; &nbsp;
        <img src="../assets/addLabels.svg">
        <input
          class="tick_box"
          v-on:keyup.enter="showCheckList('true',noteData.id,checkListName)"
          v-model="checkListName"
          placeholder="List Item"
        >
        <v-divider></v-divider>
      </div>
      <div v-show="onOpen">
        <span>&nbsp; &nbsp; {{ count }} completed item</span>
        <div v-for="list in closeCheckList" :key="list.id">
          <v-divider></v-divider>&nbsp; &nbsp;
          <img @click="openClickCheckList(list)" src="../assets/onClose.svg">
          <input class="tick_box1" placeholder="List Item" v-model="list.itemName">
          <img src="../assets/close.svg">

          <v-divider></v-divider>
        </div>
      </div>-->

      <v-flex xs12 sm6>
        <input v-model="noteData.description" />
      </v-flex>
    </div>
    <div class="flex_close">
      <noteIcons v-bind:notes="noteData"></noteIcons>
      <v-btn flat small @click="editNote(noteData.id,noteData.title,noteData.description)">Close</v-btn>
    </div>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :timeout="timeout"
    >Note Updated Successfully</v-snackbar>
  </div>
</template>
<script>
import noteIcons from "./noteIcons";
import {
  updateNote,
  addNoteCheckList,
  updateCheckList,
  removeCheckListItem
} from "../services/noteService.js";
import {
  UpdateTickBoxMessageService,
  dailogBoxService
} from "../services/data_service/messageService";

export default {
  name: "edit",
  components: {
    noteIcons
  },
  props: ["noteData"],
  data() {
    return {
      dialog: false,
      editCheckList: "",
      count: 0,
      list: "",
      showNav: true,
      snackbar: false,
      snackbar1: false,
      view: "",
      hide1: "",
      checkListName: "",
      checkList: [],
      closeCheckList: [],
      openStatus: "close",
      closeStatus: "open",
      showList: false,
      onOpen: false,

      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      title: "",
      text: ""
    };
  },
  methods: {
    click(id) {
      this.editCheckList = id;
    },
    showDeleteButton(id) {
      this.checkListName = id;
    },
    hideDeleteButton(id) {
      this.checkListName != id;
    },
    async updateCheckListNote(checkListDetails, updateName, status) {
      //  console.log("note", checkListDetails.notesId, checkListDetails.id);
      var token = localStorage.getItem("token");
      let noteData = {
        noteId: checkListDetails.notesId,
        checklistId: checkListDetails.id
      };
      let obj = {
        isDeleted: false,
        itemName: updateName,
        status: status
      };
      let data1 = await updateCheckList(noteData, obj, token);
      this.$emit("onOpenCheckList", data1);
    },
    onClose(name) {
      this.onOpen = true;
      this.count = this.count + 1;
      this.checkList = this.checkList.filter(search => {
        return search != name;
      });
      name.status = "close";
      this.closeCheckList.push(name);
    },
    openClickCheckList(name) {
      this.count = this.count - 1;
      this.closeCheckList = this.closeCheckList.filter(search => {
        return search != name;
      });
      this.checkList.push(name);
    },
    showCheckList(name, noteId) {
      if (name == "true") {
        this.showList = true;
        var obj = {
          status: "",
          itemName: event.target.value
        };
        obj.status = "open";
        this.checkList.push(obj);
        // console.log("array", this.checkList);
        this.checkListName = "";
      } else {
        this.showList = false;
      }
      // console.log("after key enter");

      this.addCheckListToNote(noteId, obj);
    },
    tickBox(data) {
      if (data == "true") {
        this.view = true;
      } else {
        this.view = false;
      }
    },
    async addCheckListToNote(noteId, obj1) {
      // console.log("in addcheckList", noteId);
      var token = localStorage.getItem("token");
      let obj = {
        isDeleted: false,
        itemName: obj1.itemName,
        status: obj1.status
      };
      let data = await addNoteCheckList(noteId, obj, token);
      // console.log("result", data);
      this.$emit("addCheckListToNote", data);
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
        status: checkListData.status
      };
      let data = await updateCheckList(noteData, obj, token);
      this.$emit("onOpenCheckList", data);
    },

    async deleteCheckListItem(list, openStatus, index) {
      if (openStatus == "open") {
        this.checkList.splice(index, 1);
      } else if (openStatus == "close") {
        this.closeCheckList.splice(index, 1);
      }
      // console.log("in delete ", list);
      var token = localStorage.getItem("token");
      let deleteData = {
        noteId: list.notesId,
        checklistId: list.id
      };
      let result = await removeCheckListItem(deleteData, token);
      // console.log("result", result);
    },

    async editNote(id, tit, des) {
      this.snackbar = true;
      this.dailog = true;
      var token = localStorage.getItem("token");
      let updateData = {
        title: tit,
        description: des,
        noteId: id
      };
      var data = await updateNote(updateData, token);
      // this.$modal.hide('dialog');
      dailogBoxService.sendDailogBoxValue(this.dialog);
      this.$emit("updateNote", data);
    }
  },
  mounted() {
    this.subscription = UpdateTickBoxMessageService.getUpdateCheckBox().subscribe(
      value => {
        // console.log("In update tick  box ", value.text);
        // if(data.text == true){
        if (value.text == "true") {
          this.view = true;
        } else {
          this.view = false;
        }
      }
    );
  }
};
</script>

<style>
@import "../styles/editNote.css";
</style>
