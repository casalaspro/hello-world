<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Vuetify Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in computedLinks"
        :key="`${link.label}-header-link`"
        color="white"
        text
        rounded
        class="my-2"
        :to="link.url">
        {{ link.label }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view :v-bind="userName" @user="setName"></router-view>
    </v-main>

    <v-footer color="primary lighten-1" padless>
      <v-layout justify-center wrap>
        <v-btn
          v-for="link in computedLinks"
          :key="`${link.label}-footer-link`"
          color="white"
          text
          rounded
          class="my-2"
          :to="link.url">
          {{ link.label }}
        </v-btn>
        <v-flex primary lighten-2 py-4 text-center white--text xs12>
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      userName: "", // Valore iniziale vuoto
      links: [
        { label: "Login", url: "/" },
        { label: "Dashboard", url: "/dashboard" }
      ]
    };
  },

  computed: {
    // Proprietà calcolata che aggiorna i link dinamici basati su userName
    computedLinks() {
      return [
        ...this.links,
        {
          label: "TO-DO-LIST",
          url: this.userName !== "" ? `/todolist/${this.userName}` : "/error"
        },
        {
          label: "COMPLETED",
          url: this.userName !== "" ? `/completed/${this.userName}` : "/error"
        }
      ];
    }
  },

  methods: {
    setName(name) {
      // Imposta il nome utente e aggiorna i link dinamicamente
      this.userName = name;
      console.log("Nome utente impostato:", name);
    }
  }
};
</script>
