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
      toggleDone(i){
        !this.activities[i].done; 
        console.log("Ho cambiato la selezione di " + this.activities[i].activity + "! Ora è " + this.activities[i].done)
      },
      updateActivity(newValue){
        this.insertedActivity = newValue
        console.log("Aggiornamento valore: ", newValue)
      },
      showActivities(){
        console.log(this.activities)
      },
      addActivity(){
        let obj = {
          activity: this.insertedActivity,
          author: this.insertedAuthor,
          done: false
        };

        if(this.isModifying.bool){
          this.activities[this.isModifying.key] = obj;
          this.isModifying.bool=false
        }else{
          this.activities.unshift(obj);
        }

        this.insertedActivity = "";
        this.insertedAuthor = "";
        this.isModifying.bool = false;
        this.isModifying.key = "";
      },
      modifyActivity(obj, i){
        if(obj !== null && i !== ""){
          this.insertedActivity = obj.activity;
          this.insertedAuthor = obj.author;
          this.isModifying.bool = true;
          this.isModifying.key = i;
        }
      }
    },
    mounted(){
      this.showActivities()
    }
  }

</script>