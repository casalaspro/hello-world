<template>
  <v-container>
    
    <!-- here there is a button to redirect the user on the login view -->
    <router-link class="myBtn d-flex justify-center mt-5" to="/">
      <v-btn color="white">Please, go to Login before to see the to-do-list. <span style='font-size:50px;'>&#129430;</span></v-btn>
    </router-link>

  </v-container>
</template>

<script>
  export default{
    name: "ErrorView"
  }
</script>

<style lang="css">
.myBtn{
  text-decoration: none;
}
</style>