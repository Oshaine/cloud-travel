<template>
  <v-row>
    <v-col cols="12" md="3">
      <div class="map">
        <img src="../assets/images/map-bg.jpeg" alt="map" v-if="loading" />
        <div class="btn-wrapper">
          <v-btn>Show on map</v-btn>
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="9">
      <div class="filters">
        <h3>Singapore: {{ items }} properties found</h3>
        <div class="d-flex flex-wrap">
          <v-btn link to="/" class="filter-btns" elevation="0">
            Popularity
          </v-btn>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                link
                to=""
                class="filter-btns"
                elevation="0"
                defualt
                v-bind="attrs"
                v-on="on"
              >
                Price (lowest first)
              </v-btn>
            </template>
            <v-btn class="filter-btns" elevation="0">
              Price (highest first)</v-btn
            >
          </v-menu>
          <v-btn class="filter-btns" elevation="0"> Reviews </v-btn>
          <v-btn class="filter-btns" elevation="0"> Discount </v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "SearchFilter",
  props: {
    items: {
      type: Number,
      default: 0,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      priceFilter: ["lowest first", "highest first"],
    };
  },
};
</script>
