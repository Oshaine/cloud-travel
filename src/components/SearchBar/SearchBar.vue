<template>
  <div @scroll="stickyTop" class="search-bar" ref="searchBar">
    <div class="search-wrapper">
      <div class="d-flex flex-wrap align-items-center justify-content-center">
        <div class="search-box">
          <combo-box styleType="solo" />
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
        <search-button :search="search" />
      </div>
    </div>
  </div>
</template>

<script>
import ComboBox from "@/components/Shared/ComboBox.vue";
import SearchButton from "@/components/Shared/SearchButton.vue";
export default {
  components: { ComboBox, SearchButton },
  name: "SearchBar",
  props: {
    load: {
      type: Function,
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.stickyTop);
    });
  },
  methods: {
    // set search bar sticky
    stickyTop() {
      const searchBar = this.$refs.searchBar;
      const sticky = searchBar.offsetTop;
      window.pageYOffset > sticky
        ? searchBar.classList.add("sticky")
        : searchBar.classList.remove("sticky");
    },
    search() {
      this.load();
    },
  },
};
</script>
