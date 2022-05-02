
<template>
  <!-- TOP Nav Bar -->
  <div class="iq-top-navbar">
    <div class="iq-navbar-custom">
      <nav class="navbar navbar-expand-lg navbar-light p-0">
        <div class="d-flex align-items-center brand-margin-right">
            <!-- Handle Sidebar -->
            <div class="wrapper-menu" @click="miniSidebar">
              <div class="main-circle"><i class="las la-bars"></i></div>
            </div>
            <!-- Header Left Fixed Brand -->
            <div class="iq-navbar-logo d-flex justify-content-between">
              <router-link to="/" class="header-logo">
                  <div class="logo-title">
                    <span class="text-primary text-uppercase">{{appName}}</span>
                  </div>
              </router-link>
            </div>
        </div>

        <!-- Main Menu -->
        <b-collapse id="nav-collapse-menu" class="mr-auto" is-nav>
          <MainMenu @showSubMenu="showSubMenu" @resetSubMenu="resetSubMenu" :showGenre="showGenre" :showKiosks="showKiosks" :showOffers="showOffers" />
        </b-collapse> <!-- Main Menu End -->

        <!-- Header Right Options Start-->
        <b-navbar-toggle target="nav-collapse" class="mr-2">
          <i class="ri-menu-3-line" />
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" class="mb-2" is-nav>
            <ResponsiveRightMenu />
        </b-collapse> <!-- Header Right Options End -->
      </nav>
      <!-- Sub Menu Start -->
      <SubMenu @showSubMenu="showSubMenu" @resetSubMenu="resetSubMenu" :showGenre="showGenre" :showKiosks="showKiosks" :showOffers="showOffers" :activeMenuItem="activeMenuItem" />
      <!-- Sub Menu End -->
    </div>
  </div>
  <!-- TOP Nav Bar END -->
</template>
<script>
import { mapActions } from 'vuex'
import { APPNAME } from '../../../config'
import ResponsiveRightMenu from '../menus/ResponsiveRightMenu'
import MainMenu from '../menus/MainMenu'
import SubMenu from '../menus/SubMenu'
export default {
  name: 'DefaultNavBar',
  props: {
    homeURL: { type: Object, default: () => ({ name: 'Home' }) },
    logo: { type: String, default: require('../../../assets/images/logo.png') },
    horizontal: { type: Boolean, default: false },
    items: { type: Array },
    sidebarGroupTitle: { type: Boolean, default: true }
  },
  components: { ResponsiveRightMenu, MainMenu, SubMenu },
  data () {
    return {
      appName: APPNAME,
      showGenre: false,
      showKiosks: false,
      showOffers: false,
      activeMenuItem: ''
    }
  },
  methods: {
    ...mapActions({
    }),
    resetSubMenu () {
      this.showGenre = false
      this.showKiosks = false
      this.showOffers = false
    },
    showSubMenu (val) {
      this.activeMenuItem = val
      if (val === 'Genre') this.showGenre = true
      else if (val === 'Kiosks') this.showKiosks = true
      else if (val === 'Offers') this.showOffers = true
    },
    miniSidebar () {
      this.$emit('toggle')
    }
  }
}
</script>

<style scoped lang="scss">
  .collapse-menu{
    @media (min-width:1300px) {
      display: none;
    }
  }
  .brand-margin-right {
    margin-right: 50px;
    @media (max-width:991px) {
      margin-right: auto !important;
    }
  }
  .iq-sidebar-menu .iq-menu.hover-menu {
    display: flex;
    @media (max-width:1299px){
      display: none !important;
    }
  }
</style>
