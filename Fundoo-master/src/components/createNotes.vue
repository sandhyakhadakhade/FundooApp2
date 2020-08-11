
<template>
  <div id="app" @click="closeMenu">
    <v-app>
      <v-content ma-0 fluid grid-list-md text-xs-center>
        <div>
          <v-layout ma-0 justify-center row fill-height>
            <v-flex lg6 xs11 sm9 md9>
              <v-card>
                <v-form v-bind:style="{ 'background-color':colorCode}">
                  <v-text-field
                    v-if="seen"
                    v-model="title"
                    placeholder="Title"
                    solo
                    full-width
                    hide-details
                    flat
                  ></v-text-field>

                  <div v-show="showList" v-for="(list,index) in checkList" :key="list.id">
                    <div
                      @mouseover="showDeleteButton(list.itemName)"
                      @mouseout="hideDeleteButton(list.itemName)"
                    >
                      <v-divider></v-divider>&nbsp; &nbsp;
                      <img @click="onClose(list)" src="../assets/checkBox.svg" />
                      <input class="tick_box" placeholder="List Item" v-model="list.itemName" />
                      <img
                        @click="deleteCheckListItem(index,list.status)"
                        v-if="list.itemName==checkListName"
                        src="../assets/close.svg"
                      />
                      <v-divider></v-divider>
                    </div>
                  </div>

                  <div v-show="view">
                    <v-divider></v-divider>&nbsp; &nbsp;
                    <img src="../assets/addLabels.svg" />
                    <input
                      @click="showIcon(checkListName)"
                      class="tick_box"
                      v-on:keyup.enter="showCheckList('true')"
                      placeholder="List Item"
                    />
                    <img v-if="showDeleteIcon!=checkListName" src="../assets/close.svg" />
                    <v-divider></v-divider>
                  </div>

                  <div v-show="onOpen">
                    <span>&nbsp; &nbsp; {{ count }} completed item</span>
                    <div v-for="(list,index1) in closeCheckList" :key="list.id">
                      <div
                        @mouseover="showDeleteButton(list.itemName)"
                        @mouseout="hideDeleteButton(list.itemName)"
                      >
                        <v-divider></v-divider>&nbsp; &nbsp;
                        <img
                          @click="openClickCheckList(list)"
                          src="../assets/onClose.svg"
                        />
                        <input class="tick_box1" placeholder="List Item" v-model="list.itemName" />
                        <img
                          @click="deleteCheckListItem(index1,list.status)"
                          v-if="list.itemName==checkListName"
                          src="../assets/close.svg"
                        />
                        <v-divider></v-divider>
                      </div>
                    </div>
                  </div>
                  <!-- <div>
                    <img
                      v-show="!seen"
                      align="right"
                      style="padding-top: 12px; padding-left: 12px;"
                      src="../assets/image.svg"
                    >
                  </div>-->
                  <!-- <div>
                    <img align="right" v-show="seen" src="../assets/pinBeforeClick.svg">
                  </div>-->
                  <v-spacer></v-spacer>
                  <div>
                    <img
                      @click="show = true"
                      v-on:click="tickBox('true')"
                      v-show="!seen"
                      align="right"
                      style="padding-top: 12px; padding-left: 12px;"
                      src="../assets/newlist.svg"
                    />
                  </div>
                  <v-textarea
                    placeholder="Take a note..."
                    v-model="text"
                    name="text"
                    solo
                    full-width
                    hide-details
                    flat
                    rows="1"
                    @click="seen = true"
                  ></v-textarea>

                  <div v-if="seen" class="bar-newnote">
                    <div class="v-icon_class">
                      <v-card-actions>
                        <noteIcons v-on:sendColor="changeColor($event)"></noteIcons>
                        <v-spacer></v-spacer>
                        <v-btn flat small @click="send(title, text)">Close</v-btn>
                        <v-snackbar
                          v-model="snackbar1"
                          :bottom="y === 'bottom'"
                          :timeout="timeout"
                        >{{ text1 }}</v-snackbar>
                      </v-card-actions>
                    </div>
                  </div>
                </v-form>
              </v-card>
            </v-flex>
          </v-layout>
        </div>
      </v-content>
    </v-app>
  </div>
</template>
<script>
/*****************************************************************************************************
 *  @Purpose        : Here we will created the notes
 *  @file           : createNotes.vue
 *  @author         : sandhya khadakhade
 *  @version        : v0.1
 *****************************************************************************************************/
import { createNote, isTrashed } from "../services/noteService.js";
import { tickBoxMessageService } from "../services/data_service/messageService";
import noteIcons from "./noteIcons.vue";
import { from } from "rxjs";
// import displayNotes from "./displayNotes";
export default {
  name: "dash",
  components: { noteIcons },
  data() {
    return {
      colorCode: "",
      archiveData: "",
      snackbar1: false,
      activeBtn: "",
      count: 0,
      list: "",
      activeBtn: 1,
      showNav: true,
      snackbar: false,
      view: "",
      hide1: "",
      checkListName: "",
      checkList: [],
      closeCheckList: [],
      showList: false,
      onOpen: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 7000,
      text1: "note added Succsfully",
      hidden: false,
      drawer: null,
      // hidden: false,
      search: "",
      selected: undefined,
      searchOutput: "search output",
      notes: [
        // {title: "tech", text: "javaScript" },
        // {title: "vue", text: "learn more"},
        // {title: "js", text: "good"}
      ],
      menuForCreateNote: [
        { title: "Add label", key: 0 },
        { title: "Add drawing", key: 1 }
      ],

      menu: [
        { title: "Delete note", key: 0, isdeleted: false },
        { title: "Change labels", key: 1 }
      ],
      //bind multiple classes ti an item
      classArray: [],
      hover: false,
      unseen: false,
      seen: false,
      inMenu: false,
      isMenu: false,
      showDeleteIcon: "",
      title: "",
      text: ""
    };
  },
  methods: {
    clickNav: function(item) {
      alert(item);
    },
    deleteCheckListItem(index, openStatus) {
      if (openStatus == "open") {
        this.checkList.splice(index, 1);
      } else if (openStatus == "close") {
        this.closeCheckList.splice(index, 1);
      }
    },
    showDeleteButton(name) {
      this.checkListName = name;
    },
    hideDeleteButton(name) {
      this.checkListName != name;
    },
    showIcon(id) {
      this.showDeleteIcon = id;
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
    showCheckList(name) {
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
      this.checkListName = "";
    },
    tickBox(data) {
      if (data == "true") {
        this.view = true;
      } else {
        this.view = false;
      }
    },
    send: function(tit, txt) {
      // console.log("in send");
      this.onOpen = false;
      this.view = false;
      this.showList = false;
      if (tit.length > 0 || txt.length) {
        this.notes.unshift({ title: tit, text: txt });
        this.title = "";
        this.text = "";
        this.userData();
      }
      this.seen = false;
    },
    closeMenu: function() {
      if (this.isMenu) {
        this.inMenu = true;
        this.isMenu = false;
      } else {
        this.inMenu = false;
      }
    },
    opMenu: function(op, index) {
      if (op == 0) {
        this.notes.splice(index, 1);
        var value = (this.menu[0].isdeleted = true);
        this.deleteNote(value);
      } else if (op == 1) {
        // alert("Change Labels");
      }
      this.inMenu = false;
    },
    //deleted notes save in database
    async deleteNote(value) {
      var token = localStorage.getItem("token");
      var id = localStorage.getItem("noteId");
      var formData = new FormData();
      formData.append("noteID", id);
      formData.append("isDeleted", value);
      await isTrashed(formData, token);
    },
    //adding notes to database
    async userData() {
      var concateArray = [];
      concateArray = this.checkList.concat(this.closeCheckList);
      // console.log("In userData array", concateArray);

      var token = localStorage.getItem("token");
      var bodyFormData = new FormData();
      bodyFormData.append("title", this.notes[0].title);
      bodyFormData.append("description", this.notes[0].text);
      bodyFormData.append("color", this.colorCode);
      // bodyFormData.append("isArchived",this.archiveData)
      bodyFormData.append("checklist", JSON.stringify(concateArray));
      var data = await createNote(bodyFormData, token);
      // console.log("res",data)
      this.$emit("createNote", data);
    },

    changeColor(value) {
      // this.archiveData = value;
      this.colorCode = value;
      // console.log("in create Note", this.colorCode);
    }
    // sendColor
  },
  mounted() {
    this.changeColor();
    this.subscription = tickBoxMessageService.getCheckBox().subscribe(data => {
      if (data.text == "true") {
        // console.log("if true", this.view);
        this.view = true;
      } else {
        this.view = false;
      }
    });
  }
};
</script>

<style scoped>
.v-textarea textarea {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  line-height: 18px;
  max-width: 100%;
  min-height: 32px;
  outline: none;
  padding: 7px 0 8px;
  width: 100%;

  border: none;
  outline: none;
  resize: auto;
  overflow: visible !important;
}

.input[type="text"] {
  border: none;
  outline: none;
  resize: none;
  resize: vertical !important;

  overflow: visible !important;
}
.delete_icon {
  height: 18px;
  opacity: 0.54;
  outline: none;
  position: absolute;
  top: 63px;
  width: 57px;
  cursor: pointer;
}
.tickOnList {
  width: 20px;
  position: absolute;
  top: 128px;
  left: 3px;
  z-index: 2;
}
.tick_box1 {
  min-height: 29px;
  padding: 5px 45px 5px 53px;
  width: 413px;
  text-decoration: line-through;
}
.tick_box {
  min-height: 29px;
  padding: 5px 45px 5px 20px;
  width: 413px;
}
.add_icon {
  background-size: 18px 18px;
  height: 18px;
  opacity: 0.54;
  outline: none;
  position: absolute;
  top: 63px;
  width: 56px;
  cursor: pointer;
}

.close_icon {
  height: 18px;
  opacity: 0.54;
  outline: none;
  position: absolute;
  top: 63px;
  width: 374px;
  cursor: pointer;
}
.Note_icons {
  align-content: right;
}
/* .theme--light.v-sheet {
  background-color: #fff;
  border-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  min-height: 50px !important;
  border-radius: 7px !important;
  border-top-left-radius: 7px !important;
  border-top-right-radius: 7px !important;
  border-radius: 7px;
  width: 500px !important;
} */
</style>

  <style>
.theme--light.v-input:not(.v-input--is-disabled) input,
.theme--light.v-input:not(.v-input--is-disabled) textarea {
  color: rgba(0, 0, 0, 0.87);
  padding-left: 12px;
}
.theme--light.v-sheet {
  background-color: #fff;
  border-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  min-height: 50px !important;
  border-radius: 7px !important;
  border-top-left-radius: 7px !important;
  border-top-right-radius: 7px !important;
  border-radius: 7px;
}
.newList {
  float: left;
}
#app {
  padding-top: 0px;
}
.v-icon {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-font-feature-settings: "liga";
  font-feature-settings: "liga";
  font-size: 20px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  line-height: 1;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  vertical-align: text-bottom;
}
.application--wrap {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-height: 30vh;
  max-width: 100%;
  position: relative;
}
.v-navigation-drawer__border {
  display: none;
}

.btn_note_bar:hover {
  color: #000;
}
@media screen and (min-width: 769px) {
  .notescontent {
    text-align: center;
    justify-content: center;
    padding-left: 10%;
    padding-right: 10%;
  }
}
@media screen and (min-device-width: 481px) and (max-device-width: 768px) {
  /* STYLES HERE */
}
@media only screen and (max-device-width: 480px) {
  .notescontent {
    text-align: center;
    justify-content: center;
  }
}
@media (min-width: 600px) {
  .flex.sm9 {
    -ms-flex-preferred-size: 75%;
    flex-basis: 50% !important;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    max-width: 75%;
  }
}
</style>