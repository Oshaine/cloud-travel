<template>
  <div class="properties">
    <placeholder-loading :loading="loading" />
    <div v-if="outlets !== null && outlets.length >= 1">
      <v-card
        elevation="0"
        min-height="230"
        v-for="item in outlets"
        :key="item.id"
      >
        <v-hover v-slot="{ hover }">
          <v-row>
            <v-col cols="4" md="4">
              <v-img
                class="hero-image"
                :src="item.property.heroImage.url"
              ></v-img>
              <div class="d-flex flex-wrap justify-start">
                <v-img
                  class="thumbnail"
                  v-for="(img, ix) in item.property.gallery"
                  :key="ix"
                  :src="getSize(img).url"
                >
                </v-img>
              </div>
            </v-col>
            <v-col cols="8" md="8">
              <v-card-title
                ><h3>{{ item.property.name }}</h3>

                <star-rating
                  :rating="item.property.starRating"
                  :length="item.property.starRating"
                />
              </v-card-title>
              <p class="address">
                {{ item.property.location.address }},
                {{ item.property.location.city }},
                {{ item.property.location.country }},
                {{ item.property.location.postalCode }} (view map)
              </p>
              <div
                class="over-view"
                v-for="(summary, index) in item.property.reviews"
                :key="index"
              >
                <p>{{ summary.text }}</p>
                <p class="review-rating">
                  {{ item.property.starRating }}
                  {{ summary.scoreDescription }} ({{
                    item.property.trustYou.reviewsCount
                  }}
                  reviews)
                </p>
              </div>
              <v-card-text>
                <v-btn
                  class="menu-btn"
                  outlined
                  color="#00A1E5"
                  small
                  v-for="(item, index) in policies.slice(0, 3)"
                  :key="index"
                >
                  {{ item }}
                </v-btn>

                <v-tooltip bottom color="#333333" max-width="346px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="menu-btn"
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      color="#00A1E5"
                      small
                    >
                      +1
                    </v-btn>
                  </template>
                  <v-row>
                    <v-col
                      cols="6"
                      v-for="(item, index) in policies"
                      :key="index"
                    >
                      <p>
                        <v-icon color="#019501">mdi-check</v-icon>{{ item }}
                      </p>
                    </v-col>
                  </v-row>
                </v-tooltip>
              </v-card-text>

              <p class="statusCode">
                <v-icon color="#002D63">mdi-shield-cross</v-icon
                >{{ item.property.covidSafety }}
              </p>
            </v-col>
            <v-col cols="12" md="2">
              <v-img
                max-width="146"
                max-height="50.5"
                src="../assets/images/TY-score-widget-transparent.png"
                class="rating"
              ></v-img>
              <div
                class="price"
                v-for="(price, index) in item.packages"
                :key="index"
              >
                <v-btn
                  v-if="hover"
                  class="transition-fast-in-fast-out"
                  color="#00A1E5"
                  small
                  >SAVE 16% TODAY!
                </v-btn>
                <p class="nightly-avg">Nightly av.</p>
                <div class="d-flex">
                  <p class="original-price" v-if="hover">
                    {{ price.displayRate.currency }}
                    {{ price.displayRate.value }}
                  </p>
                  <h2>
                    {{ price.adjustedDisplayRate.currency }}
                    {{ price.adjustedDisplayRate.value }}
                  </h2>
                </div>
              </div>

              <v-card-text> </v-card-text>
            </v-col> </v-row
        ></v-hover>
      </v-card>
    </div>
    <div class="no-results" v-else v-show="!loading">
      <div v-if="statusCode === 200">
        <div class="icon">
          <v-icon color="#757575">mdi-magnify</v-icon>
        </div>
        <h3>Sorry! We couldn't find any properties for your search.</h3>
      </div>
      <div v-else-if="statusCode === 400">
        <div class="icon">
          <v-icon color="#757575">mdi-alert-circle-outline</v-icon>
        </div>
        <h3>Opps, something went wrong.</h3>
        <p>error message here</p>
      </div>
    </div>
  </div>
</template>
<script>
import StarRating from "@/components/StarRating.vue";
import PlaceholderLoading from "@/components/PlaceholderLoading.vue";

export default {
  name: "ProperyCard",
  components: {
    StarRating,
    PlaceholderLoading,
  },
  props: {
    outlets: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    statusCode: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      policies: ["Breakfast", "Free cancellation", "Pay later", "Pay at hotel"],
    };
  },
  methods: {
    getSize(obj) {
      if (Object.keys(obj).includes("xs")) return obj.xs;
      else if (Object.keys(obj).includes("s")) return obj.s;
      else if (Object.keys(obj).includes("m")) return obj.m;
      else if (Object.keys(obj).includes("l")) return obj.l;
      else if (Object.keys(obj).includes("xl")) return obj.xl;
    },
  },
};
</script>
