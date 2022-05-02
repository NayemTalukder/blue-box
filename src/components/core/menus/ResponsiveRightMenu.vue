<template>
  <ul class="navbar-nav ml-auto navbar-list">
    <!-- Sign Up -->
    <li v-if="!this.auth" class="sign-in line-height my-auto mr-3 ml-2">
        <router-link to="/sign-up" class="search-toggle iq-waves-effect d-flex align-items-center mt-1 btn btn-outline-success px-2">Register</router-link>
    </li>
    <!-- Sign In -->
    <li v-if="!this.auth" class="sign-in line-height my-auto mr-2 mr-lg-0">
        <router-link to="/sign-in" class="search-toggle iq-waves-effect d-flex align-items-center mt-1 btn btn-success px-2 text-dark custom-hover">Sign In</router-link>
    </li>
    <!-- Log Out -->
    <li v-if="this.auth" class="sign-in line-height my-auto mr-2 mr-lg-0">
        <a @click="logOut()" class="search-toggle iq-waves-effect d-flex align-items-center mt-1 btn btn-success px-2 text-dark custom-hover">Log Out</a>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'VerticleLayout',
  computed: {
    ...mapGetters({
      auth: 'Main/auth'
    })
  },
  methods: {
    ...mapActions({
      setModalStateAction: 'Main/setModalStateAction'
    }),
    logOut () {
      this.setModalStateAction([true, 'Log Out !', null, 'Log Out', false])
    }
  }
}
</script>
