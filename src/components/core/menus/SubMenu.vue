<template>
    <div class="sub-menu d-none" :class="{ 'd-block': showGenre || showKiosks || showOffers }" @mouseenter="showSubMenu()" @mouseleave="resetSubMenu()">
    <!-- Alert Modal Start -->
    <CustomAlert v-if="modalState.title === 'Kiosk Information' || modalState.title === 'Contact Us' || modalState.title === 'Log Out !'" @ok="ok" >
      <template v-slot:body>
        <span v-if="modalState.title === 'Log Out !'">
          <p class="text-center text-dark font-size-34 mb-0">Are you sure ?</p>
        </span>
        <span v-if="modalState.title === 'Kiosk Information'">
          <p class="text-center text-capitalize">Branch Name: <span class="text-dark badge badge-pill badge-success">{{currentKiosk}}</span></p>
          <p class="text-center font-size-12">
            <span>Address:</span> <span class="text-dark"> 4370  Mutton Town Road, Bellingham, Washington</span>
          </p>
        </span>
        <span v-if="modalState.title === 'Contact Us'" >
          <span class="d-block text-center">
            <a href="https://www.linkedin.com/bluebox" class="badge badge-pill text-dark mr-2 badge-success" >Linked In</a>
            <a class="font-size-13" href="https://www.linkedin.com/bluebox" target="_blank" >https://www.linkedin.com/bluebox</a>
          </span>
          <span class="d-block text-center">
            <a href="https://twitter.com/bluebox" class="badge badge-pill text-dark mr-2 badge-danger" >Twitter</a>
            <a href="https://twitter.com/bluebox" target="_blank" >https://twitter.com/bluebox</a>
          </span>
          <span class="d-block text-center">
            <a href="https://facebook.com/bluebox" class="badge badge-pill text-dark mr-2 badge-warning" >Facebook</a>
            <a class="font-size-14" href="https://facebook.com/bluebox" target="_blank" >https://facebook.com/bluebox</a>
          </span>
          <span class="d-block text-center mt-1">
            <span class="badge badge-pill text-dark mr-2 badge-info font-size-16" >Mail</span> bluebox.office@gmail.com
          </span>
        </span >
      </template>
    </CustomAlert>
    <!-- Alert Modal End -->
      <div class="container-fluid">
        <tab-content id="pills-tabContent-2" class="sub-menu-content">
          <tab-content-item :active="showGenre" >
            <div class="row mt-1">
              <div class="col-3" :key="index" v-for="(genre, index) in genreList">
                <router-link :to="`/genre/${genre.name.replaceAll(/\s+/g, '-').replaceAll('%', '%25')}`" class="sub-menu-item cursor-pointer"><i class="las la-long-arrow-alt-right mr-2"></i>{{genre.name}}<span class="badge badge-pill ml-2 badge-dark" >{{genre.frequency}}</span></router-link>
              </div>
            </div>
          </tab-content-item>
          <tab-content-item :active="showKiosks" >
            <div class="row mt-1">
              <div class="col-3" :key="index" v-for="(kiosk, index) in kiosks">
                <a @click="kioskModal(kiosk)" class="sub-menu-item cursor-pointer" ><i class="las la-long-arrow-alt-right mr-2"></i>{{kiosk}}</a>
              </div>
            </div>
          </tab-content-item>
          <tab-content-item :active="showOffers" >
            <div class="row mt-1">
              <div class="col-3" :key="index" v-for="(offer, index) in offerList">
                <router-link :to="`/offer/${offer.name.replaceAll(/\s+/g, '-').replaceAll('%', '%25')}`" class="sub-menu-item cursor-pointer"><i class="las la-long-arrow-alt-right mr-2"></i>{{offer.name}}<span class="badge badge-pill ml-2 badge-dark" >{{offer.off * 100}} %</span></router-link>
              </div>
            </div>
          </tab-content-item>
        </tab-content>
      </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import { mapGetters, mapActions } from 'vuex'
import { sidebar } from '../../../config'
export default {
  props: {
    showGenre: { type: Boolean, default: false },
    showKiosks: { type: Boolean, default: false },
    showOffers: { type: Boolean, default: false },
    activeMenuItem: { type: String, default: '' }
  },
  computed: {
    ...mapGetters({
      auth: 'Main/auth',
      genreList: 'Main/genreList',
      offerList: 'Main/offerList',
      modalState: 'Main/modalState'
    })
  },
  methods: {
    ...mapActions({
      setModalStateAction: 'Main/setModalStateAction',
      setAuthAction: 'Main/setAuthAction'
    }),
    showSubMenu () { this.$emit('showSubMenu', this.activeMenuItem) },
    resetSubMenu (val) { this.$emit('resetSubMenu') },
    kioskModal (kiosk) {
      this.currentKiosk = kiosk.replaceAll('_', ' ')
      this.setModalStateAction([true, 'Kiosk Information', null, 'Ok'])
    },
    ok () {
      if (this.modalState.title === 'Log Out !') this.logOut()
    },
    logOut () {
      // eslint-disable-next-line no-undef
      auth.signOut(); if (Cookies.get('isUserSignedIn') !== undefined) Cookies.remove('isUserSignedIn')
      this.setAuthAction(false)
      sidebar.getNavigationOptions()
      this.$router.push('/')
    }
  },
  data: () => ({
    kiosks: [ 'kiosk_east', 'kiosk_west', 'kiosk_north', 'kiosk_south' ],
    currentKiosk: null
  })
}
</script>

<style scoped lang="scss">
  .sub-menu .nav-item .nav-link.active {
    color: var(--iq-primary) !important
  }
  .sub-menu {
    border-top: 1px solid var(--iq-primary);
    transition: all 0.3s ease-out 0s;
  }
  .sub-menu-heading {
    font-size: 15.5px;
  }
  .sub-menu-content {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    padding-bottom: .5rem;
  }
  [dir=ltr][mode=light] .sub-menu-item {
    font-size: 13.5px;
    color: var(--iq-title-text);
    font-style: italic;
  }
  [dir=ltr][mode=dark] .sub-menu-item {
    font-size: 13.5px;
    color: var(--iq-dark-title-text);
    font-style: italic;
  }
  .sub-menu-item:hover {
    color: var(--iq-primary) !important
  }
</style>
