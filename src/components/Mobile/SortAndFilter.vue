<template>
  <div class="sort-and-filter">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <div class="sort-and-filter-btn">
          <v-card outlined text v-bind="attrs" v-on="on">
            <div class="d-flex">
              <v-icon> mdi-tune-vertical-variant </v-icon>
              <p>Sort & Filter</p>
            </div>
          </v-card>
        </div>
      </template>
      <v-card>
        <v-toolbar flat outlined>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Sort & Filter</v-toolbar-title>
        </v-toolbar>

        <v-list class="filter-items">
          <v-subheader class="label"><h4>Sort by</h4></v-subheader>
          <v-select :items="list" label="Select One" dense solo flat></v-select>
          <v-subheader class="label"><h4>Filter by</h4></v-subheader>
          <left-fliter :customClass="dialog === true ? 'mobile' : ''" />
        </v-list>

        <v-card-actions>
          <v-btn outlined @click="dialog = false"> Clear </v-btn>
          <v-spacer />
          <v-btn class="filter-btn" @click="dialog = false"> Fliter </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import LeftFliter from "@/components/Shared/LeftFliter.vue";
export default {
  components: { LeftFliter },
  name: "SortAndFilter",
  props: {
    load: {
      type: Function,
    },
  },
  data() {
    return {
      select: "",
      options: [],
      dialog: false,
      list: [
        "Popularity",
        "Price (lowest first)",
        "Price (highest first)",
        "Reviews",
        "Discount",
      ],
      url:
        process.env.NODE_ENV === "production"
          ? process.env.BASE_URL_PROD
          : process.env.BASE_URL_DEV,
    };
  },
  created() {
    this.autoSuggest();
  },
  methods: {
    async autoSuggest() {
      let res = await this.$axios.get(`job01/autosuggest`);
      this.options = res.data;
    },
    // set search code in store to reuse in other components
    change() {
      this.$store.commit("SET_SEARCH", this.select.cityCode);
      console.log(this.$store.state.search);
      this.load();
      this.dialog = false;
    },
  },
};
</script>
<style></style>
