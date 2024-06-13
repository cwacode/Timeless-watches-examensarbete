<template>
  <v-layout full-height full-width style="background-color: #FFFBFC; min-height: 100vh;">
    <Header />
    <v-main>
      <router-view></router-view>
      <Footer />
    </v-main>
  </v-layout>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
}
</script>
