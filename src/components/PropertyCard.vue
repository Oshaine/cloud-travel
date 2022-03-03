<template>
  <div class="properties">
    <placeholder-loading :loading="loading" />
    <div v-if="outlets !== null && outlets.length >= 1">
      <v-card
        :value="page"
        elevation="0"
        min-height="230"
        v-for="item in outlets"
        :key="item.id"
      >
        <!-- <v-hover v-slot="{ hover }"> -->
        <v-row>
          <v-col cols="4" md="4">
            <v-img
              class="hero-image"
              :src="item.property.heroImage.url"
            ></v-img>
            <div class="d-flex flex-wrap justify-start">
              <v-img
                class="thumbnail"
                v-for="(img, ix) in windowWidth < 800
                  ? item.property.gallery.slice(0, 1)
                  : item.property.gallery"
                :key="ix"
                :src="getSize(img).url"
              >
              </v-img>
            </div>
          </v-col>
          <v-col cols="8" md="6">
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
              {{ item.property.location.postalCode }} <span>(view map)</span>
            </p>
            <div
              class="over-view"
              v-for="(summary, index) in item.property.reviews"
              :key="index"
            >
              <p v-show="windowWidth > 800">{{ summary.text }}</p>
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
                v-for="(item, index) in food(item.packages).slice(0, 3)"
                :key="index"
              >
                {{ item }}
              </v-btn>

              <v-tooltip
                bottom
                color="#333333"
                max-width="346px"
                v-if="food(item.packages).length > 3"
              >
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
                    v-for="(item, index) in food(item.packages)"
                    :key="index"
                  >
                    <p><v-icon color="#019501">mdi-check</v-icon>{{ item }}</p>
                  </v-col>
                </v-row>
              </v-tooltip>
            </v-card-text>

            <p class="statusCode">
              <v-icon color="#002D63">mdi-shield-cross</v-icon
              >{{ item.property.covidSafety }}
            </p>
          </v-col>
          <v-col cols="2" md="2">
            <v-img
              v-show="windowWidth > 900"
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
                v-if="
                  price.displayRate.value !== price.adjustedDisplayRate.value
                "
                class="percent transition-fast-in-fast-out"
                small
                >SAVE
                {{
                  discount(
                    price.displayRate.value,
                    price.adjustedDisplayRate.value
                  )
                }}% TODAY!
              </v-btn>
              <p class="nightly-avg">Nightly av.</p>
              <div class="d-flex">
                <p
                  class="original-price"
                  v-if="
                    price.displayRate.value !== price.adjustedDisplayRate.value
                  "
                >
                  {{ price.displayRate.currency }}
                  {{ price.displayRate.value }}
                </p>
                <h2>
                  {{ price.adjustedDisplayRate.currency }}
                  {{ price.adjustedDisplayRate.value }}
                </h2>
              </div>
            </div>
          </v-col>
        </v-row>
        <!-- </v-hover> -->
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
    page: {
      type: Number,
    },
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
      policies: [
        "Room Only",
        "Breakfast",
        "Lunch",
        "Dinner",
        "Half board",
        "Full board",
        "All inclusive",
      ],
      windowWidth: window.innerHeight,
    };
  },
  created() {},
  mounted() {
    // get window size when resized
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
  },
  methods: {
    // Calculate discount percentage
    discount(original_price, discount) {
      return original_price > discount
        ? Math.round(((original_price - discount) / original_price) * 100)
        : null;
    },

    // check for each image size to display
    getSize(obj) {
      if (Object.keys(obj).includes("xs")) return obj.xs;
      else if (Object.keys(obj).includes("s")) return obj.s;
      else if (Object.keys(obj).includes("m")) return obj.m;
      else if (Object.keys(obj).includes("l")) return obj.l;
      else if (Object.keys(obj).includes("xl")) return obj.xl;
    },
    // map food code and policies
    food(item) {
      var obj = {};

      item.map((key) => {
        if (key.foodCode === 1)
          Object.assign(
            obj,
            {
              1: "Room Only",
            },
            key.nonRefundable ? { 2: "Free cancellation" } : null,
            key.payLater ? { 3: "Pay later" } : null,
            key.payAtHotel ? { 4: "Pay at hotel" } : null
          );
        else if (key.foodCode === 2)
          Object.assign(
            obj,
            { 1: "Breakfast" },
            key.nonRefundable ? { 2: "Free cancellation" } : null,
            key.payLater ? { 3: "Pay later" } : null,
            key.payAtHotel ? { 4: "Pay at hotel" } : null
          );
        else if (key.foodCode === 3)
          Object.assign(
            obj,
            { 1: "Lunch" },
            key.nonRefundable ? { 2: "Free cancellation" } : null,
            key.payLater ? { 3: "Pay later" } : null,
            key.payAtHotel ? { 4: "Pay at hotel" } : null
          );
        else if (key.foodCode === 4)
          Object.assign(
            obj,
            { 1: "Dinner" },
            key.nonRefundable ? { 2: "Free cancellation" } : null,
            key.payLater ? { 3: "Pay later" } : null,
            key.payAtHotel ? { 4: "Pay at hotel" } : null
          );
        else if (key.foodCode === 5)
          Object.assign(
            obj,
            { 1: "Half board" },
            key.nonRefundable ? { 2: "Free cancellation" } : null,
            key.payLater ? { 3: "Pay later" } : null,
            key.payAtHotel ? { 4: "Pay at hotel" } : null
          );
        else if (key.foodCode === 6)
          Object.assign(
            obj,
            { 1: "Full board:" },
            key.nonRefundable ? { 2: "Free cancellation" } : null,
            key.payLater ? { 3: "Pay later" } : null,
            key.payAtHotel ? { 4: "Pay at hotel" } : null
          );
        else if (key.foodCode === 7)
          Object.assign(
            obj,
            { 1: "All Inclusive" },
            key.nonRefundable ? { 2: "Free cancellation" } : null,
            key.payLater ? { 3: "Pay later" } : null,
            key.payAtHotel ? { 4: "Pay at hotel" } : null
          );
      });
      return Object.values(obj);
    },
  },
};
</script>
