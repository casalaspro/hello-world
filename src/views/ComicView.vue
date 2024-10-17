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
    
      <v-carousel-item
      v-if="comics"
      >
        <v-sheet
          height="100%"
          width="100%"
          class="d-flex pa-10 flex-column"
          outlined
          tile
        >
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
      const baseURI = 'https://0j2q04041h.execute-api.eu-west-3.amazonaws.com/dev/?page=' + this.numSlide;
      // console.log(baseURI);
  
      axios.get(baseURI)
      .then((result) => {
        this.comics = result.data;
      })
      .catch((error) => {
        console.error('Errore durante il fetch:', error);
      });

      // this.reloadKey++
    },
    nextComic(){
      this.numSlide++;
      this.fetchUsers()
    },
    previousComic(){
      this.numSlide--;
      this.fetchUsers()
    }
  },
  created(){
    this.fetchUsers()
  }
}

</script>

<style lang="css">
  .myImage{
    /* border: 1px solid black; */
  }

  .myContainer{
    /* height: 100%; */
  }

  h4:first-child{
    font-style: oblique;
  }
</style>
