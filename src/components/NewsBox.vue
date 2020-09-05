<template>
  <v-card class="w-100">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      {{ name }}
    </v-card-title>

    <v-card-subtitle>
      {{ source }}
    </v-card-subtitle>

    <v-card-actions>
      <!-- <v-btn text>Share</v-btn> -->

      <v-btn color="purple" text>
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn v-if="dropable" icon @click="show = !show">
        <v-icon>{{ show ? "fa-chevron-up" : "fa-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    show: false
  }),

  props: {
    dropable: {
      type: Boolean,
      default: true
    },
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
    }
  }
};
</script>
