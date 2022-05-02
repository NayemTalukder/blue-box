<template>
  <div>
    <Loader />
    <div class="wrapper">
      <!-- Sidebar  -->
      <Sidebar :items="verticalMenu" :onlyLogoText="true" @toggle="sidebarMini" :sidebarGroupTitle="true" />
      <!-- TOP Nav Bar -->
      <DefaultNavBar :homeURL="{ name: 'Home' }" :sidebarGroupTitle="true" @toggle="sidebarMini" :logo="logo" />
      <div id="content-page" class="content-page">
        <transition name="router-anim" :enter-active-class="`animated ${animated.enter}`" mode="out-in"
                    :leave-active-class="`animated ${animated.exit}`">
          <router-view/>
        </transition>
      </div>
    </div>
    <LayoutFooter />
  </div>
</template>
<script>
import { core } from '../config'
import { mapGetters } from 'vuex'
import Loader from '../components/core/loader/Loader'
import Sidebar from '../components/core/sidebars/Sidebar'
import DefaultNavBar from '../components/core/navbars/DefaultNavBar'
import Logo from '../assets/images/logo.png'
import LayoutFooter from './Components/LayoutFooter'

export default {
  name: 'VerticleLayout',
  components: {
    LayoutFooter,
    Loader,
    Sidebar,
    DefaultNavBar
  },
  mounted () {
    if (this.$route.name === undefined) this.$router.push({ name: '/' })
  },
  computed: {
    ...mapGetters({ auth: 'Main/auth', verticalMenu: 'Main/verticalMenu' })
  },
  data: () => ({
    animated: { enter: 'fadeIn', exit: 'fadeOut' },
    logo: Logo
  }),
  methods: {
    sidebarMini () { core.triggerSet(); this.$store.dispatch('Main/miniSidebarAction') }
  }
}
</script>

<style lang="scss">
  @import url("../assets/css/custom.scss");
</style>
