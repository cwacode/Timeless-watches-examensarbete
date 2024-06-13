<template>
  <v-container fluid>
      <v-col cols="12" class="pa-1">
        <v-card :elevation="isDirectAccess ? 2 : 0">

          <v-card-item v-show="isDirectAccess">
            <v-card-title>
              <span class="text-subtitle-1 font-weight-bold mr-1">My Cart </span>
              <span class="text-subtitle-2">{{ itemCount }} items</span>
            </v-card-title>
            <template v-slot:append>
              <v-btn class="mr-n5 mb-n1" density="compact" variant="text" icon="mdi-close" size="x-large"
                @click="$emit('close-menu')">
              </v-btn>
            </template>
          </v-card-item>

          <v-list class="pa-0">
            <v-list-item class="pa-0" v-for="item in items" :key="item.id">
              <v-divider></v-divider>
              <v-col cols="12" class="d-flex pa-0">
                <v-card-item class="pa-0">
                  <v-img :src="'/images/' + item.image" cover class="ma-2 image" width="100"></v-img>
                </v-card-item class="pa-1">
                <div class="flex-grow-1">
                  <v-card-actions>
                    <p>{{ item.brand }} - {{ item.model }}</p>
                    <v-spacer></v-spacer>
                    <v-btn variant="text" icon="mdi-delete" @click="removeFromCart(item.id, item.quantity)">
                    </v-btn>
                  </v-card-actions>
                  <v-card-actions class="mr-3 ml-n3">
                    <v-btn icon="mdi-minus" @click="subtractFromCart(item.id)">
                    </v-btn>
                    {{ item.quantity }}
                    <v-btn icon="mdi-plus" @click="addToCart(item, 1)">
                    </v-btn>
                    <v-spacer></v-spacer>
                    <p>{{ item.price.toFixed(2) }} €</p>
                  </v-card-actions>
                </div>
              </v-col>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="text-end"><span class="font-weight-bold">Total: </span>{{ total.toFixed(2) }}
              €</v-list-item>
          </v-list>
          <v-col class="text-end" v-show="isDirectAccess">
            <v-spacer></v-spacer>
            <v-btn class="text-overline checkout-button" color="#214761" @click="goToCheckout">Checkout</v-btn>
          </v-col>
        </v-card>
      </v-col>
  </v-container>
</template>

<script>
import { useCartStore } from "@/stores/cartStore";
import { mapState, mapActions } from "pinia";

export default {
  name: "Cart",
  props: {
    isDirectAccess: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState(useCartStore, ["items", "itemCount", "total"]),
  },
  methods: {
    ...mapActions(useCartStore, ["removeFromCart", "addToCart", "subtractFromCart"]),
    goToCheckout() {
      this.$emit('close-menu');
      this.$router.push({ name: "Checkout" });
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 400px) {
  .image {
    max-width: 80px;
  }

  .v-container {
    padding: 2px;
  }
  .v-card-actions {
    padding: 0;
  }
}
</style>