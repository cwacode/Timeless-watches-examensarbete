<template>
  <v-container class="pa-0" fluid>
    <v-row no-gutters justify="center">
      <v-col style="max-height: 80vh;">
        <v-img :src="'/images/background-homapage.webp'" cover min-height="350px">
          <v-col>
            <v-spacer></v-spacer>
            <v-card-title class="text-center text-h4 text-md-h3 text-lg-h2 mt-6">TIMELESS</v-card-title>
            <v-card-subtitle class="text-center text-h6 text-md-h5 text-lg-h4">WATCHES</v-card-subtitle>
          </v-col>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid>

    <!-- Brands Slide Group Section -->
    <v-divider color="#214761" thickness="3px" class="mt-8"></v-divider>
    <v-row justify="center">
      <v-col class="pa-1" cols="11">
        <v-card-title class="text-center text-h4 mt-12">Featured Brands</v-card-title>
        <v-slide-group :show-arrows="largeScreen">
          <v-slide-group-item v-for="(watchModels, brand) in groupedWatches" :key="brand"
            v-slot:default="{ active, toggle }">
            <v-col id="slider-card" class="px-1" cols="2" md="3">
              <router-link :to="{ name: 'Catalog', query: { brand: brand } }" style="text-decoration: none;">
                <v-card :elevation="active ? 12 : 2" @click.stop="toggle" class="ma-4"
                  :class="{ 'elevation-12': active }">
                  <v-img :src="'/images/' + watchModels[0].image_url" cover></v-img>
                  <v-card-title id="brand-title" class="text-center py-1 text-wrap" style="min-height: 72px;">{{ brand
                    }}</v-card-title>
                </v-card>
              </router-link>
            </v-col>
          </v-slide-group-item>
        </v-slide-group>
      </v-col>
    </v-row>


    <!-- Articles Section -->
    <v-divider color="#214761" thickness="3px" class="mt-12"></v-divider>
    <v-row justify="center" class="mt-16">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="6">
            <v-row justify="center">
              <v-col cols="12" sm="6">
                <v-img :src="('/images/article-1.png')" cover height="100%" max-height="400px"></v-img>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-title class="text-wrap text-h5"> The perfect timepiece for every occasion </v-card-title>
                <v-card-text class="text-wrap">Are you looking for a watch that can keep up with your active lifestyle?
                  Or perhaps one that
                  makes a stylish statement at your next formal event? Whatever we have the perfect timepiece for you.
                  Browse our collection of high-quality watches and discover the perfect way to mark the
                  moment.</v-card-text>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12" sm="6">
                <v-img :src="('/images/article-2.png')" cover height="100%" max-height="400px"></v-img>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-title class="text-wrap text-h5"> Timeless Style, Delivered Right to Your Door </v-card-title>
                <v-card-text class="text-wrap"> At Timeless Watches, we believe that a great watch is more than just a
                  functional accessory
                  - it's a statement piece that reflects your personal style. That's
                  why we're dedicated to curating the finest selection of timepieces from around the world and bringing
                  them right to your doorstep. </v-card-text>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider color="#214761" thickness="3px" class="my-12"></v-divider>

    <!-- About Timeless Watches Section -->
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" class=" mb-6 text-center">
        <h2 class="mb-1">About Timeless Watches</h2>
        <p>Explore luxury timepieces where elegance meets precision. Experience timeless quality with every watch.</p>
        <router-link to="/about" class="white--text">
          <v-btn class="mt-2" color="#214761">Learn More</v-btn>
        </router-link>
      </v-col>
    </v-row>

    <!-- Newsletter Subscription Section -->
    <v-row justify="center" style="background: #214761; color: white; max-width: 100vw;">
      <v-col cols="10" sm="8" md="6" class="text-center">
        <v-col class="pt-0">
          <h2 class="my-4">Join the Timeless Family!</h2>
          <p>Sign up to our newsletter and get 5% off your next purchase</p>
        </v-col>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="7" class="pa-2">
            <v-text-field hide-details variant="solo" density="comfortable" placeholder="Email:" class="mt-3 mb-2" />
          </v-col>
          <v-col cols="12" sm="auto" class="text-center">
            <v-btn color="white" dark>Subscribe</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>



  </v-container>
</template>


<script>
import { supabase } from '../lib/supabaseClient'

export default {
  name: 'Home',
  data() {
    return {
      watches: [],
      groupedWatches: {},
      largeScreen: false,
      windowWidth: window.innerWidth,
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    windowWidth(newValue) {
      this.largeScreen = newValue > 600;
    }
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    groupWatchesByBrand() {
      const grouped = {};
      this.watches.forEach(watch => {
        const brand = watch.brand_name;
        if (!grouped[brand]) {
          grouped[brand] = [];
        }
        grouped[brand].push(watch);
      });
      this.groupedWatches = grouped;
    },
    async fetchWatches() {
      try {
        const { data, error } = await supabase
          .from('watch_details')
          .select('*');
        if (error) {
          throw error;
        }
        if (!data || data.length === 0) {
          console.error('No watches found');
          this.watches = [];
          return;
        }
        this.watches = data;
        this.groupWatchesByBrand();
      } catch (error) {
        console.error('Error fetching watch details:', error.message);
        this.watches = [];
      }
    }

  },
  mounted() {
    this.fetchWatches();
  },

}
</script>

<style scoped>
@media screen and (max-width: 400px) {

  #brand-title {
    font-size: 12px !important;
  }
}
</style>