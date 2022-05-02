<template>
  <div >
    <ul class="navbar-nav main-menu">
      <li class="nav-item text-center mr-3" :class="{active: showGenre}" @mouseenter="showSubMenu('Genre')" @mouseleave="resetSubMenu()" >
        <a class="nav-link" href="#">Genre<i class="fa fa-caret-down ml-1 d-none" :class="{'d-inline': showGenre}" ></i></a>
      </li>
      <li class="nav-item text-center mr-3" :class="{active: showKiosks}" @mouseenter="showSubMenu('Kiosks')" @mouseleave="resetSubMenu()" >
        <a class="nav-link" href="#">Kiosks<i class="fa fa-caret-down ml-1 d-none" :class="{'d-inline': showKiosks}" ></i></a>
      </li>
      <li class="nav-item text-center mr-3" :class="{active: showOffers}" @mouseenter="showSubMenu('Offers')" @mouseleave="resetSubMenu()" >
        <a class="nav-link" href="#">Offers<i class="fa fa-caret-down ml-1 d-none" :class="{'d-inline': showOffers}" ></i></a>
      </li>
      <li v-if="this.auth" class="nav-item text-center mr-3">
        <a href="/invoice" class="nav-link main-menu-item" >Invoice</a>
      </li>
      <li v-if="this.auth" class="nav-item text-center mr-3">
        <a href="/profile" class="nav-link main-menu-item" >Profile</a>
      </li>
      <li class="nav-item text-center mr-3">
        <a href="/about-us" class="nav-link main-menu-item" >About Us</a>
      </li>
      <li class="nav-item text-center mr-3">
        <a @click="contactModal" class="nav-link main-menu-item" href="javascript:void(0)">Contact Us</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    showGenre: { type: Boolean, default: false },
    showKiosks: { type: Boolean, default: false },
    showOffers: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters({ auth: 'Main/auth' })
  },
  methods: {
    ...mapActions({
      setModalStateAction: 'Main/setModalStateAction'
    }),
    showSubMenu (val) { this.$emit('showSubMenu', val) },
    resetSubMenu (val) { this.$emit('resetSubMenu') },
    contactModal () { this.setModalStateAction([true, 'Contact Us', null, 'Ok']) }
  }
}
</script>

<style scoped lang="scss">
  .main-menu .nav-item.active {
      margin-bottom: -20px;
  }
  [dir=ltr][mode=light] .main-menu .nav-item .nav-link {
    color: var(--iq-title-text);
  }
  .nav-item.active .nav-link {
    color: var(--iq-primary) !important
  }
  .main-menu-item:hover {
    color: var(--iq-primary) !important
  }
</style>
