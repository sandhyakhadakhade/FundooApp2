<template>
  <div>
    <v-list-tile-title style="    font-size: x-large;
    color: black">Collaborators</v-list-tile-title>
    <v-divider></v-divider>
    <v-flex xs12 sm6>
      <v-card-actions>
        <md-field>
          <!-- <div class="coll_icon" >{{`${userName.substr(0,1)}`}}</div>&nbsp;&nbsp; -->
          <div>
            <span class="white--text headline" dark>
              <img class="coll_icon" :src="URL+image">
            </span>
          </div>&nbsp;&nbsp;
          <div>
            <h4>{{ `${userName} ${userLastName} (Owner)` }}</h4>
            <v-list-tile-title>{{ emailId }}</v-list-tile-title>
          </div>
        </md-field>
      </v-card-actions>

      <!-- <v-card-actions>
            <md-field>
             
              <div>
                <span class="white--text headline" dark>
                  {{`${user.firstName.stsubstr(0,1)}`}}
                  <img class="coll_icon" :src="URL+image">
                </span>
              </div>&nbsp;&nbsp;
              <div v-for="user in notes.collaborators" :key="user.id" >
                <h4>{{ `${user.firstName} ${user.lastName}` }}</h4>
                <v-list-tile-title>{{ user.email }}</v-list-tile-title>
              </div>
            </md-field>
      </v-card-actions>-->

      <v-card-actions class="edit_label">
        <md-field>
          <img class="collabrator" color="red" src="../assets/addColabIcon.svg">
          <v-spacer></v-spacer>
          <div>
            <input
              class="coll_input"
              style="width: 268px;"
              v-on:keyup="getCollabratorDetails()"
              v-model="input"
              placeholder="Porson or email to share with"
            >
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
      <v-btn flat>cancel</v-btn>
      <v-btn flat @click="addCollabrator(notes.id)">Save</v-btn>
    </v-card-actions>
  </div>
</template>
<script>
import { getCollabDetails, addCollab } from "../services/noteService.js";
export default {
  data() {
    return {
      collaboratorData: [],
      selectedEmailID: "",
      emailIDOfColl: "",
      collaboratorEmailID: [],
      URL: "http://34.213.106.173/",
    image: localStorage.getItem("image"),
      input: "",
         userName: localStorage.getItem("firstName"),
      userLastName: localStorage.getItem("lastName"),
      emailId: localStorage.getItem("email"),
      props:["allNote"]
    };
  },
  methods: {
    //display collabrator details
    async getCollabratorDetails() {
      // console.log("Input is ", this.input);
      var token = localStorage.getItem("token");
      var input = {
        searchWord: this.input
      };
      var collDetails = await getCollabDetails(input, token);
      // console.log("response", this.notes);
      this.emailIDOfColl = collDetails.data.data.details;
      // console.log("EmailId", this.emailIDOfColl);
      var emails = this.emailIDOfColl.filter(search => {
        if (search.email == undefined) {
        } else {
          // console.log("In else part",search.email);
          var data = search.email.startsWith(this.input);
          this.selectedEmailID = search.email;
          //  console.log("In after else part",search.email);
          return data;
        }
      });
      this.selectedEmailID = emails;
    },
    //add collabratos
    async addCollabrator(noteId) {
      var token = localStorage.getItem("token");
      let collData = {
        firstName: this.emailIDOfColl[0].firstName,
        lastName: this.emailIDOfColl[0].lastName,
        email: this.emailIDOfColl[0].email,
        userId: this.emailIDOfColl[0].userId,
        id: noteId
      };
      var data = await addCollab(collData, token);
      // this.response = data.error.message;
      // console.log("User",data);

      this.$emit("addCollabrator", data);
    }
  },
  mounted(){
      // console.log("in coll component",this.allNote);
    //      <collabrator v-bind:allNote="notes"></collabrator>
  }
};
</script>
