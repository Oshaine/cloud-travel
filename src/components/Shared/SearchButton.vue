<template>
  <v-btn @click="search" class="search-btn">Search</v-btn>
</template>
<script>
export default {
  name: "SearchButton",
  props: {
    search: {
      type: Function,
      required: true,
    },
  },
};
</script>
