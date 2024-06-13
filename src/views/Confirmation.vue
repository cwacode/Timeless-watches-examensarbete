<template>
  <v-container fluid style="min-height: 80vh;">
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="9" md="9" lg="8" style="max-width: 500px;">
        <v-card elevation="2" class="text-center mt-8">
          <v-card-title id="confirmation-title" class="text-h5 text-md-h4 mt-2 mb-3">Thank you for your order!</v-card-title>
          <v-card-text>
            <p>Your order number is <strong>{{ orderDetails.orderNumber }}</strong>.</p>
            <p>Confirmation email will be sent to <strong>{{ orderDetails.customer.email }}</strong></p>
          </v-card-text>


          <v-card-title class="text-h6 text-md-h5 pb-0 mt-4">Order Summary</v-card-title>
          <v-card-text id="order-list">
            <v-divider></v-divider>
            <v-list density="compact">
              <v-list-item class="pa-0" v-for="item in orderDetails.items" :key="item.id">
                <template v-slot:prepend>
                  <span id="order-quantity" class="mr-3">{{ item.quantity }}x</span>
                  <span>{{ item.brand }} - {{ item.model }}</span>
                </template>

                <template v-slot:append>
                  <span class="text-end">
                    {{ item.price.toFixed(2) }} €
                  </span>
                </template>
              </v-list-item>
              <v-list-item class="text-end pa-0">
                <v-list-item-subtitle>{{ orderDetails.shipping === 'Express' ? 'Shipping: 15 €' : '' }}</v-list-item-subtitle>
                <v-list-item-title><span>Total:</span> <span class="font-weight-bold">{{
              orderDetails.total
            }}€</span></v-list-item-title>
               </v-list-item>
            </v-list>
          </v-card-text>

          <v-card-title class="text-h6 text-md-h5 pb-0">Shipping</v-card-title>
          <v-card-item>
            <v-divider></v-divider>
            <v-row class="text-left">
              <v-col cols="6">
                <v-card-text>
                  <p class="font-weight-bold text mb-1">Delivery address</p>
                  <p>{{ orderDetails.customer.firstName }} {{ orderDetails.customer.lastName }}</p>
                  <p>{{ orderDetails.customer.address }}</p>
                  <p>{{ orderDetails.customer.postalCode }} {{ orderDetails.customer.city }} </p>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-text class="pl-0">
                  <p class="font-weight-bold mb-1">Estimated delivery</p>
                  <p>{{ orderDetails.shipping === 'Express' ? 'Express: 1-2 days' : 'Standard: 3-5 days' }}</p>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card-item>
          <v-col class="text-center mt-6">
            <v-btn class="text-overline" color="#214761" @click="goToHome">Continue Shopping</v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useCartStore } from "@/stores/cartStore";
import { mapState } from "pinia";

export default {
  name: 'Confirmation',
  computed: {
    ...mapState(useCartStore, {
      orderDetails: state => state.orderDetails
    }),
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    },
  }
};
</script>

<style scoped>
@media screen and (max-width: 400px) {
  .v-container {
    padding: 5px;
  }

  span {
    font-size: 12px;

  }

  #order-quantity {
    margin-right: 5px !important;
  }

  #order-list {
    padding: 8px;
  }
  #confirmation-title {
    font-size: 21px !important;
  }
}
</style>