
<template>
  <div id="app">
    <div>
      <title>Notes in the Recycle Bin are deleted</title>
    </div>
    <v-app>
      <v-flex xs11>
        <v-content fluid grid-list-md text-xs-center>
          <v-layout justify-center class="notescontent" id="notescontent">
            <!-- <v-btn flat small @click="send(title,text)"></v-btn> -->
            <v-flex>
              <v-container
                grid-list-lg
                justify-space-around
                justify-space-between
                align-content-start
              >
                <v-layout
                  row
                  wrap
                  justify-center
                  justify-space-around
                  justify-space-between
                  align-content-start
                >
                  <v-flex
                    xs12
                    lg4
                   
                    sm5
                    v-for="(note) in notes"
                    :key="note.id"
                    justify-space-around
                    justify-space-between
                    align-content-start
                  >
                    <v-card  v-bind:style="{ 'background-color': note.color}"  hover raised class="card_hover" @click="dialog=true">
                      <v-card-title
                        primary-title
                        v-if="note.title.length > 0 || note.description.length > 0"
                      >
                        <span>
                          <h3>{{note.title}}</h3>
                        </span>
                      </v-card-title>
                      <v-card-text>
                        <span>{{note.description}}</span>
                      </v-card-text>
                      <v-card-actions>
                        <div class="menu-bar">
                          <md-menu
                            md-size="medium"
                            :md-offset-x="50"
                            :md-offset-y="-26"
                            close-on-content-click="true"
                          >
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <v-menu bottom>
                                  <v-btn flat icon small slot="activator">
                                    <v-icon dark v-on="on">more_vert</v-icon>
                                  </v-btn>
                                  <v-list>
                                    <v-list-tile @click="deleteForever(note.id)">Delete Forever</v-list-tile>
                                    <v-list-tile @click="restore(note.id)">Restore</v-list-tile>
                                  </v-list>
                                </v-menu>
                              </template>
                              <span>More</span>
                            </v-tooltip>
                          </md-menu>
                        </div>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </v-content>
      </v-flex>
    </v-app>
    <!-- <br>
    <br>
    <display-notes v-bind:card="notes"></display-notes>-->
  </div>
</template>
  
  <script>
import displayNotes from "./displayNotes";
import {
  getTrashNoteList,
  isTrashed,
  isDeleteForever
} from "../services/noteService.js";
// import createNotes from "./createNotes.vue";
// import noteIcons from "./noteIcons.vue";
export default {
  name: "dash",
  components: {
    displayNotes
    // createNotes,
    // noteIcons
  },
  data() {
    return {
      notes: [],
      menuForCreateNote: [
        { title: "Delete Forever", key: 0 },
        { title: "Restore", key: 1 }
      ]
    };
  },
  methods: {
    deleteForever(noteid) {
      // console.log("notes is...............", noteid);
      this.notes.splice(noteid, 1);
      var value = (this.isdeleted = true);
      this.deleteFromDB(value, noteid);
    },

    //delete note
    async deleteFromDB(value, id) {
      var token = localStorage.getItem("token");
      let restoreData = {
        isDeleted: value,
        noteIdList: [id]
      };
      var data = await isDeleteForever(restoreData, token);
    },

    //for restore
    restore(noteid) {
      // console.log("notes is...............", noteid);
      this.notes.splice(noteid, 1);
      var value = (this.isdeleted = false);
      this.restoreToNotes(value, noteid);
    },

    //delete note
    async restoreToNotes(value, id) {
      var token = localStorage.getItem("token");
      // var id = noteid;
      let restoreData = {
        isDeleted: value,
        noteIdList: [id]
      };
      var data = await isTrashed(restoreData, token);
    }
  },

  //get all trash notes
  async mounted() {
    // console.log("IN mounted");
    var result = await getTrashNoteList(localStorage.getItem("token"));
    // console.log("number of notes ", result);
    // console.log(".........", result.data.data.data[0].isDeleted);
    var notesData = result.data.data.data;
    let trashArr = [];
    for (let i = 0; i < notesData.length; i++) {
      if (notesData[i].isDeleted) {
        this.notes.push(notesData[i]);
      }
    }
    return trashArr;
  }
};
</script>

  <style>
@import "../styles/trashNoteList.css";
</style>