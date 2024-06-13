<template>
  <v-container fluid>
    <v-row v-if="watch" align="center" justify="center">
      <v-col cols="11" sm="6" md="5" lg="3">
        <v-card id="card" elevation="10">
          <v-img
            id="image"
            :src="'/images/' + watch.image_url"
            alt="Watch image"
          ></v-img>
          <v-col class="text-center">
            <v-card-title class="mb-n4 text-wrap text-h5 font-weight-bold">
              {{ watch.brand_name }}
            </v-card-title>
            <v-card-title class="text-h5">
              {{ watch.model }}
            </v-card-title>
          </v-col>
          <v-col class="text-center mt-n1">
            <v-btn
              color="#214761"
              variant="elevated"
              rounded="lg"
              @click="addToCart(watch)"
            >
              {{ watch.price }} € - Add to cart
            </v-btn>
          </v-col>
          <v-card-text cols="12" sm="2" class="text-center">{{
            watch.description
          }}</v-card-text>
          <v-divider></v-divider>

          <!-- Horizontal Row for Watch Details -->
          <v-row class="pa-4">
            <v-col cols="12" sm="4" class="text-center">
              <v-icon left>mdi-ruler</v-icon> Size: {{ watch.size }}
            </v-col>
            <v-col cols="12" sm="4" class="text-center">
              <v-icon left>mdi-palette</v-icon> Color: {{ watch.color }}
            </v-col>
            <v-col cols="12" sm="4" class="text-center">
              <v-icon left>mdi-watch</v-icon> Material:
              {{ watch.material_type }}
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else align="center" justify="center">
      <v-col>
        <p>Loading watch details or no watch found...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "pinia";
import { supabase } from "../lib/supabaseClient";
import { useCartStore } from "@/stores/cartStore";

export default {
  name: "WatchDetails",
  props: {
    id: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      watch: null,
    };
  },
  mounted() {
    this.getWatch();
  },
  watch: {
    // Watcher to detect changes in 'id' prop and re-fetch data
    id(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getWatch();
      }
    },
  },

  methods: {
    ...mapActions(useCartStore, ["addToCart"]),
    async getWatch() {
      try {
        const { data, error } = await supabase
          .from("watch_details")
          .select("*")
          .eq("id", this.id)
          .single();
        if (error) {
          throw error;
        }
        if (!data) {
          console.error("No watch found with id:", this.id);
          this.watch = null;
          return;
        }
        this.watch = data; // Data already includes brand and material in the format needed
      } catch (error) {
        console.error("Error fetching watch details:", error.message);
        this.watch = null;
      }
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 24px;
}
#brand {
  font-weight: 500;
}
</style>
