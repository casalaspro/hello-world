<template>
  
  <v-container class="myContainer d-flex mt-16" height="100%">

    <v-card
    elevation="24"
    class="mx-auto flex-grow-1"
    >
      <v-carousel
      show-arrows-on-hover
      hide-delimiters
      >

        <!-- this is an arrow -->
        <template v-slot:prev="{ on, attrs }">
          <v-btn
          v-bind="attrs"
          v-on="on"
          class="ma-2"
          icon
          color="white"
          @click="previousComic"
          >
            <v-icon x-large>mdi-arrow-left-bold-circle-outline</v-icon>
          </v-btn>
        </template>

        <!-- this is an arrow -->
        <template v-slot:next="{ on, attrs }">
          <v-btn
          v-bind="attrs"
          v-on="on"
          class="ma-2"
          icon
          color="white"
          @click="nextComic"
          >
            <v-icon x-large>mdi-arrow-right-bold-circle-outline</v-icon>
          </v-btn>
        </template>
        
        <!-- here i load the comic -->
        <v-carousel-item v-if="comics">
          <v-sheet
          height="100%"
          width="100%"
          class="d-flex pa-10 flex-column"
          outlined
          tile
          >
            <!-- here there are all the info from the API call -->
            <h2 class="text-center mb-2">{{ comics.safe_title }}</h2>
            <v-divider class="mb-3"></v-divider>
            <v-img class="myImage my-3" aspect-ratio="3.5" contain :src="comics.img"></v-img>
            <div class="info-wrap d-flex justify-space-between mb-5">
              <h4>{{comics.day}}/{{ comics.month }}/{{ comics.year }}</h4>
              <h4>#{{ comics.num }}</h4>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </v-container>

</template>

<script>
// i import axios
import axios from 'axios';

export default{
  name: "ComicView",
  numSlide: 614,
  data(){
    return{
      comics: [],
      numSlide: 100,
      reloadKey: 1
    }
  },
  methods:{
    fetchUsers() {
      // i build the URI adding the comic page value
      const baseURI = 'https://0j2q04041h.execute-api.eu-west-3.amazonaws.com/dev/?page=' + this.numSlide;
      // i make the axios call
      axios.get(baseURI)
      // then i load the data in the value comic
      .then((result) => {
        this.comics = result.data;
      })
      // or i take the errors
      .catch((error) => {
        console.error('Errore durante il fetch:', error);
      });
    },
    // i increase the number for the URI and i make another call
    nextComic(){
      this.numSlide++;
      this.fetchUsers()
    },
    // i decrease the number for the URI and i make another call
    previousComic(){
      this.numSlide--;
      this.fetchUsers()
    }
  },
  created(){
    // i make the call at the beginning
    this.fetchUsers()
  }
}
</script>

<style lang="css">
  h4:first-child{
    font-style: oblique;
  }
</style>
