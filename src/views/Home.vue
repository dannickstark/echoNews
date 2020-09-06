<template>
  <div class="home">
    <div class="main-container">
      <!-- NavBar -->
      <div class="navbar">
        <img class="logo" :src="require('@/assets/logo.png')" alt="EchoNews" />
        <div class="logoName ml-2">EchoNews</div>
        <nav class="pr-5">
          <ul>
            <li><a href="/search">Search</a></li>
          </ul>
        </nav>
      </div>

      <div class="row">
        <!-- Main -->
        <div class="row col-12 col-md-6 pr-5">
          <div class="col">
            <h1>News from everyway</h1>
            <p class=" mt-3 mb-3">
              Get breaking news headlines, and search for articles from news
              sources and blogs all over the web
            </p>
            <div class="mr-5">
              <v-text-field
                v-model="model"
                clearable
                label="Search for a news..."
                prepend-inner-icon="mdi-magnify"
                class="mx-4"
                flat
                hide-details
                solo
                v-on:keyup.enter="onSubmit"
              >
              </v-text-field>
            </div>
          </div>
        </div>

        <!-- Rigth suggestion -->
        <div class="suggestion d-none d-sm-block col-md-6">
          <div v-if="topItems" class="row">
            <div
              v-for="(item, index) in 4"
              :key="'news' + index"
              class="col-md-12 col-lg-6 mb-5"
            >
              <NewsBox
                :dropable="true"
                :name="topItems[index].title"
                :source="topItems[index].source.name"
                :image="topItems[index].urlToImage"
                :description="topItems[index].description"
                :seeArticle="goToArticle"
                :article="topItems[index]"
              ></NewsBox>
            </div>
          </div>
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
  data: () => ({
    isLoading: false,
    items: [],
    topItems: [],
    model: null,
    search: null
  }),

  methods: {
    goToArticle(article) {
      this.$store.commit("setSelectedArticle", article);
      this.$router.push("/article");
    },
    onSubmit() {
      this.$store.commit("setSearchText", this.model);
      this.$router.push("/search");
    }
  },

  mounted() {
    this.$nextTick(() => {
      // Lazily load input items
      let apiURL =
        "https://newsapi.org/v2/top-headlines?" +
        "country=de" +
        "&apiKey=" +
        this.$store.state.apiKey;

      fetch(apiURL)
        .then(res => res.clone().json())
        .then(res => {
          console.log(res);
          this.topItems = res.articles;
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}

.home {
  overflow: hidden;
}

.main-container {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(https://picsum.photos/1000);
  background-position: center;
  background-size: cover;
  padding-left: 8%;
  box-sizing: border-box;

  .navbar {
    height: 12%;
    display: flex;
    align-items: center;

    .logo {
      width: 50px;
      cursor: pointer;
    }

    .logoName {
      color: #fff;
      font-size: 16px;
    }

    nav {
      flex: 1;
      text-align: right;

      ul {
        li {
          list-style: none;
          display: inline-block;
          margin-left: 60px;

          a {
            text-decoration: none;
            color: #ffffff;
            font-size: 16px;
          }
        }
      }
    }
  }

  .suggestion {
    overflow-y: scroll;
    max-height: calc(100vh - 200px);

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
      width: 10px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #000000;
      border: 2px solid #555555;
    }
  }

  .row {
    display: flex;
    height: 88%;
    align-items: center;

    .col {
      flex-basis: 50%;

      h1 {
        color: #fff;
        font-size: 8vh;
      }
      p {
        color: #fff;
        font-size: 11;
        line-height: 15px;
      }
    }
  }
}
</style>
