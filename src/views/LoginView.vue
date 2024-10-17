<template>
  <v-card width="400" class="mx-auto mt-5">

      <v-card-title class="pb-5">
        <h1>Login</h1>
      </v-card-title>

      <v-card-text>
        <v-form class="">
          <v-text-field 
            messages="Enter at least one character"
            :error="errorMessage"
            :error-messages="errorMessage"
            label="Username" 
            prepend-icon="mdi-account-circle"
            v-model="insertedName"
            v-on:keyup.enter="sendNameToApp"
          />
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <div @click="sendNameToApp()">
          <!-- in this router link i pass parameters -->
          <router-link :to="{ name: 'todolist', params: { name: insertedName } }">
            <v-btn class="primary">Go to list</v-btn>
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
        insertedName: "",
        errorMessage: undefined
      }
    },
    methods:{
      // i send the value in the input with the $emit method and i redirect to to-do-list or i send an error
      sendNameToApp(){
        if(this.insertedName !== ""){
          this.$emit('user', this.insertedName)
          this.$router.push({ name: 'todolist', params: { name: this.insertedName } });
        }else{
          // i set the error message
          this.errorMessage = "Username can't be empty"
        }
      },
    },
  }
</script>