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
          :key="i"
          @click="modifyActivity(item, i)"
          @mouseenter="hoveredItemIndex = i"
          @mouseleave="hoveredItemIndex = null"
        >
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
            <v-list-item-title
              :class="item.done ? 'linethrough':''"
              v-text="item.activity"
              append-icon="mdi-trash-can"
            ></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon
            v-if="hoveredItemIndex === i"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-text="icons.modify" class="mr-2" v-bind="attrs" v-on="on"></v-icon>
              </template>
              <span>Modify</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-text="icons.trash" class="mr-2" v-bind="attrs" v-on="on"></v-icon>
              </template>
              <span>Delete</span>
            </v-tooltip>
            
          </v-list-item-icon>
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
    }
  },
  methods:{
    toggleDone(key){
      this.$emit('toggle', key)
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
</style>