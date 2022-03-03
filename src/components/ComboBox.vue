<template>
  <v-combobox
    class="pa-0"
    v-model="select"
    :items="options"
    hide-details="true"
    item-text="label"
    item-value="cityCode"
    :solo="styleType === 'solo' ? true : false"
    :outlined="styleType === 'outlined' ? true : false"
    prepend-inner-icon="mdi-magnify"
    append-icon=""
    @change="change"
  >
    <template slot="item" slot-scope="data">
      <v-icon>mdi-map-marker-outline</v-icon>
      <span>{{ data.item.label }}</span>
    </template>
  </v-combobox>
</template>
<script>
export default {
  name: "ComboBox",
  props: {
    styleType: {
      type: String,
      required: true,
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
  },
  methods: {
    async autoSuggest() {
      let res = await this.$axios.get(
        "http://localhost:8080/job01/autosuggest"
      );
      this.options = res.data;
    },
    change() {
      this.$store.commit("SET_SEARCH", this.select.cityCode);
    },
  },
};
</script>
