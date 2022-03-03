<template>
  <div>
    <search-bar :load="load" />
    <mobile-search :load="load" />
    <div class="d-flex">
      <sort-and-filter />

      <div class="map-view-btn">
        <v-card outlined text>
          <div class="d-flex">
            <v-icon>mdi-map-marker-outline</v-icon>
            <p>Map View</p>
          </div>
        </v-card>
      </div>
    </div>
    <!-- Search Filter -->
    <div class="filter-wrapper">
      <search-filter :items="outlets.length" :loading="showMap" />
    </div>
    <!-- Search Filter -->
    <div class="main-wrap">
      <v-row>
        <!-- Left Filter -->
        <v-col cols="12" md="3">
          <left-fliter />
        </v-col>
        <!-- Left Filter -->

        <v-col cols="12" md="9">
          <!-- Properties -->
          <property-card
            :outlets="visiblePages"
            :loading="loading"
            :statusCode="statusCode"
            :page="page"
          />
        </v-col>
        <!-- Properties -->
        <v-row
          class="pagination-section"
          v-show="outlets !== null && outlets.length > 0"
        >
          <v-col cols="2">
            <p class="text">Back to top</p>
          </v-col>
          <v-col cols="10">
            <div class="d-flex flex-wrap justify-content-end">
              <p class="text">
                Showing Results {{ page }} – {{ this.perPage * page }} of
                {{ outlets.length }}
              </p>

              <div class="text-center">
                <v-pagination
                  color="#002d63"
                  v-model="page"
                  :length="Math.ceil(outlets.length / this.perPage)"
                ></v-pagination>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-row>
    </div>
  </div>
</template>

<script>
import LeftFliter from "@/components/Shared/LeftFliter.vue";
import SearchFilter from "@/components/SearchFilter.vue";
import SearchBar from "@/components/SearchBar/SearchBar.vue";
import PropertyCard from "@/components/PropertyCard.vue";
import MobileSearch from "@/components/Mobile/MobileSearch.vue";
import SortAndFilter from "@/components/Mobile/SortAndFilter.vue";
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {
    LeftFliter,
    SearchFilter,
    SearchBar,
    PropertyCard,
    MobileSearch,
    SortAndFilter,
  },
  data() {
    return {
      outlets: [],
      page: 1,
      perPage: 10,
      loading: false,
      showMap: false,
      statusCode: 0,
      url:
        process.env.NODE_ENV === "production"
          ? process.env.BASE_URL_PROD
          : process.env.BASE_URL_DEV,
    };
  },
  computed: {
    visiblePages() {
      return this.outlets.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
  },
  mounted() {
    this.load();
    console.log(process.env);
  },
  methods: {
    async load() {
      this.loading = true;
      this.outlets = [];
      // set search value to a defaut value on load
      var search =
        this.$store.state.search !== null ? this.$store.state.search : "sgsg";
      try {
        const res = await this.$axios.get(`${this.url}/job01/search/${search}`);
        if (res.status === 200) {
          this.outlets = res.data.outlets.availability.results;
          // set status code to show appropriate message where needed
          this.statusCode = res.status;
          this.loading = false;
          // hide map image if results is empty
          this.outlets.length > 0
            ? (this.showMap = true)
            : (this.showMap = false);
        }
      } catch (error) {
        console.error(error.response);
        // set status code to show appropriate message where needed
        this.statusCode = error.response.status;
        this.loading = false;
        this.showMap = false;
      }
    },
  },
};
</script>
