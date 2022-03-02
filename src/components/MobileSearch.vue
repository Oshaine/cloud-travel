<template>
  <div>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <div class="mobile-search">
          <v-card outlined text v-bind="attrs" v-on="on">
            <div class="d-flex">
              <v-icon> mdi-magnify </v-icon>
              <p class="location">{{ select.label }}</p>
            </div>

            <div class="d-flex">
              <p class="date">Aug 18 - Aug 19</p>
              <p class="persons">2 adults, 1 room, 0 children</p>
            </div>
          </v-card>
        </div>
      </template>
      <v-card>
        <v-toolbar flat outlined>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Where ?</v-toolbar-title>
        </v-toolbar>

        <v-list class="filter-items">
          <v-list-item>
            <v-combobox
              class="pa-0"
              v-model="select"
              :items="options"
              item-text="label"
              item-value="cityCode"
              outlined
              dense
              prepend-inner-icon="mdi-magnify"
              append-icon=""
            >
              <template slot="item" slot-scope="data">
                <v-icon>mdi-map-marker-outline</v-icon>
                <span>{{ data.item.label }}</span>
              </template>
            </v-combobox>
          </v-list-item>
          <v-list-item>
            <div class="date-picker">
              <div class="d-flex">
                <p><v-icon>mdi-calendar</v-icon> Jul 19 - Jul 20</p>
                <p class="night">1 Night</p>
              </div>
            </div>
          </v-list-item>
          <v-list-item>
            <div class="date-picker">
              <p>2 adults, 0 children, 1 room</p>
            </div>
          </v-list-item>
          <v-list-item>
            <v-btn @click="change" class="search-btn">Search</v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "MobileSearch",
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
    };
  },
  created() {
    this.autoSuggest();
  },
  methods: {
    async autoSuggest() {
      let res = await this.$axios.get(
        "http://localhost:8080/job01/autosuggest"
      );
      this.options = res.data;
      console.log(this.options);
    },
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
