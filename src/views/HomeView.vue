<template>
  <div>
    <search-bar :load="load" />
    <div class="filter-wrapper">
      <search-filter :items="outlets.length" />
    </div>
    <div class="main-wrap">
      <v-row>
        <v-col cols="12" md="3">
          <left-fliter />
        </v-col>

        <v-col cols="12" md="9">
          <div class="properties">
            <placeholder-loading :loading="loading" />
            <div v-if="outlets !== null && outlets.length >= 1">
              <v-card min-height="230" v-for="item in outlets" :key="item.id">
                <v-row>
                  <v-col cols="12" md="3">
                    <v-img :src="item.property.heroImage.url"></v-img>
                    <div class="d-flex justify-start">
                      <v-img
                        max-width="25%"
                        max-height="25%"
                        v-for="(i, x) in ''"
                        :key="x"
                        :src="i.url"
                      >
                      </v-img>
                    </div>
                  </v-col>
                  <v-col cols="12" md="7">
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
                    <p
                      class="over-view"
                      v-for="(summary, index) in item.property.reviews"
                      :key="index"
                    >
                      {{ summary.text }}
                    </p>
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

                      <v-tooltip bottom color="#333333" max-width="246px">
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
                              <v-icon color="#019501">mdi-check</v-icon
                              >{{ item }}
                            </p>
                          </v-col>
                        </v-row>
                      </v-tooltip>
                    </v-card-text>

                    <p class="statusCode">
                      <v-icon color="#002D63">mdi-shield-cross</v-icon
                      >summary.covidSafety
                    </p>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-img
                      max-width="146"
                      max-height="50.5"
                      src="../assets/images/TY-score-widget-transparent.png"
                      class="rating"
                    ></v-img>
                    <div class="price">
                      <v-btn color="#00A1E5" small>SAVE 16% TODAY! </v-btn>
                      <p class="nightly-avg">Nightly av.</p>
                      <div class="d-flex">
                        <p class="original-price">SGD 120</p>
                        <h2>SGD 100</h2>
                      </div>
                    </div>

                    <v-card-text> </v-card-text>
                  </v-col>
                </v-row>
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
          <v-row
            class="pagination-section"
            v-show="outlets !== null && outlets.length > 0"
          >
            <v-col cols="2">
              <p class="text">Back to top</p>
            </v-col>
            <v-col cols="10">
              <div class="d-flex justify-content-end">
                <p class="text">Showing Results 1 – 20 of 9999</p>

                <div class="text-center">
                  <v-pagination
                    color="#002d63"
                    v-model="page"
                    :length="13"
                    :total-visible="7"
                  ></v-pagination>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import StarRating from "@/components/StarRating.vue";
import LeftFliter from "@/components/LeftFliter.vue";
import SearchFilter from "@/components/SearchFilter.vue";
import SearchBar from "@/components/SearchBar.vue";
import PlaceholderLoading from "@/components/PlaceholderLoading.vue";
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {
    StarRating,
    LeftFliter,
    SearchFilter,
    SearchBar,
    PlaceholderLoading,
  },
  data() {
    return {
      outlets: [],
      gallery: [],
      page: 1,
      loading: false,
      policies: ["Breakfast", "Free cancellation", "Pay later", "Pay at hotel"],
      statusCode: "",
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      this.outlets = [];
      var search =
        this.$store.state.search !== null ? this.$store.state.search : "sgsg";
      console.log(search);
      try {
        let res = await this.$axios.get(
          `http://localhost:8080/job01/search/${search}`
        );
        if (res.status === 200) {
          this.outlets = res.data.outlets.availability.results;
          this.statusCode = res.status;
        }
      } catch (error) {
        console.error(error.response);
        this.statusCode = error.response.status;
      }
      this.loading = false;
      // this.getGallery();
    },
    getGallery() {
      this.outlets.map((item) => {
        item.property.gallery.forEach((img) => {
          // console.log(img);
          if (Object.keys(img).includes("xs")) {
            // console.log(Object.keys(img));
            Object.keys(img).filter(function (key) {
              if (key.includes("xs")) {
                // this.gallery.push(img[key]);
                console.log(key);
              }
            });
          }
          // if (!Object.keys(img).includes("xs")) {
          //   // console.log(Object.keys(img));
          //   Object.keys(img).filter(function (key) {
          //     if (key.includes("s")) {
          //       this.gallery.push(img[key]);
          //     }
          //   });
          // }
          // if (!Object.keys(img).includes("s")) {
          //   // console.log(Object.keys(img));
          //   Object.keys(img).filter(function (key) {
          //     if (key.includes("m")) {
          //       this.gallery.push(img[key]);
          //     }
          //   });
          // }
          // if (!Object.keys(img).includes("m")) {
          //   // console.log(Object.keys(img));
          //   Object.keys(img).filter(function (key) {
          //     if (key.includes("l")) {
          //       this.gallery.push(img[key]);
          //     }
          //   });
          // }
          // if (!Object.keys(img).includes("l")) {
          //   // console.log(Object.keys(img));
          //   Object.keys(img).filter(function (key) {
          //     if (key.includes("xl")) {
          //       this.gallery.push(img[key]);
          //     }
          //   });
          // }
        });
      });
    },
  },
};
</script>
