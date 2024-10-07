<template>
  <v-container>
    <v-form>
      <v-text-field
      label="Activity"
      type="text"
      prepend-icon="mdi-wrench"
      append-icon="mdi-pencil-plus"
      @click:append="addActivity"
      />
    </v-form>
  </v-container>
</template>

<script>
  export default {
    name: "ToDoListView",
    data(){
      return{
        activities:
        [
          {
            activity: "Buy groceries",
            author: "Alice"
          },
          {
            activity: "Complete Vue.js project",
            author: "Bob"
          },
          {
            activity: "Read a new book",
            author: "Charlie"
          },
          {
            activity: "Walk the dog",
            author: "Diana"
          },
          {
            activity: "Prepare presentation slides",
            author: "Edward" 
          },
          {
            activity: "Plan weekend trip",
            author: "Fiona"
          },
          {
            activity: "Clean the garage",
            author: "George"
          },
          {
            activity: "Write a blog post",
            author: "Hannah"
          },
          {
            activity: "Pay electricity bill",
            author: "Ivan"
          },
          {
            activity: "Organize desk",
            author: "Julia"
          }
        ],
      }
    },
    methods:{
      addActivity(){

      }
    }
  }

</script>