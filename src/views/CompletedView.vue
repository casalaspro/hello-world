<template>
  <v-container>
    <!-- here there is a welcome message -->
    <h1 class="welcomeText" v-if="userName !== undefined">Welcome {{ userName }}!</h1>

    <ArchiveActivitiesList
    :key="reloadList"
    v-bind:items="activities"
    v-bind:name="userName"
    @archive="toggleArchive"
    />

  </v-container>
</template>

<script>
import ArchiveActivitiesList from '../components/ArchiveActivitiesListComponent.vue';

export default{
  name: "CompletedView",
  data(){
    return{
      activities: [],
      reloadList: 0+100,
      reloadInputBar: 0,
    }
  },
  // i receive a prp from the parent component
  props:['userName'],
  methods:{

    copySavedActivities(){
      // i check if something is saved in the local storage
      if(localStorage.getItem('myActivities') !== null){
        // i take the activities saved
        let lastActivitiesListString = localStorage.getItem('myActivities');
        // i parse the JSON string
        let lastActivitiesListObject = JSON.parse(lastActivitiesListString);
        // i load the objects array in the variable
        this.activities = lastActivitiesListObject;
      }else{
        this.activities = ArchiveActivitiesList
      }
    },
    updateLocalStorageActivities(){
      // i convert JSON in string
      const updatedActivitiesString = JSON.stringify(this.activities);
      // i save the string inside localStorage
      localStorage.setItem('myActivities', updatedActivitiesString);
    },
    toggleArchive(index){
      // i change the value with the opposite
      this.activities[index].archived = !this.activities[index].archived;
      // i save the string inside localStorage
      this.updateLocalStorageActivities()
      // i reload the component
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
