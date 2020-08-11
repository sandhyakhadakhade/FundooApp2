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
        <div class="md-title">Sign in</div>
        <br />
        <div class="md-body-1">Use your Fundoo Account</div>
      </div>

      <div class="form" :class="{error: errors.has('email')}">
        <md-field>
          <md-icon class="md-accent">people</md-icon>
          <label>Email</label>

          <md-input v-model="login.email" autofocus v-validate="'required|email'"></md-input>
          <div class="error" v-if="errors.has('email')">{{errors.first('email')}}</div>
        </md-field>
        <md-field md-has-password>
          <md-icon class="material-icons">https</md-icon>
          <label>password</label>
          <md-input v-model="login.password" type="password"></md-input>
        </md-field>
        <br />
        <div class="action md-layout md-alignment-center-space-between">
          <tr class="link" v-on:click="nevigateToForgotPassword()">Forgot password?</tr>
        </div>
        <br />
        <br />

        <div class="action md-layout md-alignment-center-space-between">
          <tr class="link" v-on:click="nevigateToCreateAccount()">Create account</tr>
          <div align="center">
            <v-btn
              text
              class="login"
              style="
                background-color:blue; color:white"
              @click.prevent="onSubmit"
            >Login</v-btn>
          </div>
        </div>
      </div>
      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>
    </md-content>
    <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :timeout="timeout">{{ text }}</v-snackbar>
    <div class="background" />

    <div v-if="localServiceID" class="cart-background">
      <div class="login-cart">
        <h2 style="height: 94px;">Service</h2>
        <carts></carts>
      </div>
    </div>

    <!-- <div class="background"/>   -->
  </div>
</template>

<script>
import Vue from "vue";
import { userLogin } from "../services/userService.js";
import router from "../router";
import VeeValidate from "vee-validate";
import carts from "./carts";
Vue.use(VeeValidate);
export default {
  name: "login",
  components: {
    carts
  },
  data() {
    return {
      localServiceID: "",
      loading: false,
      login: {
        email: "",
        password: ""
      },
      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 7000,
      text: "Login Succsfully"
    };
  },
  methods: {
    nevigateToForgotPassword() {
      router.push({ path: "/forgotPassword" });
    },
    nevigateToCreateAccount() {
      router.push({ path: "/registration" });
    },
    nevigateTodashboard() {
      router.push({ path: "/notes" });
    },
    onSubmit() {
      //this.snackbar = true;
      this.$validator.validateAll().then(response => {
        if (response) {
          this.userData(); //.then(this.nevigateTodashboard);
        } else
          err => {
            return err;
          };
      });
    },
    async userData() {
      let newUser = {
        email: this.login.email,
        password: this.login.password,
        cartID: this.localServiceID
      };
      var data = await userLogin(newUser);
      // console.log("Login response",data);

      if (data.status == 200) {
        this.text = "Login Successfull";
        this.snackbar = true;
        localStorage.setItem("token", data.data.id);
        localStorage.setItem("firstName", data.data.firstName);
        localStorage.setItem("lastName", data.data.lastName);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("userId", data.data.userId);
        localStorage.setItem("image", data.data.imageUrl);
        localStorage.removeItem("loginServiceID");
        this.nevigateTodashboard();
      } else {
        this.text = "Login failed, please check the credentials";
        this.snackbar = true;
      }
    }
  },
  mounted() {
    this.localServiceID = localStorage.getItem("loginServiceID");
    console.log("in login mounted", this.localServiceID);
  }
};
</script>
<style>
@media only screen and (max-width: 599px) {
  .md-content.md-elevation-3.md-theme-default {
    padding-top: 212px;
  }

  .cart-background {
    display: flex;
    justify-content: space-evenly;
    width: 318px !important;
  }
  .login-cart {
    max-width: 34%;
  }
  .centered-container {
    display: flex;
    flex-direction: column;
  }
}
.login-cart {
  flex-direction: column;
  box-sizing: border-box;
  display: flex;
  flex: 1 1 30%;
  max-width: 34%;
  /* max-width: 100%; */
  justify-content: center;
}
.cart-background {
  border-radius: 5px;
  display: flex;
  justify-content: center !important;
  height: 512px;
  width: 479px;
  background-color: #d0d1d1;
  z-index: -1;
}
.md-field.md-focused label,
.md-field.md-has-value label {
  pointer-events: auto;
  top: -7px !important;
  opacity: 1;
  font-size: 12px;
}
.md-field label {
  position: absolute;
  top: 17px !important;
}

.md-field .md-input,
.md-field .md-textarea {
  height: 45px !important;
}
.md-field .md-input,
.md-field .md-textarea {
  height: 76px;
  padding: 0;
  display: block;
  flex: 1;
  border: none;
  background: none;
  transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: font-size, padding-top, color;
  font-family: inherit;
  font-size: 16px;
  line-height: 32px !important;
}
</style>


<style lang="scss">
.md-field > .md-icon {
  margin: 16px auto !important;
  position: relative;
  z-index: 3;

  transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.centered-container .md-content .md-button {
  background-color: white !important;
}
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 300px;
  border-radius: 12px;
  height: 44vh !important;
  .md-fab .md-ripple,
  .md-fab:before,
  .md-icon-button .md-ripple,
  .md-icon-button:before {
    background-color: #ffff;
  }
  .login {
    background-color: #1a73e8 !important;
  }

  .link {
    color: #1a73e8;
    font-family: roboto, "Noto Sans Myanmar UI", arial, sans-serif;
  }
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
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
    border-radius: inherit;
  }
  .search {
    background-color: #f5f5f5;
    background-color: #0080fe;
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