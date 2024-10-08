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
        >
          <v-checkbox
          v-model="item.done"
          :key="i"
          @click="toggleDone(i)"
          ></v-checkbox>
          <v-list-item-content>
            <v-list-item-title
              :class="item.done ? 'linethrough':''"
              v-text="item.activity"
              append-icon="mdi-trash-can"
            ></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon v-text="icons.modify" class="mr-2"></v-icon>
            <v-icon v-text="icons.trash"></v-icon>
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