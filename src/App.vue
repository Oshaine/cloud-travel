<template>
  <v-app>
    <nav-bar />
    <v-main class="grey lighten-3">
      <router-view />
    </v-main>
    <bottom-footer />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import BottomFooter from "./components/BottomFooter.vue";
export default {
  name: "App",
  components: {
    NavBar,
    BottomFooter,
  },
  data() {
    return {
      page: 1,
      links: ["English", "USD", "My Account", "Logout"],
    };
  },
};
</script>
<style>
@import "./assets/css/styles.css";
/* @import "../node_modules/placeholder-loading/src/scss/placeholder-loading.scss"; */
.row .pagination-section {
  margin-top: 20px;
  margin-bottom: 20px;
}
.text {
  font-size: 14px;
  color: var(--primary-color);
  margin-top: 10px;
}
.v-pagination__item {
  height: 24px !important;
  width: 24px !important;
  font-size: 14px !important;
}
.v-pagination__navigation {
  color: var(--primary-color) !important;
  /* display: contents !important; */
}
</style>
