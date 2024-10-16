<template>
  <v-container>
    <v-card
    elevation="2"
    outlined
    class="rounded-xl"
  >
    <v-container>
      <v-select
      :items="authorsList"
      label="Filter by Author"
      ></v-select>
    </v-container>
    <v-list>
      
      <v-list-item-group v-if="Array.isArray(items) && items.length">
        <!-- slint-disable-next-line -->
        <v-list-item
          v-for="(item, i) in items"
          v-show="item.archived"
          :key="i"
          @mouseenter="hoveredItemIndex = i"
          @mouseleave="hoveredItemIndex = null"
        >
        
          
          <v-list-item-content>
            <div  class="content-wrapper d-flex">
              <v-list-item-title
                class="mr-5"
                v-text="item.activity">
              </v-list-item-title>
              <v-chip
                color="primary"
                pill
                small
              >{{ item.author }}</v-chip>
            </div>
          </v-list-item-content>
          <v-list-item-icon
            v-if="hoveredItemIndex === i"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                v-text="'mdi-folder-upload-outline'"
                class="mr-2" v-bind="attrs"
                v-on="on"
                @click="toggleArchive(i)"
                ></v-icon>
              </template>
              <span>Remove from Archive</span>
            </v-tooltip>

          </v-list-item-icon>
          <v-badge
          v-if="item.author === name"
          color="teal accent-4"
          bottom
          dot
          ></v-badge>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
  </v-container>
</template>

<script>
export default{
  name: "ArchiveActivitiesList",
  data(){
    return{
      selectedAuthor: "",
      authorsList: [],
      filteredItems: [],
      selectedItem: true,
      doneActivities:[],
      icons:{
        archive_in: "mdi-folder-arrow-down-outline",
        archive_out: "mdi-folder-arrow-up-outline"
      },
      hoveredItemIndex: null,
    }
  },
  watch:{
  },
  props:{
    items:{
      type: Array,
      required: true
    },
    name:{
      type: String,
      required: true
    }
  },
  methods:{
    toggleArchive(key){
      this.$emit('archive', key)
    },
    uniqueAuthors(){
      if(this.items){
        const authorsSet = new Set(this.items.map(item=>item.author));
        this.authorsList = Array.from(authorsSet)
        console.log("prova", this.authorsList)
      }
    }
  },
  mounted(){
    this.uniqueAuthors();
  }
}

</script>

<style lang="css">
.linethrough{
  text-decoration: line-through;
}
</style>