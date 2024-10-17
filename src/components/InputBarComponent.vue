<template>
  <v-container>
    <v-form v-if="insertedActivity !==null && insertedAuthor !== null">
    <v-text-field
    label="Activity"
    type="text"
    dark
    v-model="localInsertedActivity"
    :prepend-icon="icons.activity"
    :append-icon="icons.addActivity"
    @click:append="addActivity"
    @keyup.enter="addActivity"
    @input="updateActivity($event)"
    />
  </v-form>
  </v-container>
  
</template>

<script>
export default{
  name: "InputBar",
  data(){
    return{
      // mdi icons ready to use
      icons:{
      activity: "mdi-wrench",
      addActivity: "mdi-pencil-plus"
      },
      localInsertedActivity: "",
    }
  },
  // i import the props
  props:{
    insertedAuthor:{
      type: String,
      required: true
    },
    insertedActivity:{
      type: String,
      required: true
    }
  },
  methods:{
    // i call the function in the parent with $emit method
    updateActivity(value){
      this.$emit('update-activity', value);
    },
    // i call the function in the parent to add a new activity with the $emit method
    addActivity(){
      // i emit to the parent component
      this.$emit('add', this.localInsertedActivity);
      // i reset the value
      this.localInsertedActivity = "";
    }
  },
  created(){
    // i pass the prop to the local value
    this.localInsertedActivity = this.insertedActivity
  }

}
</script>