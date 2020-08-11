<template>
  <div id="app" @click="closeMenu">
    <v-app>
      <v-navigation-drawer v-model="drawer" fixed clipped disable-resize-watcher app>
        <v-list dense>
          <br />
          <div class="color_focus">
            <div class="onmouse_hover">
              <v-list-tile @click="nevigateToNoteList">
                <v-list-tile-action>
                  <img class="icon_dist" src="../assets/note.svg" />
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title color="black">Notes</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </div>
            <br />
            <div class="onmouse_hover">
              <v-list-tile @click="displayReminderNotes()">
                <v-list-tile-action>
                  <img class="icon_dist" src="../assets/menuReminder.svg" />
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title color="black">Reminders</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </div>
            <v-divider dark class="my-3"></v-divider>
            <v-layout row align-center>
              <v-flex xs6>
                <v-subheader style="cursor: default;" color="black">LABELS</v-subheader>
              </v-flex>
            </v-layout>
            <div style="cursor: pointer;" v-for="label in labelData" :key="label.index">
              <br />
              <v-list-tile class="onmouse_hover">
                <v-list-tile-action>
                  <img class="icon_dist" src="../assets/labelIcon.svg" />
                </v-list-tile-action>
                <div class="labels">
                  <v-list-tile-content>
                    <v-list-tile-title
                      @click="nevigateToLabelNotes(label.id,label.label)"
                      color="black"
                    >{{ label.label }}</v-list-tile-title>
                  </v-list-tile-content>
                </div>
              </v-list-tile>
            </div>
            <br />
            <div class="text-xs-center">
              <v-dialog v-model="dialog" width="250" height="100" border-radius="0px">
                <template v-slot:activator="{ on }">
                  <div class="onmouse_hover" style="cursor: pointer;" dark v-on="on">
                    <v-list-tile>
                      <v-list-tile-action>
                        <img class="icon_dist" src="../assets/menuEdit.svg" />
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title color="black">Edit Labels</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </div>
                </template>
                <v-card>
                  <h2
                    color="black"
                    style="font-size: medium; padding-top: 12px;padding-left: 12px;"
                  >Edit Labels</h2>
                  <v-flex xs12 sm5>
                    <md-field md-clearable>
                      <v-icon>close</v-icon>
                      <v-text-field v-model="labelName" placeholder="Create new labels" single-line></v-text-field>
                      <v-spacer></v-spacer>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn flat icon small @click="addLabels()">
                            <img style="height: 49px;" dark v-on="on" src="../assets/tick.svg" />
                          </v-btn>
                        </template>
                        <span>Create label</span>
                      </v-tooltip>
                    </md-field>
                  </v-flex>

                  <div v-for="label in labelData" :key="label.index">
                    <v-list-tile>
                      <!-- <v-btn
                        flat
                        icon
                        small
                        @mouseleave="mouseLeave()"
                        @mouseover="mouseOver(label.id)"
                      >-->
                      <!--   <v-btn
                        flat
                        icon
                        small
                      >
                       <img
                          v-if="label.id != active"
                          class="list_view"
                          dark
                          v-on="on"
                          src="../assets/labelFilled.svg"
                      >-->
                      <!-- </v-btn> -->
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn @click="deleteNoteLabel(label)" flat icon small>
                            <img class="list_view" dark v-on="on" src="../assets/deleteLabel.svg" />
                            <!-- <img
                              v-if="label.id == active"
                              class="list_view"
                              dark
                              v-on="on"
                              src="../assets/deleteLabel.svg"
                            >-->
                          </v-btn>
                        </template>
                        <span>delete</span>
                      </v-tooltip>
                      <!-- <div @mouseleave="mouseLeave()"
                      @mouseover="mouseOver(label.id)">{{ label.label}}</div>-->
                      <v-list-tile-content>
                        <input
                          class="edit_label"
                          color="black"
                          @click="click(label.id)"
                          @mouseleave="mouseLeave()"
                          @mouseover="mouseOver(label.id)"
                          v-model="label.label"
                        />
                      </v-list-tile-content>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <img
                            dark
                            v-on="on"
                            v-if="label.id != editLabel"
                            style="padding-right: 12px;"
                            src="../assets/edit.svg"
                          />
                        </template>
                        <span>Rename Label</span>
                      </v-tooltip>

                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <img
                            @click="updateLabel(label.label,label.id)"
                            dark
                            v-on="on"
                            v-if="label.id == editLabel"
                            style="padding-right: 12px;"
                            src="../assets/tick.svg"
                          />
                        </template>
                        <span>Rename Label</span>
                      </v-tooltip>
                    </v-list-tile>
                  </div>

                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="addLabels()">Done</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
            <v-divider dark class="my-3"></v-divider>
            <div class="onmouse_hover">
              <v-list-tile @click="nevigateToArchiveNoteList()">
                <v-list-tile-action>
                  <img class="icon_dist" src="../assets/menuArchive.svg" />
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title color="black">Archive</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </div>
            <br />
            <div class="onmouse_hover">
              <v-list-tile @click="nevigateToTrashNotes">
                <v-list-tile-action>
                  <img class="icon_dist" src="../assets/menuTrash.svg" />
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title color="black">Bin</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </div>
          </div>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="#fff" app fixed clipped-left>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-toolbar-side-icon @click="drawer = !drawer">
              <v-icon style="font-size:25px" dark v-on="on">menu</v-icon>
            </v-toolbar-side-icon>
          </template>
          <span>Main menu</span>
        </v-tooltip>
        <img class="keepIcon" src="../assets/keepIcon.svg" />
        <span class="title">
          <v-flex>
            <p style="margin-bottom: auto;">
              <span style="color: blue; font-size: 25px">F</span>
              <span style="color: red; font-size: 20px">u</span>
              <span style="color: lime; font-size: 20px">n</span>
              <span style="color: blue; font-size: 20px">d</span>
              <span style="color: green; font-size: 20px">o</span>
              <span style="color: red; font-size: 20px">o</span>
            </p>
          </v-flex>
        </span>
        <v-flex lg6 xs11 mb7 sm9>
          <v-text-field
            @click="nevigateToSearchNote()"
            v-on:keyup="searchKey()"
            name="search"
            label="Search"
            clearable
            input
            type="text"
            v-model="search"
            id="searchbar"
            flat
            hide-details
            solo-inverted
            prepend-inner-icon="search"
          ></v-text-field>
        </v-flex>
        <!-- 
        <v-icon>close</v-icon>-->

        <!-- <div class="refresh">
        <v-flex xs6 class="text-xs-right">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn @click="reloadPage()" flat icon small class="btn_note_bar">
                <v-icon class="btn_note_bar" dark v-on="on">refresh</v-icon>
              </v-btn>
            </template>
            <span>Refresh</span>
          </v-tooltip>
        </v-flex>
        </div>-->
        <!-- add to cart  -->
        <v-flex xs6 class="text-xs-right">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn @click="nevigateToShoppingCart()" flat icon small class="btn_note_bar">
                <img dark v-on="on" src="../assets/shopping_cart.svg" />
              </v-btn>
            </template>
            <span>shopping cart</span>
          </v-tooltip>
        </v-flex>

        <div class="refresh">
          <v-flex xs6 class="text-xs-right">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn @click="reloadPage()" flat icon small class="btn_note_bar">
                  <v-icon class="btn_note_bar" dark v-on="on">refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh</span>
            </v-tooltip>
          </v-flex>
        </div>

        <div class="ListView">
          <v-flex>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-if="flag" @click="listFlag()" flat icon small class="btn_note_bar">
                  <img class="grid_view" dark v-on="on" src="../assets/view-grid.svg" />
                </v-btn>
              </template>
              <span>ListView</span>
            </v-tooltip>
          </v-flex>
        </div>
        <div class="GridView">
          <v-flex>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-if="!flag" @click="gridFlag()" flat icon small class="btn_note_bar">
                  <img class="list_view" dark v-on="on" src="../assets/view-agenda.svg" />
                </v-btn>
              </template>
              <span>GridView</span>
            </v-tooltip>
          </v-flex>
        </div>
        <md-menu md-direction="bottom-end" md-size="medium" class="md-account-header">
          <span style="flex: 1;"></span>
          <md-button class="md-icon-button" md-menu-trigger>
            <md-avatar>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <!-- <img v-on="on" src="../assets/account_circle_grey_72x72.png"> -->
                  <img v-on="on" :src="URL+image" />
                </template>
                <span>{{ `Fundoo Account ${ userName } ${ userLastName }`}}</span>
              </v-tooltip>
            </md-avatar>
          </md-button>
          <md-menu-content>
            <md-menu-item>
              <v-layout row justify-center>
                <v-dialog v-model="dialog1" width="600px">
                  <template v-slot:activator="{ on }">
                    <v-avatar>
                      <span class="white--text headline" dark v-on="on">
                        <img :src="URL+image" />
                      </span>
                    </v-avatar>
                  </template>
                  <div style="padding-left:20px" class="dailog_card">
                    <div id="app">
                      <v-card-title>
                        <span class="headline">Select Your Profile</span>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="dialog1 = false">
                          <v-icon>close</v-icon>
                        </v-btn>
                      </v-card-title>
                      <hr />
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        style="font-size: 1.2em; padding: 10px 0;"
                        @change="setImage($event)"
                      />
                      <v-btn
                        style="  color: rgba(0,0,0,.87);
                      border: 1px solid;
                      background-color: #ccc; align:right"
                        flat="flat"
                        @click="uploadImage()"
                      >Upload</v-btn>
                      <br />
                      <div
                        style="width: 400px; height:300px; border: 1px solid gray; display: inline-block; padding-left:12px"
                      >
                        <vue-cropper
                          ref="cropper"
                          :guides="true"
                          :view-mode="2"
                          drag-mode="crop"
                          :auto-crop-area="0.5"
                          :min-container-width="250"
                          :min-container-height="180"
                          :background="true"
                          :rotatable="true"
                          :src="imgSrc"
                          alt="Source Image"
                          :img-style="{ 'width': '400px', 'height': '300px' }"
                        ></vue-cropper>
                      </div>
                      <img
                        :src="cropImg"
                        style="width: 200px; height: 150px; border: 1px solid gray"
                        alt="Cropped Image"
                      />
                      <br />
                      <br />
                      <button
                        @click="cropImage($event)"
                        v-if="imgSrc != ''"
                        style="margin-right: 40px;"
                      >Crop</button>
                      <button @click="rotate" v-if="imgSrc != ''">Rotate</button>
                    </div>
                  </div>
                </v-dialog>
              </v-layout>
              <div class="md-list-text-container">
                <span>{{ `${ userName} ${ userLastName}` }}</span>
                <br />
                <span>{{ emailId }}</span>
              </div>
            </md-menu-item>
            <v-divider></v-divider>
            <md-menu-item>
              <div align="right">
                <!-- <v-btn>Add account</v-btn> -->
                <v-spacer></v-spacer>
                <v-btn style="background-color:gray" align="right" v-on:click="logout()">Sign out</v-btn>
              </div>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
        <v-spacer></v-spacer>
      </v-toolbar>
      <router-view></router-view>
    </v-app>
  </div>
</template>
<script>
/*****************************************************************************************************
 *  @Purpose        : Here we have to create the navbar that contains all required navbar components.
 *  @file           : navbar.vue
 *  @version        : v0.1
 *****************************************************************************************************/
import router from "../router";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import {
  getLabels,
  addLabel,
  deleteLabel,
  uploadProfilePic,
  signOut,
  updateNoteLabel
} from "../services/noteService.js";
import {
  messageService,
  searchMessageService
} from "../services/data_service/messageService";
export default {
  name: "dash",
  components: {
    VueCropper
  },
  data() {
    return {
      on: "",
      seen: false,
      editLabel: "",
      active: "",
      file: "",
      imgSrc: "",
      cropImg: "",
      image: localStorage.getItem("image"),
      selectedFile: null,
      avatar: this.avatar,
      // URL:environment.baseUrl,
      URL: "http://34.213.106.173/",
      imageUrl: "",
      icon: false,
      flag: false,
      label1: false,
      labelName: "",
      label: "Create new label",
      labelData: "",
      dialog: false,
      dialog1: false,
      userName: localStorage.getItem("firstName"),
      userLastName: localStorage.getItem("lastName"),
      emailId: localStorage.getItem("email"),
      drawer: null,
      view: false,
      search: "",
      searchOutput: "search output",
      notes: [
        // {title: "tech", text: "javaScript" },
        // {title: "vue", text: "learn more"},
        // {title: "js", text: "good"}
      ],
      menu: [
        { title: "Delete note", key: 0 },
        { title: "Change labels", key: 1 }
      ],
      //bind multiple classes ti an item
      classArray: [],
      hover: false,
      seen: false,
      inMenu: false,
      isMenu: false,
      title: "",
      text: "",
      label: ""
    };
  },
  methods: {
    nevigateToShoppingCart() {
      this.$router.push({ path: "/shoppingcart" });
    },
    reloadPage() {
      location.reload(true);
    },
    mouseOver(id) {
      this.active = id;
    },
    mouseLeave() {
      this.active = "";
    },
    click(id) {
      this.editLabel = id;
    },
    setImage(e) {
      // console.log("event in set Image", e);
      const file = e.target.files[0];
      this.ImageCropped = file;
      if (!file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = event => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        this.imgSrc = reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },

    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      // console.log("cropImage", event);
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$refs.cropper.getCroppedCanvas().toBlob(data => {
        this.ImageCropped = data;
        this.ImageCropped["name"] = "cropImage.jpg";
        // console.log(this.ImageCropped);
      });
    },
    rotate() {
      // guess what this does :)
      this.$refs.cropper.rotate(90);
    },
    async uploadImage() {
      let token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", this.ImageCropped);
      var response = await uploadProfilePic(formData, token);
      this.image = response.data.status.imageUrl;
      localStorage.setItem("image", this.image);
      this.dialog1 = false;
    },
    searchKey() {
      searchMessageService.sendSearchKeyword(this.search);
    },
    clear() {
      this.labelName = "";
    },
    gridFlag() {
      this.flag = true;
      // send message to subscribers via observable subject
      messageService.sendMessage(this.flag);
    },
    listFlag() {
      this.flag = false;
      // send message to subscribers via observable subject
      messageService.sendMessage(this.flag);
    },
    labelFilled() {
      this.label1 = true;
    },

    async logout() {
      // localStorage.clear();
      var token = localStorage.getItem("token");
      var data = await signOut(token);
      this.$router.push({ path: "/login" });
    },
    send: function(tit, txt) {
      if (tit.length > 0 || txt.length) {
        this.notes.unshift({ title: tit, text: txt });
        this.title = "";
        this.text = "";
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
      } else if (op == 1) {
        // alert("Change Labels");
      }
      this.inMenu = false;
    },
    displayReminderNotes() {
      router.push({ path: "/reminder" });
    },
    nevigateToCreateNote() {
      router.push({ path: "/addNotes" });
    },
    nevigateToNoteList() {
      router.push({ path: "/notelist" });
    },
    nevigateToTrashNotes() {
      router.push({ path: "/trashnote" });
    },
    nevigateToListView() {
      router.push({ path: "/listview" });
    },
    nevigateToArchiveNoteList() {
      router.push({ path: "/archivenotes" });
    },
    nevigateToSearchNote() {
      //   let hideSearchBar = this.$route.path;
      // console.log("in navbar hideSearcBar",hideSearchBar);
      router.push({ path: "/searchnote" });
    },
    //open label note
    nevigateToLabelNotes(id, labelName) {
      localStorage.setItem("labelId", id);
      router.push({ path: "/label/" + labelName });
    },
    async getAllLabel() {
      var result = await getLabels(localStorage.getItem("token"));
      this.labelData = result.data.data.details;
    },
    //addLabel
    async addLabels() {
      this.snackbar1 = true;

      var token = localStorage.getItem("token");
      var labelData = {
        label: this.labelName,
        isDeleted: false,
        userId: localStorage.getItem("userId")
      };
      this.dialog = false;
      await addLabel(labelData, token);

      this.getAllLabel();
    },
    //update label
    async updateLabel(labelName, id) {
      //  console.log("update label",labelName);
      //  console.log("label id ",id);
      let token = localStorage.getItem("token");
      var data = {
        label: labelName
      };
      let res = await updateNoteLabel(id, data, token);
    },
    //delete label
    async deleteNoteLabel(labelID) {
      this.label1 = false;
      var token = localStorage.getItem("token");
      // let data = {
      //   id: labelID
      // };
      await deleteLabel(labelID.id, token);
      this.getAllLabel();
    }
  },
  // //reload the page in same component
  //   beforeRouteUpdate (to, from, next) {
  //     // react to route changes...
  //     // don't forget to call next()
  //     this.getAllLabel();
  //   },
  mounted() {
    this.getAllLabel();
  }
};
</script>
  <style>
@import "../styles/navbar.css";
</style>
