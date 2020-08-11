<template>
  <div id="app">
    <v-app id="app">
      <v-card color="grey lighten-4" flat height="80px">
        <v-toolbar color="amber darken-1" dark>
          <p style="font-family: none;  text-shadow: 1px 1px  7px  #FF0000;">
            <span style="color: black; font-size: 35px">F</span>
            <span style="color: red; font-size: 30px">u</span>
            <span style="color: lime; font-size: 30px">n</span>
            <span style="color: blue; font-size: 30px">d</span>
            <span style="color: green; font-size: 30px">o</span>
            <span style="color: red; font-size: 30px">o</span>
            <span style="color: blue; font-size: 30px">N</span>
            <span style="color: red; font-size: 30px">o</span>
            <span style="color: lime; font-size: 30px">t</span>
            <span style="color: blue; font-size: 30px">e</span>
            <span style="color: green; font-size: 30px">s</span>
          </p>
        </v-toolbar>
      </v-card>
      <br />
      <div class="sub-title">FundooNotes Offered Choose Below Service To Register.</div>
      <br />

      <div class="cards" @click.stop="dialog3 = true">
        <div class="card-layout" @click="userDetails(advance)">
          <md-card md-with-hover class="card-size">
            <div class="space">
              <div class="sub-title">Price: $99 Per Month</div>
              <div style="color:#0606f8">Advance</div>
              <span class="sub-header">
                <ul>
                  <li>$99/month</li>
                </ul>
              </span>
              <span class="sub-dec">
                <ul>
                  <li>Ability to add title, description, images, labels, checklist and colors</li>
                </ul>
              </span>
            </div>
          </md-card>
          <md-card class="sub-card">
            <div class="card-btn">ADD TO CARD</div>
          </md-card>
        </div>

        <div class="card-layout" @click="userDetails(basic)">
          <md-card md-with-hover>
            <div class="space">
              <div class="sub-title">Price: $49 Per Month</div>
              <div style="color:#0606f8">Basic</div>
              <span class="sub-header">
                <ul>
                  <li>$49/month</li>
                </ul>
              </span>
              <span class="sub-dec">
                <ul>
                  <li>Ability to add only title and description</li>
                </ul>
              </span>
            </div>
          </md-card>
          <md-card class="sub-card">
            <div class="card-btn">ADD TO CARD</div>
          </md-card>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />

      <!-- sign in  -->
      <div class="sign-in" @click="nevigateToLogin()">Sign in instead</div>

      <!-- dailog3 box -->
      <v-dialog v-model="dialog3" max-width="500px">
        <v-card>
          <v-card-title class="packDetails">
            <div>Advance Pack Details</div>
            <v-spacer></v-spacer>
            <!-- <span>$99/month</span> -->
            <span>${{ advanceService.price}}/month</span>
          </v-card-title>

          <v-tabs v-model="active" color="#fff" dark slider-color="yellow">
            <v-tab v-for="n in 3" :key="n" ripple class="content">Feature {{ n }}</v-tab>
            <v-tab-item v-for="n in 3" :key="n">
              <v-divider></v-divider>
              <v-card-text>{{ advanceService.description }}</v-card-text>
            </v-tab-item>
          </v-tabs>

          <v-card-actions>
            <v-btn color="primary" flat @click.stop="dialog3=false">Remove</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="addToCart(advanceService.id)"
              @click.stop="dialog3=false"
            >Proced to checkout</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
import { getService, addToCart } from "../services/noteService";
import { addToCartService } from "../services/data_service/messageService";
export default {
  data() {
    return {
      advance: "advance",
      basic: "basic",
      userType: "",
      dialog3: false,
      advanceService: "",
      basicService: "",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te",
      active: null
    };
  },
  methods: {
    nevigateToLogin() {
      localStorage.removeItem("loginServiceID");
      this.$router.push({ path: "/login" });
    },
    nevigateToRegitration() {
      this.$router.push({ path: "/registration" });
    },

    async addToCart(id) {
      let data = {
        productId: id
      };
      var res = await addToCart(data);
      console.log("cart details", res.data.data.details);

      localStorage.setItem("productId", res.data.data.details.id);
      localStorage.setItem("indication", res.data.data.details.product.name);
      localStorage.setItem("loginServiceID", res.data.data.details.id);
      // addToCartService.sendCartService(res.data.data.details.product.name);
      this.nevigateToRegitration();
    },

    async userDetails(type) {
      let res = await getService();
      console.log("response", res.data.data);
      if (type == "advance") {
        this.advanceService = res.data.data.data[0];
        localStorage.setItem("advanceUser", this.advanceService.id);
      } else {
        if (type == "basic") this.advanceService = res.data.data.data[1];
        localStorage.setItem("basicUser", res.data.data.data[1].id);
      }
    }
  },
  mounted() {
    this.userDetails();
  }
};
</script>

<style>
@import "../styles/addToCard.css";
</style>
