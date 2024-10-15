<template>
  <v-container>
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
          v-show="item.archived"
          :key="i"
          @mouseenter="hoveredItemIndex = i"
          @mouseleave="hoveredItemIndex = null"
        >
        
          
          <v-list-item-content>
            <v-list-item-title
              v-text="item.activity"
            ></v-list-item-title>
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
    }
  },
  methods:{
    toggleArchive(key){
      this.$emit('archive', key)
    },
  },
  created(){
    // this.showActivities()
  }
}

</script>

<style lang="css">
.linethrough{
  text-decoration: line-through;
}
</style>