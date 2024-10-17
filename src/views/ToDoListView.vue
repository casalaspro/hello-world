<template>
  <v-container>
    <h1 class="welcomeText" v-if="userName !== undefined">Welcome {{ userName }}!</h1>
    <router-link v-if="userName == undefined" to="/login" class="text--disabled" >Please, log in before to see the TO-DO-LIST</router-link>
    <!-- <v-divider></v-divider> -->
    <!-- <v-form>
      <v-text-field
      label="Activity"
      type="text"
      v-model="insertedActivity"
      :prepend-icon="icons.activity"
      :append-icon="icons.addActivity"
      @click:append="addActivity"
      @keyup.enter="addActivity"
      />
    </v-form> -->
    <InputBar
    :key="reloadInputBar"
    :insertedAuthor="insertedAuthor"
    :insertedActivity="insertedActivity"
    @update-activity="updateActivity"
    @add="addActivity"
    />

    

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
import activitiesData from "../data/activities.json"
import InputBar from "../components/InputBarComponent.vue";
import ActivitiesList from "../components/ActivitiesListComponent.vue";


  export default {
    name: "ToDoListView",
    // This is the navigation guard
    beforeRouteEnter(to, from, next) {
      // console.log("partito")
    // it checks if there is the parameter in the link that brought you here
    if (to.params.name == "") {
      // if the parameter name isn't here it sends you in an error page
      next({ name: 'errorView' });
    } else {
      // Altrimenti, continua con il rendering del componente
      next();
    }
  },
    data(){
      return{
        // i load the default activities from json file
        activities: activitiesData,
        insertedAuthor: "",
        insertedActivity: "",
        reloadList: 0+100,
        reloadInputBar: 0,
        isModifying:{
          bool: false,
          key: ""
        },
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
    props:['userName'],
    watch:{

    },
    methods:{
      updateLocalStorageActivities(){
        // i convert json in string
        const updatedActivitiesString = JSON.stringify(this.activities);
        // i save the string inside localStorage
        localStorage.setItem('myActivities', updatedActivitiesString);
        // i check
        let lastActivitiesListString = localStorage.getItem('myActivities');
        console.log("Activities Updated: ", lastActivitiesListString)
      },
      copySavedActivities(){
      if(localStorage.getItem('myActivities') !== null){
        let lastActivitiesListString = localStorage.getItem('myActivities');
        let lastActivitiesListObject = JSON.parse(lastActivitiesListString);
        this.activities = lastActivitiesListObject;
        // console.log("TO-DO-LIST starting activities: ", this.activities);
      }else{
        this.updateLocalStorageActivities()
      }
    },
      toggleDone(i){
        !this.activities[i].done; 
        console.log("Ho cambiato la selezione di " + this.activities[i].activity + "! Ora è " + this.activities[i].done);
        this.reloadList = this.reloadInputBar + 100
        this.updateLocalStorageActivities()
        // this.reloadInputBar++;
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