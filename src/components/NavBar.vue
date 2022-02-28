<template>
  <div>
    <v-app-bar color="#fff">
      <v-toolbar-title>
        <a href="/">
          <img
            class="ml-5"
            src="../assets/images/cloudtravel-logo.jpg"
            alt="Logo"
            width="170"
          />
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down navBar">
        <v-btn text> English <v-icon>mdi-menu-down</v-icon> </v-btn>

        <v-btn text> USD<v-icon>mdi-menu-down</v-icon></v-btn>

        <v-btn text> My Account</v-btn>
        <v-btn text> Log out </v-btn>
      </v-toolbar-items>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-spacer></v-spacer>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item-group v-model="group">
          <v-list-item>
            <img
              class="mt-2"
              src="../assets/images/cloudtravel-logo.jpg"
              alt="Logo"
              width="150"
            />
          </v-list-item>
          <v-list-item>
            <v-list-item-title
              >English <v-icon>mdi-menu-down</v-icon></v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-title
              >USD <v-icon>mdi-menu-down</v-icon></v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title>My Account</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
