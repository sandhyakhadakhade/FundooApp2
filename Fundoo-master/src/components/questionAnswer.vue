<template>
  <div id="app">
    <v-app>
      <div class="froala_editor" v-for="note in response" :key="note.id">
        <div class="note">
          <div class="note_data">
            <div class="note_title">{{ note.title}}</div>
            <div class="note_description">{{note.description}}</div>

            <div class="display_checkList" v-for="list in note.noteCheckLists" :key="list.itemName">
              <div v-if="list.status == 'open' && list.isDeleted == false " class="open_checkBox">
                <img src="../assets/checkBox.svg">
                <span class="ckeckList_name">{{list.itemName}}</span>
              </div>
            </div>
            <div
              class="display_checkList"
              v-for="listClose in note.noteCheckLists"
              :key="listClose.index"
            >
              <div v-if="listClose.status == 'close' && listClose.isDeleted == false ">
                <v-divider></v-divider>
                <div class="close_CheckBox">
                  <img src="../assets/onClose.svg">
                  {{listClose.itemName}}
                </div>
              </div>
            </div>
          </div>
          <v-btn flat small @click="nevigateToHome()">close</v-btn>
        </div>

        <br>

        <div class="full_width" v-if="!show">
          <span class="name">Ask a Question</span>
          <froala :tag="'textarea'" :config="config" v-model="model"></froala>
          <v-btn
            flat
            small
            color="#673ab7;"
            style="  color: #673ab7 !important;"
            class="close_btn"
            @click="askQustion(note.id)"
          >Ask</v-btn>
          <br>
        </div>

        <div v-if="show">
          <span class="name">Question Asked</span>
        </div>
        <div
          v-if="note.questionAndAnswerNotes.length>0"
          style="opacity: 0.5;"
          v-html="note.questionAndAnswerNotes[0].message"
        ></div>
        <br>
        <v-divider></v-divider>


        <!-- FirstQustion -->

        <div class="show_qustion" v-if="note.questionAndAnswerNotes[0]">
          <div class="user_likes">
            <span class="white--text headline" dark>
              <img class="coll_icon" :src="URL+note.questionAndAnswerNotes[0].user.imageUrl">
            </span>
            <div class="user_info">
              &nbsp; &nbsp;{{ `${note.questionAndAnswerNotes[0].user.firstName} ${ note.questionAndAnswerNotes[0].user.lastName} `}} {{note.questionAndAnswerNotes[0].user.modifiedDate }}
              <span
                style=" font-size: 22px; padding-left: 5%;"
                v-if="model"
                v-html="note.questionAndAnswerNotes[0].message"
              ></span>
            </div>

            <v-btn
              @click="openEditor(note.questionAndAnswerNotes[0].id)"
              flat
              icon
              small
              class="btn_note_bar"
              font-size="20px"
            >
              <v-icon>reply</v-icon>
            </v-btn>

            <v-btn
              @click="likesOfQustionAndAnswer(note.questionAndAnswerNotes[0].id)"
              flat
              icon
              small
              class="btn_note_bar"
              font-size="20px"
            >
              <img src="../assets/thumb_up.svg">
            </v-btn>
            <div v-for="(likes , index) in note.questionAndAnswerNotes[0].like" :key="index">
              <span v-if="likes.like==true">{{ `${userLike + 1 }` }}</span> likes
            </div>
            <div @click="setRating(note.questionAndAnswerNotes[0].id)">
              <star-rating v-bind:star-size="20" @rating-selected="rating = $event"></star-rating>
            </div>
          </div>

          <div v-if="note.questionAndAnswerNotes[0].id == editor">
            <froala :tag="'textarea'" :config="config" v-model="model"></froala>
            <v-btn
              flat
              small
              color="#673ab7;"
              style="  color: #673ab7 !important;"
              class="close_btn"
              @click="replyQustionAndAnswer(note.questionAndAnswerNotes[0].id)"
            >reply</v-btn>
          </div>
        </div>

        <!-- FirstAns  -->
        <div v-for="Ans1 in note.questionAndAnswerNotes" :key="Ans1.id">
          <!-- 1queID:{{ firstQustionID}} parentID:{{ qustion.parentId }} -->
          <div class="firstAns" v-if="firstQustionID == Ans1.parentId">
            <div class="user_likes">
              <span class="white--text headline" dark>
                <img class="coll_icon" :src="URL+Ans1.user.imageUrl">
              </span>
              <div class="user_info">
                &nbsp; &nbsp;{{ `${Ans1.user.firstName} ${ Ans1.user.lastName} `}} {{Ans1.user.modifiedDate }}
                <span
                  style=" font-size: 22px; padding-left: 5%;"
                  v-if="model"
                  v-html="Ans1.message"
                ></span>
              </div>

              <v-btn
                @click="openEditor(Ans1.id)"
                flat
                icon
                small
                class="btn_note_bar"
                font-size="20px"
              >
                <v-icon>reply</v-icon>
              </v-btn>

              <v-btn
                @click="likesOfQustionAndAnswer(Ans1.id)"
                flat
                icon
                small
                class="btn_note_bar"
                font-size="20px"
              >
                <img src="../assets/thumb_up.svg">
              </v-btn>
              <div v-for="(likes , index) in Ans1.like" :key="index">
                <span v-if="likes.like==true">{{ `${userLike + 1 }` }}</span> likes
              </div>
              <div @click="setRating(Ans1.id)">
                <star-rating v-bind:star-size="20" @rating-selected="rating = $event"></star-rating>
              </div>
            </div>

            <div v-if="Ans1.id == editor">
              <froala :tag="'textarea'" :config="config" v-model="model"></froala>
              <v-btn
                flat
                small
                color="#673ab7;"
                style="  color: #673ab7 !important;"
                class="close_btn"
                @click="replyQustionAndAnswer(Ans1.id)"
              >reply</v-btn>
            </div>
          </div>

          <!-- SecondAns -->
          <!-- ans1:{{ qustion.id}}  ans1 of Ans parentID:{{ Ans2.parentId }} -->
          <div class="Second_Ans" v-for="Ans2 in note.questionAndAnswerNotes" :key="Ans2.id">
            <div
              class="show_qustion"
              v-if="firstQustionID == Ans1.parentId && Ans1.id == Ans2.parentId"
            >
              <div class="user_likes">
                <span class="white--text headline" dark>
                  <img class="coll_icon" :src="URL+Ans2.user.imageUrl">
                </span>
                <div class="user_info">
                  &nbsp; &nbsp;{{ `${Ans2.user.firstName} ${ Ans2.user.lastName} `}} {{Ans2.user.modifiedDate }}
                  <span
                    style=" font-size: 22px; padding-left: 5%;"
                    v-if="model"
                    v-html="Ans2.message"
                  ></span>
                </div>

                <v-btn
                  @click="openEditor(Ans2.id)"
                  flat
                  icon
                  small
                  class="btn_note_bar"
                  font-size="20px"
                >
                  <v-icon>reply</v-icon>
                </v-btn>

                <v-btn
                  @click="likesOfQustionAndAnswer(Ans2.id)"
                  flat
                  icon
                  small
                  class="btn_note_bar"
                  font-size="20px"
                >
                  <img src="../assets/thumb_up.svg">
                </v-btn>
                <div v-for="(likes , index) in Ans2.like" :key="index">
                  <span v-if="likes.like==true">{{ `${userLike + 1 }` }}</span> likes
                </div>
                <div @click="setRating(Ans2.id)">
                  <star-rating v-bind:star-size="20" @rating-selected="rating = $event"></star-rating>
                </div>
              </div>

              <div v-if="Ans2.id == editor">
                <froala :tag="'textarea'" :config="config" v-model="model"></froala>
                <v-btn
                  flat
                  small
                  color="#673ab7;"
                  style="  color: #673ab7 !important;"
                  class="close_btn"
                  @click="replyQustionAndAnswer(Ans2.id)"
                >reply</v-btn>
              </div>
            </div>
          </div>
        </div>
        <!--  end of FistAns for loop -->
      </div>
    </v-app>
  </div>
</template>

<script>
import VueFroala from "vue-froala-wysiwyg";
import StarRating from "vue-star-rating";
import {
  getNoteDetail,
  addQustionAndAnswer,
  getQustionAndAnswer,
  likesOfQustionAndAnswer,
  replyQustionAndAnswer,
  ratingOfAnswer
} from "../services/noteService";
export default {
  components: {
    StarRating
  },
  data() {
    return {
      config: {
        events: {
          "froalaEditor.initialized": function() {
            // console.log("initialized");
          }
        }
      },
      quationAndAnswer: [],
      firstQustionID: "",
      userLike: 0,
      rating: 0,
      showReply: false,
      editor: "",
      thumb: true,
      likes: "",
      model: "Edit Your Content Here!",
      show: false,
      URL: "http://34.213.106.173/",
      image: localStorage.getItem("image"),
      noteID: "",
      response: [],
      getNote: []
    };
  },
  methods: {
    openEditor(parentId) {
      this.editor = parentId;
      this.showReply = true;
      // this.openEditor = parentId;
    },
    async likesOfQustionAndAnswer(parentId, value) {
      this.thumb = value;
      var token = localStorage.getItem("token");
      var data = {
        like: true
      };
      let res = await likesOfQustionAndAnswer(data, parentId, token);
      // console.log("REsult",res.data.data.details.count);
      this.likes = res.data.data.details;
    },
    async askQustion(noteId) {
      var token = localStorage.getItem("token");
      // console.log('message',this.model.slice(3));
      let data = {
        message: this.model,
        notesId: noteId
      };
      var res = await addQustionAndAnswer(data, token);
      // console.log("result of addQustionAndAnswer", res);
    },
    nevigateToHome() {
      this.$router.push({ path: "/notelist" });
    },
    // async getQustionAndAnswer(){
    //   let token = localStorage.getItem('token')
    //   let  id = this.$route.params;
    //   let response  = await getQustionAndAnswer(id,token);
    // },
    async replyQustionAndAnswer(parentId) {
      let object = {
        message: this.model
      };
      var data = await replyQustionAndAnswer(parentId, object);
      // console.log("response of resply qustion", data);
    },
    async getNoteData() {
      this.noteID = localStorage.getItem("noteId");
      var token = localStorage.getItem("token");
      let obj = {
        noteId: this.noteID
      };
      var result = await getNoteDetail(token);
      this.response = result.data.data.data;
      console.log("Q & A response", this.response);
      this.quationAndAnswer =
        result.data.data.data[0].questionAndAnswerNotes[0];

      console.log("in getNoteData", this.response);

      this.firstQustionID = this.quationAndAnswer.id;
      console.log("id", this.firstQustionID);

      if (
        this.response[0].questionAndAnswerNotes.length == 0 &&
        this.response[0].questionAndAnswerNotes.length
      ) {
        this.show = false;
        // console.log("after if", this.show);
      } else if (this.response[0].questionAndAnswerNotes.length > 0) {
        this.show = true;
        // console.log("else", this.show);
      }
    },
    async setRating(parentId) {
      // this.rating =  rating
      var ratingOfAns = {
        rate: this.rating
      };
      let data = await ratingOfAnswer(parentId, ratingOfAns);
      // console.log("result of rating", data);
    },
    showCurrentRating: function(rating) {
      this.currentRating =
        rating === 0
          ? this.currentSelectedRating
          : "Click to select " + rating + " stars";
    },
    setCurrentSelectedRating: function(rating) {
      this.currentSelectedRating = "You have Selected: " + rating + " stars";
    }
  },
  mounted() {
    // this.noteID = this.$route.params;
    this.getNoteData();
    // this.getQustionAndAnswer();
  }
};
</script>

<style>
.firstAns {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 2% 0% 2% 0%;
  overflow-y: auto;
}
.Second_Ans {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.user_likes {
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
}
.user_info {
  display: flex;
  flex-direction: column;
}
.Qustion {
  font-size: 20px;
  /* word-wrap: break-word; */
}
.reply {
  display: flex;
  flex-direction: column;
}
.coll_icon {
  background-size: cover;
  height: 48px !important;
  width: 60px;
  border-radius: 50%;
  display: flex;
  position: relative;
  /* background-color: red; */
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  color: #fff;
  font-size: 20px;
}
.show_qustion {
  margin: 2% 0% 2% 0%;
  overflow-y: auto;
  /* overflow: auto; */
  /* max-height: 80px; */
  /* display: flex;
  flex-direction: row;
  justify-content: space-around; */
}
.name {
  font-size: 20px;
  word-wrap: break-word;
}
.note_data {
  width: 791px;
  height: 80px;
  margin-bottom: 20px;
  margin-top: 20px;
  max-height: 80px;
  overflow-y: auto;
}
.v-btn__content {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: inherit;
  /* color: black !important; */
}
.note_title {
  /* margin-bottom: 20px;
    margin-top: 20px; */
  max-height: 80px;
  overflow-y: auto;
}
.note_description {
  font-size: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden !important;
  word-wrap: break-word;
}
.froala_editor {
  margin-left: 10%;
  margin-right: 10%;
  padding-top: 100px;
}
#logo > span {
  display: none !important;
}
.note {
  /* overflow: scroll !important; */
  /* overflow: auto;
overflow-y: hidden; */
  /* flex-direction: column; */
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
  font-size: 28px;
  word-wrap: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* margin-left: 250px; */
  /* overflow: hidden !important; */
}
.display_checkList {
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
  word-break: break-all;
}
.close_CheckBox {
  font-size: smaller;
  height: 37px;
  text-decoration: line-through;
}
.open_checkBox {
  font-size: smaller;
  height: 37px;
}
.ckeckList_name {
  width: 12px;
}
.add_icon {
  background-size: 15px 15px;
  height: 18px;
  opacity: 0.54;
  outline: none;
  position: absolute;
  top: 5px;
  width: 18px;
  cursor: pointer;
  pointer-events: auto;
}
.v-btn {
  color: #673ab7;
}
.close_btn {
  color: #673ab7 !important;
  /* margin-right: 140px !important; */
  float: right;
  margin-top: 10px;
}
@media only screen and (max-device-width: 480px) {
  .coll_icon {
    height: 20px;
    width: 40px;
  }
  .user_info {
    padding-right: 10px;
  }
}
/* .v-btn__content {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: inherit;
    color: #673ab7 !important;
} */
/* .close_btn{
    box-sizing: border-box;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    outline: 0;
    border: none;
    -webkit-tap-highlight-color: transparent;
    display: inline-block;
    white-space: nowrap;
    text-decoration: none;
    vertical-align: baseline;
    text-align: center;
    margin: 0;
    min-width: 88px;
        width: 77px  !important;
    line-height: 36px;
    padding: 0 16px;
    border-radius: 2px;
    overflow: visible;
} */
/* .note_data{
      flex-direction: row;
    box-sizing: border-box;
    display: flex;
    max-height: 100%;
    place-content: stretch inherit;
    align-items: stretch;
} */
</style>
