<template>
  <v-container>
    <!-- here there is a simple welcome message -->
    <h1 class="welcomeText" v-if="userName !== undefined">Welcome {{ userName }}!</h1>

    <!-- this link is shown if you not make the login before landing in this view -->
    <router-link v-if="userName == undefined" to="/login" class="text--disabled" >Please, log in before to see the TO-DO-LIST</router-link>

    <!-- here there is the search bar -->
    <InputBar
    :key="reloadInputBar"
    :insertedAuthor="insertedAuthor"
    :insertedActivity="insertedActivity"
    @update-activity="updateActivity"
    @add="addActivity"
    />

    <!-- here there are the alerts: in this case youll see a message if you try to modify an activity -->
    <v-container>
      <v-alert
        v-for="(alert, i) in alerts"
        v-show="isModifying.bool"
        :key="i"
        border="top"
        color="primary lighten-2"
        dark
        :value="alert.isOn"
      >
        {{ alert.message }}
      </v-alert>
    </v-container>

    <!-- here there are the activities -->
    <ActivitiesList
      :key="reloadList"
      v-bind:items="activities"
      v-bind:name="userName"
      @modify="modifyActivity"
      @toggle="toggleDone"
      @delete="deleteActivity"
      @archive="toggleArchive"
    />
  </v-container>
</template>

<script>
// i import the defoult activities data
import activitiesData from "../data/activities.json"
import InputBar from "../components/InputBarComponent.vue";
import ActivitiesList from "../components/ActivitiesListComponent.vue";


  export default {
    name: "ToDoListView",
    // This is the navigation guard
    beforeRouteEnter(to, from, next) {
    // it checks if there is the parameter in the link that brought you here
    if (to.params.name == "") {
      // if the parameter name isn't here it sends you in an error page
      next({ name: 'errorView' });
    } else {
      // else it continues the component rendering
      next();
    }
  },
    data(){
      return{
        // i load the default activities from json file
        activities: activitiesData,
        insertedAuthor: "",
        insertedActivity: "",
        // i use reload numbers inside the component :key value to reload the component
        reloadList: 0+100,
        reloadInputBar: 0,
        // i use this object the check if i'm modifying the activity
        isModifying:{
          bool: false,
          key: ""
        },
        // an array for the alert messages
        alerts:[
          {
            isOn: true,
            message: "You are now modifying the activity."
          }
        ]
      }
    },
    components:{
      InputBar,
      ActivitiesList,
    },
    // i receive the name that is sat in the login
    props:['userName'],
    methods:{
      updateLocalStorageActivities(){
        // i convert json in string
        const updatedActivitiesString = JSON.stringify(this.activities);
        // i save the string inside localStorage
        localStorage.setItem('myActivities', updatedActivitiesString);
      },
      copySavedActivities(){
      // i check if something is saved in the local storage
      if(localStorage.getItem('myActivities') !== null){
        // i take the activities saved
        let lastActivitiesListString = localStorage.getItem('myActivities');
        // i parse the JSON string
        let lastActivitiesListObject = JSON.parse(lastActivitiesListString);
        // i load the objects array in the variable
        this.activities = lastActivitiesListObject;
        // console.log("TO-DO-LIST starting activities: ", this.activities);
      }else{
        // i update the local storage with the new values in this.activities
        this.updateLocalStorageActivities()
      }
    },
      toggleDone(i){
        // i change with the opposite value for done
        !this.activities[i].done;
        // i reload the list changing the key
        this.reloadList = this.reloadInputBar + 100
        // i save the new values in the local storage
        this.updateLocalStorageActivities()
      },
      toggleArchive(index){
      this.activities[index].archived = !this.activities[index].archived;
      this.updateLocalStorageActivities()
      console.log("Ho cambiato la selezione di " + this.activities[index].activity + "! Ora è " + this.activities[index].archived);
      this.reloadList = this.reloadInputBar + 100
    },
      updateActivity(newValue){
        this.insertedActivity = newValue
        this.updateLocalStorageActivities()
        console.log("Aggiornamento valore: ", newValue)
      },
      showActivities(){
        console.log(this.activities)
      },
      addActivity(value){
        if(this.userName !== ""){
          let obj = {
          activity: value,
          author: this.userName,
          done: false,
          archived: false
        };

        if(this.isModifying.bool){
          this.activities[this.isModifying.key] = obj;
          this.isModifying.bool=false
          this.isModifying.key = "";
        }else{
          this.activities.unshift(obj);
        }

        this.updateLocalStorageActivities()

        this.insertedActivity = "";
        // this.insertedAuthor = "";
        // this.isModifying.bool = false;
        this.reloadList = this.reloadInputBar + 100
        this.reloadInputBar++;
        }
        
      },
      modifyActivity(obj, i){
        // if the objects passed from the emit are not void
        if(obj !== null && i !== ""){
          console.log("I'm modifying from the to-do-app")
          this.insertedActivity = obj.activity;
          this.insertedAuthor = obj.author;
          this.isModifying.bool = true;
          this.isModifying.key = i;
        }

        this.reloadInputBar++;
      },
      deleteActivity(index){
        if(index !== ""){
          this.activities.splice(index, 1);
          this.updateLocalStorageActivities()
        }
      }
    },
    mounted(){
      this.copySavedActivities()
      // this.showActivities()
      // console.log(userName)
    }
  }

</script>

<style lang="css">
.welcomeText{
  color: white;
}
</style>