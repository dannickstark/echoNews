<template>
  <div class="container">
    <v-img class="w-100" :src="article.urlToImage"></v-img>
    <div class="col">
      <div class="text-secondary text-h4">{{ article.title }}</div>
      <div class="text-secondary text-h6">
        <b><u>Source:</u></b> {{ article.source.name }}
      </div>
      <div class="text-secondary text-h6">
        <b><u>Author:</u></b> {{ article.author }}
      </div>
    </div>

    <div class="col">
      <v-alert
        border="left"
        colored-border
        color="deep-purple accent-4"
        elevation="2"
        class="p-4"
      >
        {{ article.description }}
      </v-alert>
    </div>

    <div class="col">
      <v-card class="p-4">
        {{ article.content }}
      </v-card>
    </div>

    <div class="col">
      <div class="text-subtitle-1 text-h6">
        <b><u>Published at:</u></b> {{ article.publishedAt }}
      </div>
      <div class="text-subtitle-1 text-h6">
        <b><u>URL:</u></b> <a :href="article.url">{{ article.url }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  components: {},
  data: () => ({
    article: null
  }),

  mounted() {
    this.$nextTick(() => {
      if (this.$store.state.selectedArticle) {
        this.article = this.$store.state.selectedArticle;
      } else {
        this.$router.push("/");
      }
    });
  }
};
</script>
