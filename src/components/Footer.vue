<template>
  <v-footer color="black" class="white--text footer text-center">
    <v-container fluid style="max-width: 1200px;">
      <v-row justify="center">
        <v-col cols="auto" sm="4">
          <router-link :to="{ name:'Home' }" style="text-decoration: none">
          <h2 class="mb-3 link">TIMELESS WATCHES</h2>
          </router-link>
          <router-link to="/orders" class="white--text">Orders</router-link>
        </v-col>

        <v-col cols="auto" sm="4">
          <h2>Quick Links</h2>
          <v-list class="mt-n2" dense>
            <v-list-item class="mt-n1" link>
                  <router-link to="/about#about-us" class="white--text">About Us</router-link>
            </v-list-item>
            <v-list-item class="mt-n2" link>
                  <router-link to="/about#contact-info" class="white--text">Contact</router-link>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="auto" sm="4">
          <h2 class="mb-2">Follow Us</h2>
          <v-btn icon :href="'https://www.facebook.com'" target="_blank">
            <v-icon color="white">mdi-facebook</v-icon>
          </v-btn>
          <v-btn icon :href="'https://twitter.com'" target="_blank">
            <v-icon color="white">mdi-twitter</v-icon>
          </v-btn>
          <v-btn icon :href="'https://instagram.com'" target="_blank">
            <v-icon color="white">mdi-instagram</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>



<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
.white--text a {
  color: white;
}
.v-btn, .v-list {
  background-color: black;
}

</style>


