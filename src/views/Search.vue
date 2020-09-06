<template>
  <div>
    <!-- Tool Bar + filter -->
    <v-toolbar
      class="fixed-top"
      color="orange accent-1"
      src="https://picsum.photos/1920/1080?random"
    >
      <v-toolbar-title class="title mr-6 hidden-sm-and-down"
        >EchoNewss</v-toolbar-title
      >
      <v-text-field
        v-model="model"
        clearable
        label="Search for a news..."
        prepend-inner-icon="mdi-magnify"
        class="mx-4"
        flat
        hide-details
        solo
      >
      </v-text-field>

      <template v-slot:extension>
        <div class="w-100 mt-5 row">
          <div class="col-6 col-sm-3 col-md-2">
            <v-select
              v-model="pageSize"
              :items="pageSizes"
              label="Page size"
              solo
              dense
              rounded
              clearable
            ></v-select>
          </div>
          <div class="d-none d-sm-block col-6 col-sm-3 col-md-2">
            <v-select
              v-model="language"
              :items="languages"
              label="Languages"
              solo
              dense
              clearable
            ></v-select>
          </div>
          <div class="d-none d-sm-block col-6 col-sm-3 col-md-2">
            <v-select
              v-model="source"
              :items="sources"
              label="Sources"
              solo
              dense
              clearable
            ></v-select>
          </div>
          <div class="col-6 col-sm-3 col-md-2">
            <v-select
              v-model="sortBy"
              :items="sortFilter"
              label="Sort"
              solo
              dense
              clearable
            ></v-select>
          </div>
        </div>
      </template>
    </v-toolbar>

    <!-- Main document -->
    <v-container class="pt-5">
      <br /><br /><br />
      <div class="row pt-5">
        <div
          v-for="(item, index) in items"
          :key="'news' + index"
          class="col-12"
        >
          <NewsItem
            :name="item.title"
            :source="item.source.name"
            :image="item.urlToImage"
            :description="item.description"
            :seeArticle="goToArticle"
            :article="item"
          ></NewsItem>
        </div>
      </div>

      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="numberPage"
          :total-visible="7"
          v-if="model"
        ></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
import NewsItem from "../components/NewsItem";

export default {
  name: "Home",
  components: {
    NewsItem
  },
  data: () => {
    return {
      isLoading: false,
      items: [],
      search: null,
      model: null,
      source: null,
      sources: [],
      pageSizes: [5, 10, 20],
      pageSize: 20,
      page: 1,
      numberPage: 1,
      languages: [
        "ar",
        "de",
        "en",
        "es",
        "fr",
        "he",
        "it",
        "nl",
        "no",
        "pt",
        "ru",
        "se",
        "ud",
        "zh"
      ],
      language: null,
      sortFilter: ["relevancy", "popularity", "publishedAt"],
      sortBy: null
    };
  },

  methods: {
    goToArticle(article) {
      this.$store.commit("setSelectedArticle", article);
      this.$router.push("/article");
    },
    getArticle() {
      // Lazily load input items
      let apiURL =
        "https://newsapi.org/v2/" +
        (this.model
          ? "everything/?q=" +
            this.model +
            (this.pageSize ? "&pageSize=" + this.pageSize : "") +
            (this.page ? "&page=" + this.page : "") +
            (this.language ? "&language=" + this.language : "") +
            (this.source ? "&sources=" + this.source : "") +
            (this.sortBy ? "&sortBy=" + this.sortBy : "") +
            "&apiKey=" +
            this.$store.state.apiKey
          : "top-headlines/apiKey=" + this.$store.state.apiKey);

      console.log("???", apiURL);

      fetch(apiURL)
        .then(res => res.clone().json())
        .then(res => {
          console.log(res);
          this.numberPage = parseInt(res.totalResults / this.pageSize);
          this.items = res.articles;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  watch: {
    model() {
      this.getArticle();
    },
    page() {
      this.getArticle();
    },
    pageSize() {
      this.getArticle();
    },
    source() {
      this.getArticle();
    },
    language() {
      this.getArticle();
    },
    sortBy() {
      this.getArticle();
    }
  },

  mounted() {
    this.$nextTick(function() {
      if (this.$store.state.searchText !== null) {
        this.model = this.$store.state.searchText;

        this.getArticle();

        // Loading Source
        let apiURL =
          "https://newsapi.org/v2/sources?" +
          "&apiKey=" +
          this.$store.state.apiKey;

        fetch(apiURL)
          .then(res => res.clone().json())
          .then(res => {
            this.sources = res.sources.map(e => e.id);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
};
</script>

<style lang="scss" scoped>
header {
  &.fixed-top {
    position: fixed;
  }
}
</style>
