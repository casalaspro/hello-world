<template>
  <v-container>
    <v-form v-if="insertedActivity !==null && insertedAuthor !== null">
    <v-text-field
    label="Activity"
    type="text"
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
      // mdi icons ready t use
      icons:{
      activity: "mdi-wrench",
      addActivity: "mdi-pencil-plus"
      },
      localInsertedActivity: "",

    }
  },
  watch: {

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
    updateActivity(value){
      this.$emit('update-activity', value);
      // console.log(value)
    },
    // method to add a new activity
    addActivity(){
      // i emit to the parent component
      this.$emit('add');
      this.localInsertedActivity = "";
    }
  },
  created(){
    // i check to have datas from the prop before to copy inside the local variable
    if(this.insertedActivity !== null)
    this.localInsertedActivity = this.insertedActivity
  }

}
</script>