<template>
  <div>
    <h1>Dashboard</h1>
    <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    @click:row="selectRow"
    class="elevation-1"
    >
    </v-data-table>
    <v-data-table
    :headers="data.headers"
    :items="data.employees"
    :items-per-page="5"
    @click:row="selectRow"
    class="elevation-1"
    >
    </v-data-table>
  <div class="text-center ma-2">
    <!-- <v-btn
      dark
      @click="snackbar = true"
    >
      Open Snackbar
    </v-btn> -->
    <v-snackbar
      v-model="snackbar"
    >
      You selected {{ currentItem }}!

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
  </div>
</template>

<script>
import employeesData from "../data/employees.json"

  export default {
    data () {
      return {
        data: {
          headers:
          [
            {
              text: "#",
              align: "start",
              sortable: true,
              value: "id",
            },
            {
              text: "Employee",
              align: "start",
              sortable: true,
              value: "name",
            },
            {
              text: "Role",
              align: "start",
              sortable: true,
              value: "title"
            },
            {
              text: "Salary",
              align: "start",
              sortable: true,
              value: "salary"
            }
          ],
          employees: employeesData,
        },
        snackbar: false,
        currentItem: "",
        text: "Hi, I'm a snackbar!",
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: 1,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: 1,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: 7,
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: 8,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: 16,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: 0,
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: 2,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: 45,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: 22,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: 6,
          },
        ],
      }
    },
    methods:{
      selectRow(event){
        this.snackbar = true;
        this.currentItem = event.name;
      }
    },
  }
</script>

<style lang="css">

</style>