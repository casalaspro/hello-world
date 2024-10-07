<template>
  <v-container>
    <v-form>
      <v-text-field
      label="Activity"
      type="text"
      v-model="insertedActivity"
      :prepend-icon="icons.activity"
      :append-icon="icons.addActivity"
      @click:append="addActivity"
      @keyup.enter="addActivity"
      />
    </v-form>
    <v-card
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
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: "ToDoListView",
    data(){
      return{
        icons:{
          trash: "mdi-trash-can",
          modify: "mdi-lead-pencil",
          activity: "mdi-wrench",
          addActivity: "mdi-pencil-plus"
        },
        insertedAuthor: "",
        insertedActivity: "",
        isModifying:{
          bool: false,
          key: ""
        },
        activities:
        [
          {
            activity: "Buy groceries",
            author: "Alice",
            done: false
          },
          {
            activity: "Complete Vue.js project",
            author: "Bob",
            done: false
          },
          {
            activity: "Read a new book",
            author: "Charlie",
            done: false
          },
          {
            activity: "Walk the dog",
            author: "Diana",
            done: false
          },
          {
            activity: "Prepare presentation slides",
            author: "Edward" ,
            done: false
          },
          {
            activity: "Plan weekend trip",
            author: "Fiona",
            done: false
          },
          {
            activity: "Clean the garage",
            author: "George",
            done: false
          },
          {
            activity: "Write a blog post",
            author: "Hannah",
            done: false
          },
          {
            activity: "Pay electricity bill",
            author: "Ivan",
            done: false
          },
          {
            activity: "Organize desk",
            author: "Julia",
            done: false
          }
        ],
      }
    },
    methods:{
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
    }
  }

</script>