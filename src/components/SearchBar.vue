<template>
  <div class="search-bar">
    <div class="search-wrapper">
      <div class="d-flex flex-wrap align-items-center justify-content-center">
        <div class="search-box">
          <v-combobox
            class="pa-0"
            v-model="select"
            :items="options"
            item-text="label"
            item-value="cityCode"
            solo
            prepend-inner-icon="mdi-magnify"
            append-icon=""
          >
            <template slot="item" slot-scope="data">
              <v-icon>mdi-map-marker-outline</v-icon>
              <span>{{ data.item.label }}</span>
            </template>
          </v-combobox>
        </div>
        <div class="date-picker">
          <div class="d-flex">
            <p><v-icon>mdi-calendar</v-icon> Jul 19 - Jul 20</p>
            <p class="night">1 Night</p>
          </div>
        </div>

        <div class="date-picker">
          <p>2 adults, 0 children, 1 room</p>
        </div>
        <v-btn @click="change" class="search-btn">Search</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    load: {
      type: Function,
    },
  },
  data() {
    return {
      select: "",
      options: [],
    };
  },
  created() {
    this.autoSuggest();
    console.log(this.select.label);
  },
  methods: {
    async autoSuggest() {
      let res = await this.$axios.get(
        "http://localhost:8080/job01/autosuggest"
      );
      this.options = res.data;
      console.log(this.options);
      this.getGallery();
    },
    change() {
      this.$store.commit("SET_SEARCH", this.select.cityCode);
      console.log(this.$store.state.search);
      this.load();
    },
  },
};
</script>
