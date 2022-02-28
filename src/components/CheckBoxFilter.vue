<template>
  <div>
    <v-sheet class="filter-container" rounded="lg" min-height="142px">
      <v-card class="per-night" flat color="transparent">
        <v-subheader>
          <h4>{{ title }}</h4>
        </v-subheader>
        <v-card-text>
          <v-checkbox v-for="item in data.slice(0, limit)" :key="item.id">
            <template v-slot:label>
              <small>{{ item.text }}</small>
              <v-spacer></v-spacer>
              <small>{{ item.number }}</small>
            </template>
          </v-checkbox>
          <v-expansion-panels v-if="limit" accordion flat>
            <v-expansion-panel>
              <v-expansion-panel-header
                disable-icon-rotate
                v-slot="{ open }"
                expand-icon=""
              >
                <v-layout align-center justify-space-between>
                  <span v-if="open" key="0"
                    >Show less <v-icon>mdi-menu-up</v-icon></span
                  >
                  <span v-else key="1"
                    >Show {{ data.length - limit }} more
                    <v-icon>mdi-menu-down</v-icon></span
                  >
                </v-layout>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-checkbox v-for="(item, index) in data" :key="index">
                  <template v-slot:label>
                    <small>{{ item.text }}</small>
                    <v-spacer></v-spacer>
                    <small>{{ item.number }}</small>
                  </template>
                </v-checkbox>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </v-sheet>
  </div>
</template>
<script>
export default {
  name: "CheckBoxFilter",
  props: {
    title: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
