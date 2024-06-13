<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col id="card" cols="12" sm="10" md="9" lg="8">
        <v-card flat class="pa-5 text-center" style="background-color: #FFFBFC;">
          <v-card-title class="text-center text-black text-h4 text-wrap">
            Explore Our Collections
          </v-card-title>
          <v-divider class="mb-4"></v-divider>

          <!-- Search and Filter Inputs -->
          <v-row class="mb-n3" justify="center" id="search-row">
            <v-col cols="9" class="mb-n7">
              <v-text-field v-model="searchQuery" placeholder="Search..." density="compact" variant="solo"
                @input="applyFilters" clearable>
                <v-icon>mdi-magnify</v-icon>
              </v-text-field>
            </v-col>
            <v-col cols="auto" class="ml-n1">
              <v-btn class="mt-1 pa-2" @click="filtersVisible = !filtersVisible" icon="mdi-filter-menu-outline"
                density="comfortable" variant="text" color="black">
              </v-btn>
            </v-col>
          </v-row>

          <v-row v-if="filtersVisible" class="mb-n4 mx-auto">
            <v-col cols="6" lg="3">
              <v-select v-model="filterBrand" :items="brands" label="Brand" multiple
                :clearable="filterMaterial.length > 0" density="compact" variant="solo"
                @change="applyFilters"></v-select>
            </v-col>
            <v-col cols="6" lg="3">
              <v-select v-model="filterMaterial" :items="materials" label="Material" multiple
                :clearable="filterMaterial.length > 0" density="compact" variant="solo"
                @change="applyFilters"></v-select>
            </v-col>
            <v-col cols="6" lg="3">
              <v-select v-model="filterColor" :items="colors" label="Color" multiple
                :clearable="filterMaterial.length > 0" density="compact" variant="solo"
                @change="applyFilters"></v-select>
            </v-col>
            <v-col cols="6" lg="3">
              <v-select v-model="filterSize" :items="sizes" label="Size" multiple :clearable="filterMaterial.length > 0"
                density="compact" variant="solo" @change="applyFilters"></v-select>
            </v-col>
          </v-row>
          <v-row v-if="filtersVisible">
            <v-col cols="6" lg="3" offset-lg="3">
              <v-range-slider v-model="filterPriceRange" :max="10000" :min="0" :step="100" label="Price" thumb-label
                color="#214761" thumb-color="white" @change="applyFilters"></v-range-slider>
            </v-col>
            <v-col cols="6" sm="auto" lg="auto" class="mt-1">
              <v-card-actions class="mt-n5 mb-3">
                <v-btn color="#214761" variant="elevated" rounded="lg" @click="applyFilters">
                  Apply
                </v-btn>
                <v-btn variant="elevated" rounded="lg" @click="clearFilters">
                  Clear
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>

          <!-- Display Watches -->
          <v-row>
            <v-col v-for="watch in paginatedWatches" :key="watch.id" cols="12" sm="6" md="4">
              <router-link :to="`/watch/${watch.id}`" class="router-link-area">
                <v-card elevation="5" class="watch-card">
                  <v-img :src="'/images/' + watch.image_url" alt="Watch image"></v-img>
                  <v-card-title class="mb-n4 text-wrap text-subtitle-1 font-weight-bold">
                    {{ watch.brand_name }}
                  </v-card-title>
                  <v-card-title class="text-subtitle-1">
                    {{ watch.model }}
                  </v-card-title>
                  <v-card-actions class="mb-1 mt-2">
                    <v-btn class="text-overline" color="#214761" variant="elevated" rounded="lg"
                      @click.prevent="addToCart(watch)">
                      {{ watch.price }} € - Add to Cart
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </router-link>
            </v-col>
          </v-row>

          <div v-if="errorMessage" class="mt-6 text-subtitle-1">
            {{ errorMessage }}
          </div>

          <!-- Pagination -->
          <v-col class="mt-5">
            <v-pagination density="compact" v-model="page" :length="totalPages" :total-visible="5"
              @click="scrollToSearchRow"></v-pagination>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "pinia";
import { useCartStore } from "@/stores/cartStore";
import { supabase } from "../lib/supabaseClient";

export default {
  name: "Catalog",

  data() {
    return {
      watches: [],
      filteredWatches: [],
      page: 1,
      perPage: 6,
      searchQuery: "",
      filterBrand: [],
      filterMaterial: [],
      filterColor: [],
      filterSize: [],
      filterPriceRange: [0, 10000],
      brands: [],
      materials: [],
      colors: [],
      sizes: [],
      price: [],
      filtersVisible: false,
      errorMessage: "",
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.filteredWatches.length / this.perPage);
    },
    paginatedWatches() {
      const start = (this.page - 1) * this.perPage;
      return this.filteredWatches.slice(start, start + this.perPage);
    },
  },

  created() {
    if (this.$route.query.brand) {
    this.filterBrand = [this.$route.query.brand];
    this.filtersVisible = true;
    }
    this.searchQuery = this.$route.query.search || "";
    this.applyFilters();
    this.fetchData();
  },

  watch: {
    // React to changes in the search query parameter
    "$route.query.search"(newValue) {
      this.searchQuery = newValue || "";
      this.applyFilters();
    },
    '$route.query.brand'(newBrand) {
      if (newBrand) {
        this.filterBrand = [newBrand]; // Adjust how the filter is applied based on your existing code
        this.applyFilters();
      }
    },
    searchQuery(newVal, oldVal) {
      if (newVal === null || newVal === "") {
        this.applyFilters();  // Make sure to apply filters even if the query is cleared to `null`
      }
    },
  },

  methods: {
    ...mapActions(useCartStore, ["addToCart", "adjustStock"]),
    async fetchData() {
  try {
    const { data, error } = await supabase
      .from("watch_details")
      .select("*");

    if (error) throw error;

    this.watches = data;
    this.applyFilters();

    this.brands = Array.from(new Set(data.map(watch => watch.brand_name)));
    this.materials = Array.from(new Set(data.map(watch => watch.material_type)));
    this.sizes = Array.from(new Set(data.map(watch => watch.size)));
    this.colors = Array.from(new Set(data.map(watch => watch.color)));
    this.price = Array.from(new Set(data.map(watch => watch.price)));
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
},

    applyFilters() {
      const query = this.searchQuery ? this.searchQuery.toLowerCase() : "";
      this.filteredWatches = this.watches.filter((watch) => {
        return (
          (watch.model.toLowerCase().includes(query) ||
            watch.brand_name.toLowerCase().includes(query) ||
            watch.material_type.toLowerCase().includes(query) ||
            watch.description.toLowerCase().includes(query)) &&
          (this.filterBrand.length === 0 ||
            this.filterBrand.includes(watch.brand_name)) &&
          (this.filterMaterial.length === 0 ||
            this.filterMaterial.includes(watch.material_type)) &&
          (this.filterColor.length === 0 ||
            this.filterColor.includes(watch.color)) &&
          (this.filterSize.length === 0 ||
            this.filterSize.includes(watch.size)) &&
          watch.price >= this.filterPriceRange[0] &&
          watch.price <= this.filterPriceRange[1]
        );
      });
      if (this.filteredWatches.length === 0) {
        this.errorMessage = "No watches found matching your criteria.";
      } else {
        this.errorMessage = "";
      }
      this.page = 1;
    },

    scrollToSearchRow() {
      const searchRow = document.getElementById('search-row');
      if (searchRow) {
        window.scrollTo({
          top: searchRow.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    },
    clearFilters() {
      this.searchQuery = "";
      this.filterBrand = [];
      this.filterMaterial = [];
      this.filterColor = [];
      this.filterSize = [];
      this.filterPriceRange = [0, 10000];
      this.applyFilters(); // Reapply filters to show all items again
    },
  },
};
</script>

<style scoped>
#card {
  max-width: 1200px;
}

.watch-card:hover {
  transform: scale(1.02);
}

.v-card-actions {
  justify-content: center;
}

.router-link-area {
  display: block;
  text-decoration: none;
}
</style>
