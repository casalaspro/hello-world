<template>
  <v-card
    elevation="2"
    outlined
    class="rounded-xl"
  >
    <v-list>
      <v-list-item-group v-if="Array.isArray(items) && items.length">
        <!-- slint-disable-next-line -->
        <v-list-item
          v-for="(item, i) in items"
          v-show="item.archived === false"
          :key="i"
          @mouseenter="hoveredItemIndex = i"
          @mouseleave="hoveredItemIndex = null"
        >

        
        <!-- inside the v-list item -->
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <span><v-checkbox
                v-model="item.done"
                :key="i"
                @click="toggleDone(i)"
                v-bind="attrs"
                v-on="on"
              ></v-checkbox></span>
            </template>
            <span>Check that you did it!</span>
          </v-tooltip>
          
          <v-list-item-content>
            <div  class="content-wrapper d-flex">
              <v-list-item-title
                class="mr-5"
                :class="item.done ? 'linethrough':''"
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
                v-text="icons.modify"
                class="mr-2" v-bind="attrs"
                v-on="on"
                @click="modifyActivity(item, i)"
                ></v-icon>
              </template>
              <span>Modify</span>
            </v-tooltip>

            <v-tooltip bottom v-if="item.done">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                :key="i"
                v-text="'mdi-folder-download-outline'"
                class="mr-2" v-bind="attrs"
                v-on="on"
                @click="toggleArchive(i)"
                ></v-icon>
              </template>
              <span>Put in Archive</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                v-text="icons.trash"
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="deleteActivity(i)"
                ></v-icon>
              </template>
              <span>Delete</span>
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
</template>

<script>
export default{
  name: "ActivitiesList",
  data(){
    return{
      selectedItem: true,
      doneActivities:[],
      icons:{
        trash: "mdi-trash-can",
        modify: "mdi-lead-pencil",
        archive_in: "mdi-folder-arrow-down-outline",
        archive_out: "mdi-folder-arrow-up-outline"
      },
      hoveredItemIndex: null,
      // activitiesList: activities,
    }
  },
  watch:{
    doneActivities(){
      console.log(this.doneActivities)
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
    toggleDone(key){
      this.$emit('toggle', key)
    },
    toggleArchive(index){
      this.$emit('archive', index)
    },
    checkboxUpdate(value){
      console.log(value)
    },
    showActivities(){
      if(Array.isArray(this.items) && this.items.length){
        console.log(this.items)
      }
    },
    modifyActivity(item, index){
      this.$emit('modify', item, index);
      console.log("I'm modifying from the list")
    },
    deleteActivity(index){
      this.$emit('delete', index);
    }
  },
  created(){
    this.showActivities()
  }
}

</script>

<style lang="css">
.linethrough{
  text-decoration: line-through;
}

.d-flex{
  display: flex !important;
}

v-badge{
  z-index: 1000;
}
</style>