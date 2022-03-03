<template>
  <div class="mobile-search-dialog">
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
            <combo-box styleType="outlined" />
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
            <search-button :search="search" />
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ComboBox from "./ComboBox.vue";
import SearchButton from "./SearchButton.vue";
export default {
  components: { ComboBox, SearchButton },
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

  methods: {
    search() {
      this.load();
      this.dialog = false;
    },
  },
};
</script>
<style></style>
