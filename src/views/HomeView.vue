<template>
  <div>
    <search-bar :load="load" />
    <mobile-search :load="load" />
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
            :outlets="outlets"
            :loading="loading"
            :statusCode="statusCode"
          />
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
import LeftFliter from "@/components/LeftFliter.vue";
import SearchFilter from "@/components/SearchFilter.vue";
import SearchBar from "@/components/SearchBar.vue";
import PropertyCard from "@/components/PropertyCard.vue";
import MobileSearch from "@/components/MobileSearch.vue";
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {
    LeftFliter,
    SearchFilter,
    SearchBar,
    PropertyCard,
    MobileSearch,
  },
  data() {
    return {
      outlets: [],
      page: 1,
      loading: false,
      showMap: false,
      statusCode: 0,
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
      try {
        const res = await this.$axios.get(
          `http://localhost:8080/job01/search/${search}`
        );
        if (res.status === 200) {
          this.outlets = res.data.outlets.availability.results;
          this.statusCode = res.status;
          this.loading = false;
          this.outlets.length > 0
            ? (this.showMap = true)
            : (this.showMap = false);
        }
      } catch (error) {
        console.error(error.response);
        this.statusCode = error.response.status;
        this.loading = false;
        this.showMap = false;
      }

      console.log(this.outlets);
    },

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
