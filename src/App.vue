<template>
  <router-view/>
</template>
<script>
/* eslint-disable no-undef */
import Cookies from 'js-cookie'
import { auth, core } from './config'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      auth: 'Main/auth'
    })
  },
  methods: {
    ...mapActions({
      resetStateAction: 'Main/resetStateAction',
      setAuthAction: 'Main/setAuthAction',
      setFavouriteListAction: 'Main/setFavouriteListAction'
    })
  },
  mounted () {
    core.mainIndex() // call mainIndex
    this.setAuthAction(false) // reset authentication state
    // Start Session
    if (!Cookies.get('isSessionStart')) {
      this.resetStateAction()
      Cookies.set('isSessionStart', 'start')
    }
    core.fetchInitialData()
    auth.onAuthStateChanged(user => {
      if (user) {
        // Check Sign IN Cookie (Expire or Not)
        if (!Cookies.get('isUserSignedIn')) auth.signOut()
        else { this.setAuthAction(true); core.fetchUserInfo(user) }
      }
    })
  }
}
</script>
<style lang="scss">
  @import "assets/css/style.scss";
</style>
