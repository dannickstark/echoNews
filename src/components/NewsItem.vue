<template>
  <v-card class="w-100 row" elevation="0">
    <v-img class="col-12 col-sm-4" :src="image" height="100%"></v-img>

    <div class="col-12 col-sm-8">
      <v-card-title @click="seeArticle(article)">
        <a>
          {{ name }}
        </a>
      </v-card-title>

      <v-card-subtitle>
        {{ source }}
      </v-card-subtitle>

      <v-card-text>
        {{ description }}
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    show: false
  }),

  props: {
    image: {
      type: String,
      default: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
    },
    name: {
      type: String,
      default: "EchoNews"
    },
    source: {
      type: String,
      default: "BBC"
    },
    description: {
      type: String,
      default:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum"
    },
    seeArticle: {
      type: Function,
      default: () => {}
    },
    article: {}
  }
};
</script>
