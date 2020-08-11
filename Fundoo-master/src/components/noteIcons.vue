<template>
  <div class="v-icon">
    <div class="reminder">
      <v-menu class="reminder_btn" @click="$event.stopPropagation()" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat icon small class="btn_note_bar" font-size="20px">
            <img
              class="btn_note_bar"
              style="
              height: 29px;"
              dark
              v-on="on"
              src="../assets/reminder.svg"
            />
          </v-btn>
        </template>
        <v-list style="padding-left: 20px; padding-right: 9px;">
          <v-list-tile>
            <v-list-tile-title>Reminder:</v-list-tile-title>
          </v-list-tile>

          <v-list-tile>
            <div @click="setTodayReminder(notes.id)">Later today</div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <v-snackbar
              v-model="snackbar2"
              :bottom="y === 'bottom'"
              :timeout="timeout"
            >Reminder added for</v-snackbar>
            <li style="color: gray;">20:00</li>
          </v-list-tile>

          <v-list-tile>
            <div @click="setTomorrowReminder(notes.id)">Tomorrow</div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <v-snackbar
              v-model="snackbar3"
              :bottom="y === 'bottom'"
              :timeout="timeout"
            >Reminder added forTomorrow</v-snackbar>
            <li style="color: gray;">08:00</li>
          </v-list-tile>

          <v-list-tile>
            <div @click="setNextWeekReminder(notes.id)">Next Week</div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <v-snackbar
              v-model="snackbar4"
              :bottom="y === 'bottom'"
              :timeout="timeout"
            >Reminder added nextWeek</v-snackbar>
            <li style="color: gray;">MON, 8:00</li>
          </v-list-tile>

          <v-list-tile>
            <img
              style=" height: 15px;
    padding-right: 12px !important;"
              src="../assets/clockIcon.svg"
            />
            <div>
              <md-datepicker v-model="selectedDate">
                <label>Select date</label>
              </md-datepicker>
            </div>
          </v-list-tile>
          <v-flex xs6>
            <div @click="$event.stopPropagation()" class="md-layout-item">
              <md-field>
                <md-select v-model="reminder" placeholder="Add Time">
                  <md-option value="Morning 08.00">Morning 08.00</md-option>
                  <md-option value="Evening 18.00">Evening 18.00</md-option>
                  <md-option value="Night 20.00">Night 20.00</md-option>
                  <md-option value>Customise</md-option>
                </md-select>
              </md-field>
            </div>
            <v-spacer></v-spacer>
            <v-btn @click="setMorningTime(notes.id)">Save</v-btn>
          </v-flex>
        </v-list>
      </v-menu>
    </div>
    <v-dialog v-model="dialog" max-width="555" height="100" border-radius="0px">
      <template v-slot:activator="{ on }">
        <div color="blue" dark v-on="on">
          <v-list-tile>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn flat icon small class="btn_note_bar">
                  <img
                    class="btn_note_bar"
                    style="height: 21px;"
                    dark
                    v-on="on"
                    src="../assets/collaborator.svg"
                  />
                </v-btn>
              </template>
              <span>Collaborator</span>
            </v-tooltip>
          </v-list-tile>
        </div>
      </template>
      <v-card>
        <v-list-tile-title style="    font-size: x-large;
    color: black">Collaborators</v-list-tile-title>
        <v-divider></v-divider>
        <v-flex xs12 sm6>
          <v-card-actions>
            <md-field>
              <!-- <div class="coll_icon" >{{`${userName.substr(0,1)}`}}</div>&nbsp;&nbsp; -->
              <div>
                <span class="white--text headline" dark>
                  <img class="coll_icon" :src="URL+image" />
                </span>
              </div>&nbsp;&nbsp;
              <div>
                <h4>{{ `${userName} ${userLastName} (Owner)` }}</h4>
                <v-list-tile-title>{{ emailId }}</v-list-tile-title>
              </div>
            </md-field>
          </v-card-actions>
          <!-- {{ notes.user | json}} -->
          <!-- <md-field>
            <div
              @mouseover="deleteCollabratorIcon(notes.user.id)"
              @mouseout="hideDeleteIcon(notes.user.username)"
              class="delete_collabrator"
            >
              <div>
                <span class="white--text headline" dark>
                  <img class="coll_icon" :src="URL+notes.user.imageUrl">
                </span>
              </div>&nbsp;&nbsp;
              <span>
                <h4>{{ `${notes.user.firstName} ${notes.user.lastName}` }}</h4>
                <v-list-tile-title>{{ notes.user.email }}</v-list-tile-title>
              </span>


              <v-spacer></v-spacer>

              <img
                v-if="notes.user.id == showDeleteCollIcon"
                @click="deleteCollabrator()"
                src="../assets/close.svg"
              >
            </div>
          </md-field>-->

          <v-card-actions class="edit_label">
            <md-field>
              <img class="collabrator" color="red" src="../assets/addColabIcon.svg" />
              <v-spacer></v-spacer>
              <div>
                <input
                  class="coll_input"
                  style="width: 268px;"
                  v-on:keyup="getCollabratorDetails()"
                  v-model="input"
                  placeholder="Porson or email to share with"
                />
              </div>
            </md-field>
          </v-card-actions>
          <div class="emails" v-if="selectedEmailID.length > 0 && input">
            <div v-for="email in selectedEmailID" :key="email.key">
              <span @click="addCollabrator(notes.id)">{{email.email}}</span>
            </div>
          </div>
        </v-flex>
        <v-divider></v-divider>
        <v-card-actions style="background-color:#ccc">
          <v-spacer></v-spacer>
          <v-btn flat @click="dialog = false">cancel</v-btn>
          <v-btn flat @click="addCollabrator(notes.id)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <md-menu md-direction="top-start" md-size="medium" :md-offset-x="127" :md-offset-y="-36">
      <div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn flat icon small>
              <img
                dark
                v-on="on"
                md-menu-trigger
                style="
       height: 20px; width:20px  "
                src="../assets/changeColor.svg"
              />
            </v-btn>
          </template>
          <span>Change color</span>
        </v-tooltip>
      </div>
      <md-menu-content>
        <v-list>
          <v-list-tile v-for="(row,j) in colorCodeAndNames" :key="j">
            <v-list-tile v-for="(color,i) in row" :key="i">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div
                    v-on="on"
                    class="color_color"
                    v-bind:style="{ 'background-color': color.colorCode}"
                    :data-hex="color"
                    @click="changeColorNote(color.colorCode)"
                  ></div>
                </template>
                <span>{{ color.name}}</span>
              </v-tooltip>
            </v-list-tile>
          </v-list-tile>
        </v-list>
      </md-menu-content>
    </md-menu>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn flat icon small>
          <img type="file" dark v-on="on" style="
       height: 20px;" src="../assets/image.svg" />
        </v-btn>
      </template>
      <span>Add Image</span>
    </v-tooltip>
    <!-- archive note -->
    <div>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-if="!archiveNote1" flat icon small @click="archiveNote(notes.id)">
            <img dark v-on="on" style="
       height: 28px;" src="../assets/archive.svg" />
          </v-btn>
        </template>
        <span>Archive</span>
      </v-tooltip>
      <!-- {{archiveNote}} -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-if="archiveNote1" flat icon small @click="unArchiveNote(notes.id)">
            <img dark v-on="on" style="
       height: 28px;" src="../assets/unarchive.svg" />
          </v-btn>
        </template>
        <span>unArchive</span>
      </v-tooltip>
    </div>

    <!-- more menu -->
    <div>
      <md-menu md-size="medium" :md-offset-x="50" :md-offset-y="-26" close-on-content-click="true">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-menu bottom>
              <v-btn flat icon small slot="activator" @click="inMenu = true; isMenu = true">
                <img dark v-on="on" style="
    height: 30px;" src="../assets/more.svg" />
              </v-btn>
              <div class="list_content">
                <v-list>
                  <v-list-tile v-if="hideAll" @click="deleteNote(notes.id)">Delete note</v-list-tile>
                  <v-list-tile>
                    <md-menu md-size="medium" :md-offset-x="127" :md-offset-y="-36">
                      <v-list-tile md-menu-trigger>Add label</v-list-tile>
                      <md-menu-content>
                        <div class="label_box">
                          <v-list-tile-content style="min-height: 20px;!important">
                            <v-list-tile-title>Create label</v-list-tile-title>
                          </v-list-tile-content>
                        </div>
                        <div class="label_box">
                          <input
                            v-model="label"
                            @click="$event.stopPropagationn()"
                            v-on:keyup="addLabel = !addLabel"
                            placeholder="create new label"
                          />
                        </div>
                        <div v-for="label in labels" :key="label.index">
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title
                                @click="addLabels(notes.id,label.id)"
                                color="black"
                              >
                                <img src="../assets/checkBox.svg" />
                                {{ label.label }}
                              </v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </div>
                        <v-divider></v-divider>
                        <md-menu-item style="    width: 150px !important;
    height: 192px ">
                          <div v-if="addLabel" @click="addLabels(notes.id,notes.userId)">
                            <img src="../assets/addLabels.svg" />
                            <label>create label</label>
                            {{ label }}
                          </div>
                          <v-snackbar
                            v-model="snackbar1"
                            :bottom="y === 'bottom'"
                            :timeout="6000"
                          >label added successfuly</v-snackbar>
                        </md-menu-item>
                      </md-menu-content>
                    </md-menu>
                  </v-list-tile>
                  <v-list-tile v-if="hide" @click="tickBox('true',hide=false)">Show tick boxes</v-list-tile>

                  <v-list-tile-content v-if="!hide">
                    <v-list-tile-title @click="tickBox('false',hide=true)">Hide tick boxes</v-list-tile-title>
                  </v-list-tile-content>

                  <div v-if="hideAll">
                    <div v-if="QandA && !showAskQue && !hideQus " @click="navigateToQustionAndAnswer(notes.id)">
                      <v-list-tile-content>
                        <v-list-tile-title>Ask a Question</v-list-tile-title>
                      </v-list-tile-content>
                    </div>

                    <div v-if="!QandA && !showAskQue">
                      <v-list-tile-content>
                        <v-list-tile-title
                          @click="navigateToQustionAndAnswer(notes.id)"
                        >show a Question</v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-content>
                        <v-list-tile-title
                          @click="deleteQustion(notes.questionAndAnswerNotes[0].id)"
                        >delete Question</v-list-tile-title>
                      </v-list-tile-content>
                    </div>
                  </div>
                </v-list>
              </div>
            </v-menu>
          </template>
          <span>More</span>
        </v-tooltip>
      </md-menu>
    </div>
    <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :timeout="timeout">Noted Bin</v-snackbar>
  </div>
</template>
  
  <script>
/*****************************************************************************************************
 *  @Purpose        : Here we have to create all required icons.
 *  @file           : noteIcons.vue
 *  @version        : v0.1
 *****************************************************************************************************/
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import {
  // createNote,
  // getNotes,
  isTrashed,
  setNoteColor,
  isArchive,
  setReminder,
  getCollabDetails,
  // addLabel,
  getLabels,
  labelAdd,
  uploadProfilePic,
  addCollab,
  deleteQustion
} from "../services/noteService.js";
// import createNotes from "./createNotes.vue";
import {
  tickBoxMessageService,
  UpdateTickBoxMessageService
} from "../services/data_service/messageService";
export default {
  name: "dash",
  props: ["notes", "labels"],
  components: {
    VueCropper
  },
  data() {
    return {
      showDeleteCollIcon: "",
      showQustion: true,
      hideAll: true,
      activeBtn: 1,
      showNav: true,
      snackbar: false,
      seen: false,
      QandA: true,
      hide: true,
      hideQus: false,
      showAskQue: true,
      // showCheckBox:false,
      // hideCheckBox:false,
      archiveNote1: false,
      unarchiveNote: true,
      response: "",
      file: "",
      imgSrc: "",
      cropImg: "",
      image: localStorage.getItem("image"),
      selectedFile: null,
      avatar: this.avatar,
      dialog1: false,
      // URL:environment.baseUrl,
      URL: "http://34.213.106.173/",
      imageUrl: "",
      label: "",
      addLabel: false,
      noteLabels: "",
      data: "",
      input: "",
      dialog: false,
      snackbar: false,
      snackbar1: false,
      snackbar2: false,
      snackbar3: false,
      snackbar4: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      text: "Noted Bin",
      selectedDate: null,
      fav: true,
      menu: false,
      userName: localStorage.getItem("firstName"),
      userLastName: localStorage.getItem("lastName"),
      emailId: localStorage.getItem("email"),
      menu: [
        { title: "Delete note", key: 0, isdeleted: false },
        { title: "Change labels", key: 1 }
      ],

      colorCodeAndNames: [
        [
          { name: "default", colorCode: "#FFFFFF" },
          { name: "red", colorCode: "#BC8F8F" },
          { name: "Orange", colorCode: "#FFA500" },
          { name: "Yellow", colorCode: "#FFFF66" }
        ],

        [
          { name: "Green", colorCode: "#90EE90" },
          { name: "Teal", colorCode: "#008080" },
          { name: "Blue", colorCode: "#87CEFA" },
          { name: "DarkBlue", colorCode: "#4682B4" }
        ],

        [
          { name: "Purple", colorCode: "#BA55D3" },
          { name: "Pink", colorCode: "#FFC0CB" },
          { name: "Brown", colorCode: "#BC8F8F" },
          { name: "Gray", colorCode: "#808080" }
        ]
      ],
      e2: "Texas",
      reminder: "",
      email: "",
      collaboratorData: [],
      selectedEmailID: "",
      emailIDOfColl: "",
      collaboratorEmailID: [],
      classArray: [],
      chip1: true,
      hover: false,
      seen: false,
      inMenu: false,
      isMenu: false,
      isArchived: false,
      title: "",
      // text: "",
      todaytime: "20.00",
      tomorrowTime: "8.00",
      nextWeek: "MON, 08.00"
    };
  },
  methods: {
    deleteCollabratorIcon(id) {
      this.showDeleteCollIcon = id;
    },
    hideDeleteIcon(username) {
      this.showDeleteCollIcon = username;
    },
    deleteCollabrator() {},
    async deleteQustion(id) {
      let data = await deleteQustion(id);
    },
    navigateToQustionAndAnswer(id) {
      localStorage.setItem("noteId", id);
      this.$router.push({ path: "/qustionAnswer/" + id });
    },
    // showQustion(boolean, show) {
    //   this.hideAll = show;
    // },
    tickBox(data, show) {
      this.hide = show;
      if (this.notes == undefined) {
        tickBoxMessageService.sendCheckBox(data);
      } else {
        UpdateTickBoxMessageService.sendUpdateCheckBox(data);
      }
    },
    setImage(e) {
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
      this.imageUrl = response.data.status.imageUrl;
      localStorage.setItem("image", this.imageUrl);
    },

    setTodayReminder(noteid) {
      this.snackbar2 = true;
      var date = new Date();
      date.getTime();
      this.todaytime = date.setHours(20);
      this.minutes = date.setMinutes(0);
      let todayReminder = date;
      this.reminderNote(noteid, todayReminder);
    },

    setTomorrowReminder(noteid) {
      this.snackbar3 = true;
      var date = new Date();
      date.setDate(date.getDate() + 1);
      this.tomorrowTime = date.setHours(8);
      this.minutes = date.setMinutes(0);
      let todayReminder = date;
      this.reminderNote(noteid, todayReminder);
    },

    setNextWeekReminder(noteid) {
      this.snackbar4 = true;
      // console.log("In next week reminder");
      var date = new Date();
      date.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7));
      this.nextWeek = date.setHours(8);
      this.minutes = date.setMinutes(0);
      let nextWeekReminder = date;
      // console.log("weekly reminder data=====>", nextWeekReminder);
      this.reminderNote(noteid, nextWeekReminder);
    },
    setMorningTime(noteID) {
      // console.log("morning time", this.reminder);
      var date = new Date();
      date = this.selectedDate;
      if (this.reminder == "Morning 08.00") {
        date.setHours(8);
        date.setMinutes(0);
        let reminder2 = date;
        // console.log("Any Date Reminder data", reminder2);
        this.reminderNote(noteID, reminder2);
      } else if (this.reminder == "Evening 18.00") {
        date.setHours(18);
        date.setMinutes(0);
        let reminder3 = date;
        // console.log("evening reminder", reminder3);
        this.reminderNote(noteID, reminder3);
      } else {
        date.setHours(20);
        date.setMinutes(0);
        let reminder4 = date;
        // console.log("Night reminder", reminder4);
        this.reminderNote(noteID, reminder4);
      }
    },
    async reminderNote(noteid, reminder1) {
      var token = localStorage.getItem("token");
      var data = {
        noteIdList: [noteid],
        reminder: [reminder1]
      };
      await setReminder(data, token);
      // console.log("Result of reminder note", result);
      this.$emit("reminderNote", data);
    },
    deleteNote(noteid) {
      this.snackbar = true;
      // console.log("notes is...............", noteid);
      this.$delete(noteid);
      var value = (this.isdeleted = true);
      this.deleteNoteFromDB(value, noteid);
    },
    //delete note
    async deleteNoteFromDB(value, id) {
      var token = localStorage.getItem("token");
      let deleteData = {
        isDeleted: value,
        noteIdList: [id]
      };
      await isTrashed(deleteData, token);
      this.$emit("deleteNote", deleteData);
    },
    //addLabel
    async addLabels(noteId, labelid) {
      this.snackbar1 = true;
      // console.log("in addLabels", labelid);
      var token = localStorage.getItem("token");
      var labelData = {
        lableId: labelid,
        noteIdList: [noteId]
      };
      await labelAdd(labelData, token);
      this.$emit("addLabelNote", labelData);
      // console.log("Response for label", data);
    },
    //getLabel
    async getAllLabel() {
      var result = await getLabels(localStorage.getItem("token"));
      this.noteLabels = result.data.data.details;
    },

    send: function(tit, txt) {
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
    //display collabrator details
    async getCollabratorDetails() {
      // console.log("Input is ", this.input);
      var token = localStorage.getItem("token");
      var input = {
        searchWord: this.input
      };

      var collDetails = await getCollabDetails(input, token);
      this.emailIDOfColl = collDetails.data.data.details;
      var emails = this.emailIDOfColl.filter(search => {
        if (search.email == undefined) {
        } else {
          var data = search.email.startsWith(this.input);
          this.selectedEmailID = search.email;
          return data;
        }
      });

      this.selectedEmailID = emails;
    },
    //add collabratos
    async addCollabrator(noteId) {
      this.dialog = false;
      var token = localStorage.getItem("token");
      let collData = {
        firstName: this.emailIDOfColl[0].firstName,
        lastName: this.emailIDOfColl[0].lastName,
        email: this.emailIDOfColl[0].email,
        userId: this.emailIDOfColl[0].userId,
        id: noteId
      };
      var data = await addCollab(collData, token);

      this.$emit("addCollabrator", data);
    },
    //archive note
    archiveNote(noteid) {
      this.$delete(noteid);
      var value = (this.isArchived = true);
      this.archiveNoteFromDB(value, noteid);
    },
    //unarchive note
    unArchiveNote(noteid) {
      this.$delete(noteid);
      var value = (this.isArchived = false);
      this.archiveNoteFromDB(value, noteid);
    },
    //delete note
    async archiveNoteFromDB(value, id) {
      var token = localStorage.getItem("token");
      let archiveData = {
        isArchived: value,
        noteIdList: [id]
      };
      await isArchive(archiveData, token);
      this.$emit("archiveNote", archiveData);
    },
    async changeColorNote(colorCode) {
      // console.log("in noteIcon",this.notes.id);

      if (this.notes != undefined) {
        var token = localStorage.getItem("token");
        var codeColor = colorCode;
        var data = {
          color: codeColor,
          noteIdList: [this.notes.id]
        };

        await setNoteColor(data, token);
        this.$emit("changeColor", data);
      } else {
        this.$emit("sendColor", colorCode);
      }
    }
  },
  mounted() {
    // console.log("in note icon ",this.notes.questionAndAnswerNotes.length == 0);
    // this.unArchiveNote = false;
    if (this.notes == undefined) {
      this.archiveNote1 = false;
      // this.hide = false;
      this.hideAll = false;
    } else {
      if (this.notes.isArchived == false) {
        this.archiveNote1 = false;
      } else if (this.notes.isArchived == true) {
        this.archiveNote1 = true;
      }
      // console.log("notes", this.notes);
      if (this.notes.length > 0) {
        if (this.notes.questionAndAnswerNotes.length <= 0) {
          this.QandA = false;
          console.log("Q&A", this.QandA);
        } else {
          this.hideQus = true;
        }
        if (notes.collabrator.length <= 0) {
          this.showAskQue = true;
        }
      } else {
      }
    }
  }
};
</script>

<style scoped>
.md-menu-content-top-start.md-menu-content-medium.md-menu-content.md-theme-default {
  z-index: 9999 !important;
}
.delete_collabrator {
  display: flex;
  flex-direction: row;
}
.labe_menu {
  height: 156px !important;
  width: 150px !important;
}
.list_content {
  width: 135px !important;
  height: 150px !important;
}
.label_box {
  min-height: 30px;
  padding: 4px 16px;
}
.md-list-item-content {
  min-height: 30px !important;
}
.coll_icon {
  background-size: cover;
  height: 60px;
  width: 50px;
  border-radius: 50%;
  /* background-color: red; */
  text-align: center;
  color: #fff;
  font-size: 20px;
}

.emails {
  box-sizing: inherit;
  display: flex;
  flex-direction: column;
  /* flex-flow: wrap; */
  /* overflow: auto; */
  justify-content: center;
  overflow: auto;
  border: 1px solid gray;
  height: 48px;
  width: auto;
  background-color: papayawhip;
}

.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  background-color: #9e9e9e !important;
  color: white !important;
}
.coll_Email {
  max-height: 50px;
  scroll-behavior: 100px;
}
.coll_input {
  background-color: transparent;
  border-style: none;
  color: inherit;
  padding-top: 12px;
  padding-left: 12px;
}
.collabrator {
  /* height: auto; */
  height: 50px;
  /* width: 50px; */
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  border: 1px solid #ccc;
  border-radius: 50px;
}

.v-menu__content[data-v-325a32ce] {
  display: inline-block;
  overflow-y: auleto;
  overflow-x: hidden;
  width: fit-content !important;
  height: fit-content !important;
}

/* .v-menu__content[data-v-75273e68] {
  position: absolute;
  display: -webkit-box;
  max-width: 100%;
  overflow-y: auleto;
  overflow-x: hidden;
  contain: content;
  background-color: white;
    width: fit-content !important;
    height: fit-content !important;
  overflow: hidden;
  border-radius: 0px !important;
} */
/* .v-menu__content {
  position: absolute;
  display: inline-block;
  max-width: 100%;
  overflow-y: auleto;
  overflow-x: hidden;
  contain: content;
  background-color: white;
  border-radius: 0px !important;
} */
.theme--light.v-list {
  background: #fff !important;
  color: rgba(0, 0, 0, 0.87);
}

.md-datepicker-dialog.md-theme-default {
  position: absolute;
  top: 399px;
  left: 285px;
  will-change: top, left;
}
.md-field > .md-icon ~ label {
  left: 130px;
}
/* .md-list-item-content {
    min-height: 40px !important;
  } */
</style>
  <style>
.md-option {
  min-height: 20px !important;
  /* padding: 5px 16px!important; */
}
.md-select-menu.md-menu-content-bottom-start.md-menu-content-small.md-menu-content.md-theme-default {
  display: flex;
  width: 259px;
  height: 305px;

  top: 290px;
  left: 515px;
  background-color: #fff;
}
.md-icon-image svg {
  height: 70% !important;
  flex: 1;
  transition: fill 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.md-menu-content.md-menu-content-medium {
  min-width: 168px;
  background-color: white !important;
}
.date {
  position: absolute;
  will-change: top, left;
  top: 292px;
  left: 517px;
}

.md-datepicker-dialog {
  background-color: white;

  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  display: flex;
  overflow: hidden;
  z-index: 11;
  border-radius: 2px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  pointer-events: auto;
  transform-origin: top left;
  transition: opacity 0.2s cubic-bezier(0.25, 0.8, 0.25, 1),
    transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: opacity, transform, left, top;
}

.md-datepicker-header {
  min-width: 0px !important;
  padding: 0px !important;
}
.md-datepicker-header .md-datepicker-date-select {
  cursor: pointer;
  opacity: 0.54;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 9px !important;
  font-weight: 400 !important;
  letter-spacing: 0;
  line-height: 1.2em;
}
/* .md-datepicker-dialog.md-theme-default {
    height: 300px !important;
    width: 236px !important;
} */

.md-datepicker-dialog.md-theme-default {
  top: 291px !important;
  left: 517px !important;
  height: 300px !important;
  width: 259px !important;
}

.reminder_btn {
  height: 20%;
  width: 30%;
}
element.style {
  position: absolute;
  top: 292px !important;
  left: 517px !important;
  will-change: top, left;
}
.md-menu-content.md-menu-content-medium {
  min-width: 140px !important;
}

.v-list__tile {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: inherit;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 16px;
  font-weight: 400;
  height: 31px !important;
  margin: 0;
  padding: 0 2px !important;
  position: relative;
  text-decoration: none;
  -webkit-transition: background 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: background 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
/* .v-menu__content {
  position: absolute;
  display: inline-block;
  max-width: 100%;
  overflow-y: auleto;
  overflow-x: hidden;
  contain: content;

  border-radius: 6px !important;
} */
.color_color {
  display: flex;
  height: 25px;
  width: 25px;
  border-radius: 50px;

  padding: 0px;
}
.border_color {
  display: none;
}
.color_color :hover {
  border: 5px solid black;
}
.munu_bar {
  display: flex;
}
.btn_note_bar {
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
.note_icon {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-font-feature-settings: "liga";
  font-feature-settings: "liga";
  font-size: 10px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  line-height: 1;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  vertical-align: text-bottom;
}
#app {
  padding-top: 0px;
}
/* .note_icon{
  display: flex;
  flex-direction: row
} */

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
</style>
