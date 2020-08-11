<template>
  <div class="centered-container">
    <!-- <v-flex xs12> -->
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header class="cart-title">
          <p style="font-weight:bold">
            <span style="color: blue;  font-size: 30px">F</span>
            <span style="color: red; font-size: 25px">u</span>
            <span style="color: lime; font-size: 25px">n</span>
            <span style="color: blue; font-size: 25px">d</span>
            <span style="color: green; font-size: 25px">o</span>
            <span style="color: red; font-size: 25px">o</span>
          </p>

          <div class="cart-btn" @click="nevigateToCart()">got to cart</div>
        </md-card-header>
        <div class="md-title" style="font-weight:bold">Create your Fundoo Account</div>
        <md-card-content>
          <div class="md-layout-item md-small-size-100">
            <div class="name" fxLayout.xs="column">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">First Name</label>

                <md-input
                  placeholder="  First Name"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  v-model="form.firstName"
                  :disabled="sending"
                  class="first_name"
                />

                <span class="md-error" v-if="!$v.form.firstName.required">
                  The first name is required
                  <md-icon class="material-icons">error</md-icon>
                </span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">
                  Invalid first name
                  <md-icon class="material-icons">error</md-icon>
                </span>
              </md-field>
              <br>
              <v-spacer></v-spacer>
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Last Name</label>
                <md-input
                  placeholder="  Last Name"
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  v-model="form.lastName"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.lastName.required">
                  The last name is required
                  <md-icon class="material-icons">error</md-icon>
                </span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">
                  Invalid last name
                  <md-icon class="material-icons">error</md-icon>
                </span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <br>
            <md-input
              placeholder="  Email"
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="form.email"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.email.required">
              The email is required
              <md-icon class="material-icons">error</md-icon>
            </span>
            <span class="md-error" v-else-if="!$v.form.email.email">
              <md-icon class="material-icons">error</md-icon>Invalid email
            </span>
          </md-field>
          <div>
            <v-subheader>You can use letter number</v-subheader>
          </div>
          <md-field md-has-password class="pass">
            <input
              v-validate="'required'"
              name="password"
              type="password"
              :class="{'is-danger': errors.has('password')}"
              placeholder="New-Password"
              v-model="form.Password"
              ref="password"
            >
            <v-spacer></v-spacer>
            <span v-show="errors.has('password')" class="help is-danger">
              <v-icon>info</v-icon>
            </span>
            <input
              v-validate="'required|confirmed:password'"
              name="password_confirmation"
              type="password"
              :class="{'is-danger': errors.has('password_confirmation')}"
              placeholder="Password, Again"
              data-vv-as="password"
            >
          </md-field>
          <span v-show="errors.has('password_confirmation')" class="help is-danger">
            {{ errors.first('password_confirmation') }}
            <v-icon>info</v-icon>
          </span>
        </md-card-content>
        <v-subheader color="gray">Use 8 or more characters with a mix of letters,numbers & symbols</v-subheader>
        <!-- <br> -->
        <v-subheader style="text-decoration: underline; color:black">Select Your Service</v-subheader>
        <!-- <div class="d-flex p-2 col-example" padding-left="50px">
          <v-flex xs12 sm6 class="py-2">
            <v-btn-toggle v-model="form.services">
              <v-btn flat value="Advance">Advance</v-btn>
            </v-btn-toggle>
            <v-btn-toggle v-model="form.services">
              <v-btn flat value="basic">Basic</v-btn>
            </v-btn-toggle>
          </v-flex>
        </div>-->
        <div>
          <carts></carts>
        </div>
        <md-card-actions>
          <div
            class="action md-layout md-alignment-center-space-between"
            style="     padding-top: 15px; width: 418px;"
          >
            <tr class="link" v-on:click="nevigateTOLogin()">Sign in Instead</tr>
            <md-button type="submit" id="next" class="md-primary" :disabled="sending">Register</md-button>
          </div>
        </md-card-actions>
      </md-card>
      <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :timeout="timeout">{{ text }}</v-snackbar>
    </form>
    <div class="background"/>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
import router from "../router";
import carts from "./carts";
import { userRegister } from "../services/userService";
import { addToCartService } from "../services/data_service/messageService";

export default {
  name: "FormValidation",
  components: {
    carts
  },
  mixins: [validationMixin],
  data: () => ({
    userService: "",
    snackbar: false,
    y: "top",
    services1: "",
    x: null,
    mode: "",
    timeout: 6000,
    text: "Registration successfuly",
    form: {
      firstName: null,
      lastName: null,
      email: null,
      Password: "",
      password_confirmation: "",
      services: "",
      phoneNumber: "",
      imageUrl: "",
      cartId: ""
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    nevigateTOLogin() {
      router.push({ path: "/login" });
    },
    nevigateToCart() {
      router.push({ path: "/" });
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.email = null;
    },
    saveUser() {
      this.sending = true;
      window.setTimeout(() => {
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.onSubmit();
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    onSubmit() {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.userData();
        }
      });
    },
    userData() {
      let newUser = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        phoneNumber: "",
        imageUrl: "",
        service: this.userService,
        email: this.form.email,
        password: this.form.Password,
        cartId: ""
      };
      userRegister(newUser);
      this.snackbar = true;
    }
  },
  mounted() {
    this.userService = localStorage.getItem("indication");
    // console.log("userService", this.userService);
  }
};
</script>

<style lang="scss" scoped>
form.md-layout {
  width: 592px;
}
.cart-title {
  display: flex;
  padding-bottom: 0px;
  // padding-top: 69px;
  // align-items: flex-end;
  justify-content: space-between;
}
.cart-btn {
  width: 75px;
  cursor: pointer;
  padding: 1%;
  font-size: 13px;
  border: #333232;
  border-radius: 2px;
  float: right;
  color: white;
  height: 27px;
  background-color: #727272 !important;
}
// form.md-layout {
//     width: 319px !important;
// }
// @media (max-width: 400px) {
//   .md-card.md-layout-item.md-size-50.md-small-size-100.md-theme-default {
//     display: flex;
//     flex-direction: column;
//     margin-left: 21% !important;
// }
// }
.centered-container .md-card[data-v-d8f0eb6a] {
  min-width: -webkit-fill-available;
  min-width: 100%;
}

@media (max-width: 600px) {
  form.md-layout[data-v-e0db976e] {
    padding-top: 20%;
    min-width: 100% !important;

    // min-width: -webkit-fill-available;
    /* width: -webkit-fill-available; */
  }
  // .centered-container[data-v-e0db976e] {
  //   // height: 67vh !important;
  //       height: 81vh !important;
  // }
}

@media (max-width: 400px) {
  .cart-title {
    padding-top: 69px;
  }
  .md-card.md-layout-item.md-size-50.md-small-size-100.md-theme-default[data-v-e0db976e] {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
}

.v-subheader {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 28px;
  font-size: 12px;

  font-weight: 500;
  padding: 0 16px;
}
.centered-container .md-error[data-v-e0db976e] {
  color: red;
  height: 48px;
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
  font-size: 15px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  line-height: 1;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  vertical-align: text-bottom;
}
.md-icon {
  width: 20px;
  height: 2px;
  font-size: 15px !important;
  margin: auto;
  display: inline-flex;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
}
.theme--light.v-btn-toggle {
  background: #fff;
  padding-right: 50px;
}
.theme--light.v-subheader[data-v-e0db976e] {
  color: rgb(75, 72, 72);
  padding-left: 33px;
}

.centered-container .link {
  color: #1a73e8;
  padding-left: 14px;
  font-family: roboto, "Noto Sans Myanmar UI", arial, sans-serif;
}
.pass {
  height: 10px !important;
  width: 10px !important;
}

@media (max-width: 600px) {
  form.md-layout {
    width: 319px !important;
    padding-top: 20%;
    display: flex;
    justify-content: center !important;
  }
  .flex.sm6 {
    -ms-flex-preferred-size: 50%;
    flex-basis: 50%;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    display: flex;
    min-width: 120px;
    padding-left: 16px;
  }
  .name {
    display: flex;
    flex-direction: column !important;
    padding-bottom: 4% !important;
  }
  .pass {
    display: flex;
    flex-direction: column !important;
    padding-top: 3% !important;
    padding-bottom: 4% !important;
    justify-content: space-around !important;
    height: 100px !important;
  }
}
input[type="password"] {
  display: flex;
  height: 35px;
  padding-left: 12px;
}

.md-field.md-has-placeholder .md-input:focus,
textarea:focus,
input:focus {
  outline: auto;
  outline-color: #026efc;
}
.v-btn-toggle .v-btn:last-child {
  border-radius: 0 2px 2px 0;
  background-color: white;
}
.md-field label {
  pointer-events: auto;
  top: 10px;
  opacity: 0;
  font-size: 8px;
  color: #026efc;
}
button,
input,
select,
textarea:focus {
  background-color: transparent;
  border-style: none;
  border: 1px solid #ccc;
  color: inherit;
  border-radius: 3px;
}

.md-field.md-has-placeholder .md-input,
.md-field.md-has-placeholder .md-textarea {
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  // height: 52vh !important;
  height: 70vh !important;
  flex-basis: 200px;
  text-align: left;
  border-radius: 30px;
  min-width: 250px;
  .name {
    display: flex;
    flex-direction: row;
  }
  .col-example {
    margin-left: 3%;
  }
  .custom-control-input {
    padding: 10px;
  }

  .v-icon {
    color: red;
  }
  .help is-danger {
    color: red;
  }
  .md-card-header {
    margin-left: 30px;
    font-size: 50px;
  }
  .md-card {
    min-width: -webkit-fill-available;
  }
  .md-title {
    text-align: left;
    margin-left: 30px;
    font-size: 20px;
  }
  .md-error {
    color: red;
  }
  img {
    margin-bottom: 16px;
    max-width: 80px;
  }

  .centered-container[data-v-e0db976e] {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
    height: 45vh !important;
  }
  .md-card {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: relative;
    z-index: 1;
    border-radius: 7px !important;
    border: 1px solid #c0c0c0;
  }

  .md-field {
    width: 100% !important;
    min-height: 70px !important;
    margin: -5px 0 -15px !important;
    /* padding-top: 28px !important; */
    display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
    position: relative;
    font-family: inherit;
    padding-right: 20px !important;
  }
  .md-card-content {
    /* padding: 16px; */
    font-size: 14px;
    padding-left: 30px;
    line-height: 22px;
    padding-right: 30px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .actions {
    .v-btn__content {
      // border-color: white;
      padding-left: 30px;
      padding-right: inherit;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      border-radius: inherit;
      color: inherit;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-flex: 1;
      -ms-flex: 1 0 auto;
      flex: 1 0 auto;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      margin: 0 auto;
      position: relative;
      -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      white-space: nowrap;
      width: inherit;
    }
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
    .next {
      background-color: #1a73e8;
      color: white;
    }
  }
  .md-primary {
    background-color: #1a73e8;
    color: white;
    padding-left: 5px;
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
  .md-card-actions {
    display: flex;
    align-items: center;
    padding-left: 10px !important;
    padding-right: 20px !important;
    padding-bottom: 15px !important;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 200%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>