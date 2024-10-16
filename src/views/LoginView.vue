<template>
  <v-card width="400" class="mx-auto mt-5">
      <v-card-title class="pb-5">
        <h1>Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form class="">
          <v-text-field 
            label="Username" 
            prepend-icon="mdi-account-circle"
            v-model="insertedName"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div @click="sendNameToApp()">
          <router-link :to="{ name: 'todolist', params: { name: insertedName } }">
            <v-btn color="info">Go to list</v-btn>
          </router-link>
        </div>
      </v-card-actions>
    </v-card>
</template>

<script>


  export default {
    name: 'LoginView',
    data(){
      return{
        insertedName: ""
      }
    },
    methods:{
      sendNameToApp(){
        console.log('cliccato')
        this.$emit('user', this.insertedName)
      }
    },
    components: {
      
    },
  }
</script>