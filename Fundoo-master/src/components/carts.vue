<template>
  <div class="reg-cart">
    <!-- <div class="reg-cards"> -->
    <div class="reg-card-layout" style="margin-right: 10%;">
      <md-card class="reg-card">
        <div class="reg-space">
          <div class="reg-sub-title">Price: $99 Per Month</div>
          <div style="color:#0606f8">Advance</div>
          <span class="reg-sub-header">
            <ul>
              <li>$99/month</li>
            </ul>
          </span>
          <span class="reg-sub-dec">
            <ul>
              <li>Ability to add title, description, images, labels, checklist and colors</li>
            </ul>
          </span>
        </div>
      </md-card>
      <md-card class="reg-sub-card" v-bind:style="{ 'background-color': getColorCode('advance')}">
        <div class="reg-card-btn">{{ name }}</div>
      </md-card>
    </div>

    <div class="reg-card-layout">
      <md-card class="reg-card">
        <div class="reg-space">
          <div class="reg-sub-title">Price: $49 Per Month</div>
          <div style="color:#0606f8">Basic</div>
          <span class="reg-sub-header">
            <ul>
              <li>$49/month</li>
            </ul>
          </span>
          <span class="reg-sub-dec">
            <ul>
              <li>Ability to add title and description only</li>
            </ul>
          </span>
        </div>
      </md-card>
      <md-card class="reg-sub-card" v-bind:style="{ 'background-color': getColorCode('basic')}">
        <div class="reg-card-btn">{{ name }}</div>
      </md-card>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { getCartDetail } from "../services/noteService";

export default {
  data() {
    return {
      cartDetails: "",
      name: ""
    };
  },
  methods: {
    async getCartdetails() {
      let result = await getCartDetail(localStorage.getItem("productId"));
      console.log("getCartDetails", result.data.data);
      this.cartDetails = result.data.data.product;
    },
    getColorCode(indication) {
      if (
        (this.cartDetails.id == localStorage.getItem("advanceUser") &&
          indication == "advance") ||
        (this.cartDetails.id == localStorage.getItem("basicUser") &&
          indication == "basic")
      ) {
        // this.name = "selected";
        return "#fb0";
      } else {
        // this.name = "ADD TO CARD";
        return "#acacac";
      }
    }
  },
  mounted() {
    this.getCartdetails();
  }
};
</script>

<style>
.reg-sub-title {
  font-size: medium;
}
.reg-cart {
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
  max-height: 100%;
  place-content: stretch center;
  align-items: stretch;
}
.reg-card-layout {
  display: flex;
  width: 223px;
  height: 191px;
}
.reg-sub-card {
  width: 222px;
  margin-top: 13%;
  padding: 66% 1% 12% 11%;
  margin-left: -75%;
  background-color: #ccc;
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
  z-index: -1 !important;
}
.reg-card {
  height: 172px !important;
  width: 240px;
  background-color: #fff;
}
.reg-space {
  padding: 15px;
  background-color: #fff;
}

@media only screen and (max-width: 599px) {
  .reg-sub-card {
    width: 222px;
    margin-top: 16%;
    padding: 63% 0% 12% 11%;
    margin-left: -76%;
  }
  .reg-card-btn {
    margin-top: 84%;
    /* margin-top: 113%; */
    font-size: smaller;
  }
  .reg-card-layout {
    width: 140px;
    /* width: 120px; */
    z-index: 10;
    height: 220px;
  }
  .reg-space {
    padding: 0px !important;
  }
  .reg-sub-dec {
    font-size: 12px;
  }
  .reg-card {
    height: 195px !important;
  }
  /* .reg-sub-card {
    width: 187px !important;
    margin-top: 25%;
    padding: 125% 0% 14% 9%;
    margin-left: -101%;
  } */
}
</style>
