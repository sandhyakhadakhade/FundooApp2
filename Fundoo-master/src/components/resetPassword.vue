<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">
      <div class="title">
        <p>
          <span style="color: blue; font-size: 25px">F</span>
          <span style="color: red; font-size: 20px">u</span>
          <span style="color: lime; font-size: 20px">n</span>
          <span style="color: blue; font-size: 20px">d</span>
          <span style="color: green; font-size: 20px">o</span>
          <span style="color: red; font-size: 20px">o</span>
        </p>
        <div class="md-title">ResetPassword</div>
      </div>
      <form class="ui form" @submit.prevent="onSubmit">
        <div>
          <md-field md-has-password>
            <input
              v-validate="'required'"
              name="password"
              type="password"
              :class="{'is-danger': errors.has('password')}"
              placeholder="New-Password"
              v-model="reset.Password"
              ref="password"
            >
            <md-icon class="material-icons">https</md-icon>
          </md-field>

          <span v-show="errors.has('password')" class="help is-danger">
            {{ errors.first('password') }}
            <md-icon class="material-icons">error</md-icon>
          </span>

          <md-field>
            <input
              v-validate="'required|confirmed:password'"
              name="password_confirmation"
              type="password"
              :class="{'is-danger': errors.has('password_confirmation')}"
              placeholder="Password, Again"
              data-vv-as="password"
            >
          </md-field>
          <span
            v-show="errors.has('password_confirmation')"
            class="help is-danger"
          >{{ errors.first('password_confirmation') }}</span>
        </div>
        <div class="action md-layout md-alignment-center-space-between">
          <md-button type="submit" background-color='#0080fe' class="md-raised md-primary">Submit</md-button>
        </div>
      </form>
    </md-content>
    <div class="background"/>
  </div>
</template>

<script>
import Vue from "vue";
// import router from "/home/admin1/JavaScript/FundoNotes/fundoonotes/src/router.js";
import router from '../router'
import { resetPassword } from "../services/userService.js";
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);
export default {
  name: "reset",
  data() {
    return {
      loading: false,
      reset: {
        Password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    nevigateToLogin() {
      router.push({ path: "/" });
    },
    async userData() {
      var token = this.$route.params.token;
      let newUser = {
        newPassword: this.reset.Password
      };
      await resetPassword(newUser, token);
    },

    onSubmit() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.userData().then(this.nevigateToLogin());
          alert(
            "Your password has been successful reset, you can now login with your new password"
          );
        }
      });
    }
  },
  beforeMount() {
     this.$route.params.token;
  }
};
</script>

<style lang="scss">

.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 75vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }

  .md-button {
    margin: 0;
    align-items: center;
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
      align-items: center;
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
