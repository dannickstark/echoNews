<template>
  <div class="home">
    <div class="main-container">
      <!-- NavBar -->
      <div class="navbar">
        <img class="logo" :src="require('@/assets/logo.png')" alt="EchoNews" />
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/search">Search</a></li>
          </ul>
        </nav>
      </div>

      <div class="row">
        <!-- Main -->
        <div class="row col-12 col-md-6">
          <div class="col">
            <h1>News from everyway</h1>
            <p class=" mt-3 mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              vel, nobis necessitatibus similique natus asperiores dolore
              quibusdam ea impedit deleniti doloribus quos maiores commodi vitae
              hic et! Officia, numquam minus.
            </p>
            <v-text-field
              solo
              label="Append"
              append-icon="fa-search"
            ></v-text-field>
          </div>
        </div>

        <!-- Rigth suggestion -->
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
    </div>
  </div>
</template>

<script>
import NewsBox from "../components/NewsBox";

export default {
  name: "Home",
  components: {
    NewsBox
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}

.main-container {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(https://picsum.photos/1000);
  background-position: center;
  background-size: cover;
  padding-left: 8%;
  padding-right: 8%;
  box-sizing: border-box;

  .navbar {
    height: 12%;
    display: flex;
    align-items: center;

    .logo {
      width: 50px;
      cursor: pointer;
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
            font-size: 12px;
          }
        }
      }
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
