<template>
  <v-container>
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
      @modify="modifyActivity"
      @toggle="toggleDone"
    />
  </v-container>
</template>

<script>
import activitiesData from "../data/activities.json"
import InputBar from "../components/InputBarComponent.vue";
import ActivitiesList from "../components/ActivitiesListComponent.vue";


  export default {
    name: "ToDoListView",
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
        console.log("TO-DO-LIST starting activities: ", this.activities);
      }else{
        // // i convert json in string
        // const defaultActivitiesString = JSON.stringify(this.activities);
        // // i save the string inside localStorage
        // localStorage.setItem('myActivities', defaultActivitiesString);
        // console.log('La stringa salavata: ', localStorage.getItem('myActivities'));
        // // console.log('No activities starting.')
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
      updateActivity(newValue){
        this.insertedActivity = newValue
        this.updateLocalStorageActivities()
        console.log("Aggiornamento valore: ", newValue)
      },
      showActivities(){
        console.log(this.activities)
      },
      addActivity(value){
        let obj = {
          activity: value,
          author: this.insertedAuthor,
          done: false
        };

        if(this.isModifying.bool){
          this.activities[this.isModifying.key] = obj;
          this.isModifying.bool=false
          this.isModifying.key = "";
        }else{
          this.activities.unshift(obj);
        }

        this.insertedActivity = "";
        // this.insertedAuthor = "";
        // this.isModifying.bool = false;
        this.reloadList = this.reloadInputBar + 100
        this.reloadInputBar++;
      },
      modifyActivity(obj, i){
        if(obj !== null && i !== ""){
          this.insertedActivity = obj.activity;
          this.insertedAuthor = obj.author;
          this.isModifying.bool = true;
          this.isModifying.key = i;
        }

        this.reloadInputBar++;
      }
    },
    mounted(){
      this.copySavedActivities()
      this.showActivities()
    }
  }

</script>