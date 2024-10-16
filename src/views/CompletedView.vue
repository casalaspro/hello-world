<template>
  <v-container>
    <h1>Ciao {{ userName }}</h1>
    <ArchiveActivitiesList
    :key="reloadList"
    v-bind:items="activities"
    @archive="toggleArchive"
    v-bind:name="userName"
    />
  </v-container>
</template>

<script>
import ArchiveActivitiesList from '../components/ArchiveActivitiesListComponent.vue';
export default{
  name: "DefaultComponent",
  data(){
    return{
      activities: [],
      reloadList: 0+100,
      reloadInputBar: 0,
    }
  },
  props:['userName'],
  methods:{
    copySavedActivities(){
      if(localStorage.getItem('myActivities') !== null){
        let lastActivitiesListString = localStorage.getItem('myActivities');
        let lastActivitiesListObject = JSON.parse(lastActivitiesListString);
        this.activities = lastActivitiesListObject;
        console.log("TO-DO-LIST starting activities: ", this.activities);
      }else{
        this.updateLocalStorageActivities()
      }
    },
    updateLocalStorageActivities(){
      // i convert json in string
      const updatedActivitiesString = JSON.stringify(this.activities);
      // i save the string inside localStorage
      localStorage.setItem('myActivities', updatedActivitiesString);
      // i check
      let lastActivitiesListString = localStorage.getItem('myActivities');
      console.log("Activities Updated: ", lastActivitiesListString)
    },
    toggleArchive(index){
      this.activities[index].archived = !this.activities[index].archived;
      this.updateLocalStorageActivities()
      console.log("Ho cambiato la selezione di " + this.activities[index].activity + "! Ora è " + this.activities[index].archived);
      this.reloadList = this.reloadInputBar + 100
    }
  },
  components:{
    ArchiveActivitiesList,
  },
  mounted(){
    this.copySavedActivities()
  }
}

</script>

<style lang="css">
.myBtn{
  text-decoration: none;
}
</style>