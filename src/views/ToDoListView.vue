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
    <v-container>
     
    </v-container>
    <InputBar
    :insertedAuthor="insertedAuthor"
    :insertedActivity="insertedActivity"
    @update-activity="updateActivity"
    @add="addActivity"
    />
    <!-- <v-card
      elevation="2"
      outlined
      class="rounded-xl"
    >
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(activity, i) in activities"
            :key="i"
            @click="modifyActivity(activity, i)"
          >
            <v-list-item-icon>
              <v-icon v-text="icons.modify" class="mr-2"></v-icon>
              <v-icon v-text="icons.trash"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-text="activity.activity"
                append-icon="mdi-trash-can"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card> -->
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
        // icons:{
        //   trash: "mdi-trash-can",
        //   modify: "mdi-lead-pencil",
          // activity: "mdi-wrench",
          // addActivity: "mdi-pencil-plus"
        // },
        insertedAuthor: "",
        insertedActivity: "",
        isModifying:{
          bool: false,
          key: ""
        },
      }
    },
    components:{
      InputBar,
      ActivitiesList,
    },
    watch:{
      // insertedActivity(){
      //   console.log(this.insertedActivity)
      // }
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