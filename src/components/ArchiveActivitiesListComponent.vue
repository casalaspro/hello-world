<template>
  <v-container>
<h1>{{ searchString }}</h1>
    <v-text-field
    class="mb-5"
      prepend-icon="mdi-magnify"
      label="Search by Activity or Author"
      hide-details="auto"
      v-model="searchString"
      messages="This search bar is case sensitive"
    ></v-text-field>
    
    <v-card
    elevation="2"
    outlined
    class="rounded-xl"
  >
    <!-- <h3>{{ selectedAuthor }}</h3> -->
    <v-container>
      <v-select
      :append-icon="closeIcon ? 'mdi-close' : ''"
      :items="authorsList"
      label="Filter by Author"
      v-model="selectedAuthor"
      @change="filterItemsBySelect"
      @click:append="resetFilter"
      ></v-select>
    </v-container>
    <v-list>
      
      <v-list-item-group v-if="Array.isArray(items) && items.length">
        <!-- slint-disable-next-line -->
        <v-list-item
          v-for="(item, i) in filteredItems"
          v-show="item.archived"
          :key="i"
          v-model="selectedAuthor"
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
      searchString: "",
      closeIcon: false,
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
  watch: {
    // Watch the items prop for changes
    items: {
      handler(newVal){
        // Check if the new value is a valid array
        if (Array.isArray(newVal) && newVal.length > 0) {
          this.filteredItems = this.items
          this.uniqueAuthors();
          this.filterItemsBySelect()
        }
      },
      immediate: true, // This ensures the watcher runs immediately upon component creation
      deep: true // Deep watch for nested changes (useful if items are objects that may change internally)
    },
    searchString: {
      handler(newVal){
        if (newVal !== ""){
          this.filterItemsBySearch();
        }else{
          this.resetFilter();
        }
      }
    }
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
    resetFilter(){
      this.selectedAuthor = "";
      this.closeIcon = false;
      this.filteredItems = this.items
    },
    filterItemsBySearch(){
      if(this.searchString !== ""){
        this.filteredItems = this.items.filter((item)=> item.author.includes(this.searchString) || item.activity.includes(this.searchString));
      }
    },
    filterItemsBySelect(){
      if(this.selectedAuthor !== ""){
        this.filteredItems = this.items.filter((item)=> item.author === this.selectedAuthor);
        this.closeIcon = true
      }else{
        this.filteredItems = this.items
      }
      console.log("Call Function:", this.filteredItems)
    },
    uniqueAuthors(){
      if(this.items){
        const authorsSet = new Set(this.items.map(item=>item.author));
        this.authorsList = Array.from(authorsSet)
        console.log("prova", this.items)
      }
    }
  },
  created(){
    if(Array.isArray(this.items)){
      this.uniqueAuthors();
      // this.filteredItems = this.items
    }
  }
}

</script>

<style lang="css">
.linethrough{
  text-decoration: line-through;
}
</style>