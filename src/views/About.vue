<template>
  <v-container fluid>
    <v-row justify="center" class="text-center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card elevation="2" class="pa-4">
          <v-row>
            <v-col cols="12" id="about-us">
              <h1>About Timeless Watches</h1>
              <p>Welcome to Timeless Watches, where heritage meets modern precision to craft a watch experience that is as enduring as it is exquisite. Established with the vision of bringing high-quality timepieces to aficionados and casual collectors alike, Timeless Watches is more than just a retailer—we are curators of history and style.</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h2>Our Promise</h2>
              <p>Every watch sold at Timeless Watches comes with a guarantee of authenticity and quality. We believe in transparency and trust, ensuring that every customer feels confident and valued.</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h2>Join Our Community</h2>
              <p>Timeless Watches isn’t just about selling watches; it's about building a community of enthusiasts who appreciate the finer details and historical significance of their timepieces. We invite you to explore our collections and learn about the rich histories that tick in each watch.</p>
              <p>Whether you are searching for a statement piece, a gift, or adding to your collection, Timeless Watches offers a personal buying experience informed by our expertise and passion for horology.</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" id="contact-info">
              <h2>Contact Information</h2>
              <div class="text-left">
              <p><strong>Address:</strong> Klockgatan 12, 411 10, Göteborg</p>
              <p><strong>Phone:</strong> 0701234567</p>
              <p><strong>Email:</strong> <a href="mailto:info@watchshop.com">info@watchshop.com</a></p>
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <h2>Visit Us</h2>
              <div style="overflow: hidden; padding: 56.25% 0 0 0; position: relative;">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d2538.5343260067575!2d11.966526637274624!3d57.70687756690175!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ssv!2sse!4v1715270852664!5m2!1ssv!2sse" 
                  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
                  allowfullscreen
                  loading="lazy">
                </iframe>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

h1, h2 {
  margin-bottom: 10px;
}
</style>

<script>
export default {
  name: 'About',
}
</script>
