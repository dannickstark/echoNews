<template>
  <div>
    <v-toolbar color="orange accent-1">
      <v-app-bar-nav-icon class="hidden-sm-and-down"></v-app-bar-nav-icon>
      <v-toolbar-title class="title mr-6 hidden-sm-and-down"
        >EchoNewss</v-toolbar-title
      >
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        chips
        clearable
        hide-details
        hide-selected
        item-text="name"
        item-value="symbol"
        label="Search for a coin..."
        solo
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title>
              Search for your favorite
              <strong>Cryptocurrency</strong>
            </v-list-item-title>
          </v-list-item>
        </template>
        <template v-slot:selection="{ attr, on, item, selected }">
          <v-chip
            v-bind="attr"
            :input-value="selected"
            color="blue-grey"
            class="white--text"
            v-on="on"
          >
            <v-icon left>mdi-coin</v-icon>
            <span v-text="item.name"></span>
          </v-chip>
        </template>
        <template v-slot:item="{ item }">
          <v-list-item-avatar
            color="indigo"
            class="headline font-weight-light white--text"
            >{{ item.name.charAt(0) }}</v-list-item-avatar
          >
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-coin</v-icon>
          </v-list-item-action>
        </template>
      </v-autocomplete>
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          :hide-slider="!model"
          color="blue-grey"
          slider-color="blue-grey"
        >
          <v-tab :disabled="!model">News</v-tab>
          <v-tab :disabled="!model">Trading</v-tab>
          <v-tab :disabled="!model">Blog</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <div class="d-none d-md-block col-md-6">
      <div class="row">
        <div
          v-for="(item, index) in 4"
          :key="'news' + index"
          class="col-md-6 mb-5"
        >
          <NewsBox :dropable="false" :name="demo"></NewsBox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewsBox from "../components/NewsBox";

export default {
  name: "Home",
  components: {
    NewsBox
  },
  data: () => {
    return {
      searchText: null
    };
  },

  mounted: () => {
    this.$nextTick(function() {
      if (this.$store.state.searchText !== null) {
        this.searchText = this.$store.state.searchText;
      }
    });
  }
};
</script>

<style lang="scss" scoped></style>
