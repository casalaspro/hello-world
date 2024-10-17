<template>
  <v-container>
    <!-- text field for input search -->
    <v-text-field
    dark
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
    <v-container>
      <!-- here there is an icon to reset the selection filter -->
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
      <!-- i load the items if the array is been passed -->
      <v-list-item-group v-if="Array.isArray(items) && items.length">
        <!-- i show the ithem if they are "archived" -->
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
              <!-- in this chip there is the author name -->
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
            <!-- the tooltip gives info on the buttons -->
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
          <!-- the badge tell wich activities are made by the logged user -->
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
          // i load from the prop to local value
          this.filteredItems = this.items
          // i call the methods
          this.uniqueAuthors();
          this.filterItemsBySelect()
        }
      },
      immediate: true, // This ensures the watcher runs immediately upon component creation
      deep: true // Deep watch for nested changes (useful if items are objects that may change internally)
    },
    searchString: {
      handler(newVal){
        // if the value is not void it launches the method or it resets the filters
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
    // it calls the function to cange archive value
    toggleArchive(key){
      this.$emit('archive', key)
    },
    // it resets the filter
    resetFilter(){
      this.selectedAuthor = "";
      this.closeIcon = false;
      this.filteredItems = this.items
    },
    filterItemsBySearch(){
      // i check if something is been wrote
      if(this.searchString !== ""){
        // i filter the items if author or the activity name include the searchString value
        this.filteredItems = this.items.filter((item)=> item.author.includes(this.searchString) || item.activity.includes(this.searchString));
      }
    },
    // this filters the items from the select
    filterItemsBySelect(){
      if(this.selectedAuthor !== ""){
        // i filter all the item if the author in the object is the same in the select
        this.filteredItems = this.items.filter((item)=> item.author === this.selectedAuthor);
        // it shows the close icon in the select to reset the filter
        this.closeIcon = true
      }else{
        // i set the locl value wth the prop
        this.filteredItems = this.items
      }
    },
    // i create a set with unique values for the authors select
    uniqueAuthors(){
      if(this.items){
        const authorsSet = new Set(this.items.map(item=>item.author));
        this.authorsList = Array.from(authorsSet)
      }
    }
  },
  created(){
    // if there is the prop i run the authors select
    if(Array.isArray(this.items)){
      this.uniqueAuthors();
    }
  }
}

</script>

<style lang="css">
.linethrough{
  text-decoration: line-through;
}
</style>