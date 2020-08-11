<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">
      <v-flex justify-center>
        <div class="title">
          <p>
            <span style="color: blue; font-size: 25px">F</span>
            <span style="color: red; font-size: 20px">u</span>
            <span style="color: lime; font-size: 20px">n</span>
            <span style="color: blue; font-size: 20px">d</span>
            <span style="color: green; font-size: 20px">o</span>
            <span style="color: red; font-size: 20px">o</span>
          </p>
          <div class="md-title">Find your Email</div>
        </div>
        <span style="font-size: 20px">Enter your recovery email</span>
         
        <form class="ui form" @submit.prevent="onSubmit">
           <br>
          <div class="field" :class="{error: errors.has('email')}">
            <md-field>
              <label for="email">Email</label>
              <md-input
                type="email"
                name="email"
                placeholder="Email-Address"
                v-validate="'required|email'"
                v-model="User.Email"
              />
            </md-field>
            <div class="error" v-if="errors.has('email')">
              {{errors.first('email')}}
              <md-icon class="material-icons">error</md-icon>
            </div>
          </div>
          <br>
          <v-flex xs12 sm4 text-xs-center>
            <div class="my-2" align="left">
              <v-btn type="submit" class="ui submit button">Submit</v-btn>
            </div>
          </v-flex>
          <br>
        </form>
      </v-flex>
    </md-content>
    <div class="background"/>
  </div>
</template>
<script>
import Vue from "vue";
// import router from "/home/admin1/JavaScript/FundoNotes/fundoonotes/src/router.js";
import router from '../router'
import { forgotPassword } from "../services/userService.js";
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);
export default {
  name: "reset",
  data() {
    return {
      loading: false,
      User: {
        Email: ""
      }
    };
  },
  methods: {
    nevigateToLogin() {
      router.push({ path: "/" });
    },
    onSubmit() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.userData();
          alert("token sent check your email");
        }
      });
    },
    userData() {
      let newUser = {
        email: this.User.Email
      };
      forgotPassword(newUser);
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  background-color: #1a73e8 !important;
  color: white !important;
}
.flex.sm4 {
  -ms-flex-preferred-size: 33.33333333333333%;
  flex-basis: 33.33333333333333%;
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  max-width: 33.33333333333333%;
  padding-left: 177px !important;
}
.centered-container {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 30vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .error {
    color: red;
  }
  .md-button {
    margin: 0;
    align-items: right;
  }

  .form {
    margin-bottom: 60px;
  }
  .background {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;

    .md-button {
      background-color: #0080fe;
      align-items: right;
    }
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
