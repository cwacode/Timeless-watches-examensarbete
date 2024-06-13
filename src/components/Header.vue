<template>
  <v-app-bar class="header" color="black" density="comfortable" :extension-height="isExtended ? 55 : 5" :height="65"
    :extended="isExtended" elevation="1">
    <v-container fluid class="pa-3">
      <v-row justify="center">
        <v-col cols="12" sm="10" md="9" lg="8" class="header-content pt-3">

          <!-- Logo -->
          <div class="d-flex justify-center align-center" style="min-width: 125px;">
            <router-link to="/" class="d-flex align-center">
              <img src="/images/Timeless-title-black.png" alt="logo" height="40px" class="mt-1" />
            </router-link>
          </div>

          <!-- Search bar -->
          <Transition name="slide-fade" mode="out-in">
          <div class="flex-grow-1 d-flex justify-center align-center mx-auto px-6" v-if="searchVisible && windowWidth > 500">
            <v-text-field autofocus rounded variant="solo" density="compact" v-model="searchQuery" @keyup.enter="search" flat
              hide-details placeholder="Search..." clearable key="large-search" style="max-width: 800px;">
              <v-icon :disabled="!searchQuery" @click="search">mdi-magnify</v-icon>
            </v-text-field>
          </div>
        </Transition>

          <!-- Search, Cart, Catalog Buttons -->
          <div class="d-flex justify-end align-center ml-auto">
            <v-btn style="font-size: large;" density="comfortable" icon title="Search" color="white" @click="toggleSearch">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <router-link to="/catalog">
              <v-btn class="pa-1" style="font-size: medium;" icon density="comfortable" title="Browse catalog" color="white">
                <v-icon>mdi-watch</v-icon></v-btn>
            </router-link>
            <v-menu v-model="menuVisible" location="bottom end" :close-on-content-click="false">
             
              <template v-slot:activator="{ props }">
                <v-btn style="font-size: medium;" density="comfortable" icon title="Cart" id="cart-button" v-bind="props">
                  <v-badge v-if="itemCount > 0" color="red" :content="itemCount">
                    <v-icon>mdi-cart-outline</v-icon>
                  </v-badge>
                  <v-icon v-else>mdi-cart-outline</v-icon>
                </v-btn>
              </template>
              <cart @close-menu="menuVisible = false" />
            </v-menu>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Extended Search Field -->

    <template v-slot:extension>
          <transition name="fade-delay" mode="out-in">
      <v-row v-if="isExtended && windowWidth <= 500" justify="center" class="mx-auto">
        <v-col class="mb-2" cols="10" sm="6" md="5" lg="4" style="max-width: 800px;">
            <v-text-field rounded variant="solo" density="compact" v-model="searchQuery" @keyup.enter="search" flat
              hide-details placeholder="Search..." clearable autofocus key="small-search">
              <v-icon :disabled="!searchQuery" @click="search">mdi-magnify</v-icon>
            </v-text-field>
        </v-col>
      </v-row>
    </transition>
    </template>
  </v-app-bar>
</template>

<script>
import Cart from "./Cart.vue";
import { mapState } from "pinia";
import { useCartStore } from "@/stores/cartStore";


export default {
  name: "Header",
  components: {
    Cart,
  },
  data() {
    return {
      searchQuery: "",
      isExtended: false,
      menuVisible: false,
      searchVisible: false,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    ...mapState(useCartStore, ["itemCount"]),
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    toggleSearch() {
        if (this.windowWidth > 500) {
          this.searchVisible = !this.searchVisible;
        } else if (this.windowWidth <= 500) {
          this.isExtended = !this.isExtended;
        }
      },
      search() {
      this.$router.push({
        name: "Catalog",
        query: { search: this.searchQuery },
      });
      this.isExtended = false;
      this.searchVisible = false;
    },
  },
};
</script>

<style scoped>
.header-content {
  display: flex;
  max-width: 1220px;
}

.v-col {
  display: flex;
  align-items: center;
}
.v-btn {
  margin-left: 5px;
}

.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.fade-delay-enter-active {
  animation: fade-in-delay 0.5s ease-in 0s forwards;
}
@keyframes fade-in-delay {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
