<template>
  <div id="app">
    <div v-if="cart">
      <v-app>
        <v-content>
          <div class="space-between">
            <div class="cart-bg">
              <div class="cart-btn" color="warning">FundooNotes</div>
            </div>
            <div style="width:40%">
                 <img src="../assets/shopping_cart.svg">
              <v-progress-linear
            
                value="progressBarvalue"
                v-model="progressBarvalue"
                color="#673ab7"
                background-color=" blue-grey "
              ></v-progress-linear>

              <div class="progress-bar1">
                
                <div>signin</div>
                <div>Review</div>
                <div>Complete</div>
              </div>
            </div>
          </div>
          <div v-if="!next" class="margin_15">
            <b>Shopping Cart</b>

            <div style="margin: 10px 0px 10px 0px;">
              <v-divider></v-divider>
              <br />
              <div class="cart-content">
                <div class="cart-box">
                  <div class="cart-space">
                    <span>${{ cartDetails.price}} per month</span>
                    <span>{{ cartDetails.name}}</span>
                  </div>
                </div>

                <div class="cart-data">
                  <div style="color: #40a1e2;font-size: 12px;">{{ cartDetails.name}} Pack Details</div>
                  <div style="font-size: medium;">{{ cartDetails.description}}</div>
                </div>

                <div class="price">
                  <div>
                    <b style=" font-size: 14px;">price</b>
                    <br />
                    <span style="color: #40a1e2;font-size: 14px;">${{ cartDetails.price}}</span>
                  </div>&nbsp;
                  <div>
                    <b style=" font-size: 14px;">validity</b>
                    <br />
                    <span style="color: #40a1e2;font-size: 14px;">per month</span>
                  </div>
                </div>&nbsp;
                &nbsp;
                <div class="cart-box1">
                  <div style="    border: 1px solid #a7a7a7;border-radius: 3px; padding: 5px;">
                    <div style="margin-bottom: 5%;"></div>
                    <div class="sub-total">
                      <small>Subtotal(1 item) : ${{ cartDetails.price}}</small>
                      <div class="button4">
                        <button class="button3" @click="proceedToNext()">Proceed to Checkout</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <v-divider></v-divider>
            <div class="margin_1">Subtotal ( 1 item ): ${{ cartDetails.price}}</div>
          </div>

          <!-- on click proceed to next -->
          <div v-if="next">
            <div class="margin_15">
              <b v-if="!show">Review your Order</b>

              <b v-if="show">Order List</b>

              <div style="margin: 10px 0px 10px 0px;">
                <v-divider></v-divider>
                <br />
                <div class="cart-content">
                  <div class="cart-box">
                    <div class="cart-space">
                      <span>${{ cartDetails.price}} per month</span>
                      <span>{{ cartDetails.name}}</span>
                    </div>
                  </div>

                  <div class="cart-data">
                    <div style="color: #40a1e2;font-size: 12px;">{{ cartDetails.name}} Pack Details</div>
                    <div style="font-size: medium;">{{ cartDetails.description}}</div>
                  </div>
                  <div>
                    <span style="color: #40a1e2;font-size: 14px;">${{ cartDetails.price}}</span>
                    <br />
                    <b style=" font-size: 14px;">per month</b>
                  </div>&nbsp;
                  &nbsp;
                  &nbsp;
                  <div v-if="!show" class="cart-box1">
                    <div style="    border: 1px solid #a7a7a7;border-radius: 3px; padding: 5px;">
                      <div style="margin-bottom: 5%;"></div>
                      <div class="sub-total">
                        <div class="button4">
                          <button class="button3" @click="placeYourOrder()">Place your order</button>
                        </div>
                        <small>Subtotal(1 item) : ${{ cartDetails.price}}</small>
                      </div>
                    </div>
                  </div>

                  <!-- after placeYourOrder  -->
                  <div v-if="show">
                    <span style="color: #40a1e2;font-size: 14px;">{{ cart.status}}</span>
                  </div>
                </div>
              </div>
              <v-divider></v-divider>
              <br />
              <div v-if="!show" class="address">
                <v-flex>
                  <v-textarea
                    class="user-address"
                    outline
                    name="input-7-4"
                    label="Enter Address"
                    v-model="value"
                    value=" "
                  ></v-textarea>
                </v-flex>
                <div>
                  <small>payment method</small>
                  <br />
                  <div style="color: #40a1e2;">Cash on Delivery</div>
                </div>
              </div>

              <v-snackbar
                v-model="snackbar"
                :bottom="y === 'bottom'"
                :multi-line="mode === 'multi-line'"
                :timeout="timeout"
                :vertical="mode === 'vertical'"
              >
                {{ text }}
                <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
              </v-snackbar>

              <!-- <div class="margin_1">Subtotal ( 1 item ): ${{ cartDetails.price}}</div> -->
            </div>
          </div>
        </v-content>
      </v-app>
    </div>

    <div v-if="!cart">
      <b
        style="    display: flex;
    justify-content: center;
    font-size: xx-large;
    margin-top: 10%;"
      >Your Cart is empty</b>
    </div>
  </div>
</template>

<script>
import { getMyCartDetail, placeOrder } from "../services/noteService";
export default {
  data() {
    return {
      progressBarvalue: 10,

      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      text: "Hello, I'm a snackbar",

      cart: "",
      carts: "",
      cartDetails: "",
      next: false,
      show: false,
      value: ""
    };
  },
  methods: {
    async getMyCartDetail() {
      let result = await getMyCartDetail();
      console.log("in getMyCartDetail", result.data);
      this.carts = result.data.data;
      this.cart = result.data.data[0];
      if (this.cart) {
        this.cartDetails = result.data.data[0].product;
        console.log("In shopping cart ", this.cartDetails);
      }
    },
    proceedToNext() {
      this.progressBarvalue = 50;
      this.next = true;
    },
    async placeYourOrder() {
      let data = {
        cartId: this.cart.id,
        address: this.value
      };
      var result = await placeOrder(data);
      console.log("place your order", result);

      if (result.status == 200) {
        this.show = true;
        this.progressBarvalue = 100;
        this.text = result.data.data.message;
        this.snackbar = true;
      } else {
        this.text = "failed please enter address";
        this.snackbar = true;
      }
      // console.log("in shopping cart ",result);
    }
  },
  mounted() {
    this.getMyCartDetail();
  }
};
</script>

<style>
.price {
  display: flex;
}
.progress-bar1 {
  place-content: stretch flex-start;
  align-items: stretch;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: space-between !important;
  display: flex;
  flex: 1 1 100%;
  /* max-width: 33%; */
}

@media only screen and (max-width: 599px) {
  .space-between {
    width: 0%;
  }

  .margin_15 {
    /* display: flex; */
    /* justify-content: center; */

    margin: 15px 15px 15px 30px !important;
  }

  .cart-btn {
    width: 100%;
  }
  .cart-content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .cart-data {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .space-between {
    max-width: 43%;
  }
}
/* .shopping-cart1 {
    flex-direction: column;
    box-sizing: border-box;
    display: flex;
    place-content: stretch center;
    align-items: stretch;
    flex: 1 1 100%;
    max-width: 100%;
} */
.address {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.user-address {
  background-color: #fff;
  width: 50%;
  border-radius: 0px;
}
.margin_1 {
  color: #1e8ad1;
}
.button4 {
  place-content: stretch center;
  align-items: stretch;
  flex-direction: column;
  box-sizing: border-box;
  display: flex;
}
.sub-total {
  margin-bottom: 5%;
  place-content: stretch center;
  align-items: stretch;
  flex-direction: column;
  box-sizing: border-box;
  display: flex;
}
.cart-box1 {
  flex-direction: column;
  box-sizing: border-box;
  display: flex;
  place-content: stretch center;
  align-items: stretch;
  max-width: 90%;
  /* flex: 1 1 25%;
  max-width: 20%; */
}
.button3 {
  background-color: #0e89c2;
  color: white;
  border-radius: 3px;

  font-size: small;
  border: none;
  outline: none;
}
.cart-data {
  flex-direction: column;
  box-sizing: border-box;
  display: flex;
  flex: 1 1 50%;
  max-width: 50%;
  /* width: 440px;
  height: 64px; */
  width: 48%;
  margin: 1%;
}
.cart-space {
  font-size: 15px;
  padding: 5px;
  background-color: #797777;
  color: white;
  border-radius: 10px;
  max-width: 100px;
  height: 72px;
  display: flex;
  flex-flow: wrap;
}
.cart-bg {
  place-content: stretch center;
  align-items: stretch;
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
  flex: 1 1 100%;
  max-width: 40%;
}
.cart-content {
  flex-flow: row wrap;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: space-evenly;

  /* width: 880px;
  height: 94px; */
}
.cart-box {
  flex: 0 1 7%;
  box-sizing: border-box;
  /* max-width: 10%; */
  max-width: 100%;
  /* width: 88px;
  height: 64px; */
}
.margin_15 {
  margin: 15px 15px 15px 76px;
  font-size: 20px;
  width: 75%;
  /* width: 850px; */
  /* height: 19px; */
}

.progress-bar {
  flex-direction: column;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  flex: 1 1 100%;
  max-width: 40%;
}
.btn-bg {
  margin-top: 5%;
  margin-bottom: 5%;
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
  flex: 1 1 100%;
  max-height: 100%;
}
.space-between {
  place-content: stretch center;
  align-items: stretch;
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
  flex: 1 1 100%;

  width: 45%;
  max-width: 100%;
}
.cart-btn {
  background-color: #fb0;
  border-radius: 10px;
  padding: 10px;
  color: white;
  width: -webkit-min-content;
  width: -moz-min-content;
      height: 55%;
  /* width: min-content; */
  /* width: 70%; */
}
</style>
