<template>
  <b-container fluid>
    <!-- <div v-if="loader" class="loader"></div> -->
    <!-- Alert Modal Start -->
    <CustomAlert v-if="$route.name === 'dvd'" @ok="onclickRent" >
      <template v-slot:body >
        <span v-if="modalState.okTitle === 'rent'" class="text-center" >
            <p>Total Rent: <span class="font-size-14 badge badge-pill badge-success text-dark ml-1">$ {{rent.toFixed(2)}}</span></p>
            <p class="mb-0">Total Days: <span class="font-size-14 badge badge-pill badge-success text-dark ml-1">{{days}}</span></p>
        </span>
        <span v-if="modalState.okTitle === 'return'" class="text-center" >
            <p>Late Fee: <span class="font-size-14 badge badge-pill badge-success text-dark ml-1 mt-3">$ {{getLateFee()}}</span></p>
        </span>
      </template>
    </CustomAlert>
    <!-- Alert Modal End -->
   <b-row>
      <!-- Description Contents Start -->
      <b-col sm="12">
         <iq-card no-header className="iq-card iq-card-block iq-card-stretch iq-card-height" bodyClass="pb-0">
            <template v-slot:body>
               <div v-if="dvdInfo" class="description-contens align-items-top row">
                  <!-- Image Start-->
                  <div class="col-md-4 my-auto">
                    <div class="col-md-10 mx-auto">
                      <div class="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                          <div class="iq-card-body p-0">
                            <div class="row align-items-center">
                                <img :src="dvdInfo.image_url" class="img-fluid rounded w-100" alt="">
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                  <!-- Image End-->
                  <!-- Information Start-->
                  <div class="col-md-6 my-auto">
                     <div class="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                        <div class="iq-card-body p-0">
                           <h3 class="font-size-44 mb-2">{{dvdInfo.title}}</h3>
                          <!-- Frequency | Rating | Offer -->
                          <div class="row">
                            <div class="col-lg-6 col-xs-12">
                              <div class="price d-flex align-items-center font-weight-500 mb-1">
                                  <span class="font-size-18 pr-2">Rented</span>
                                  <span class="font-size-22 text-dark mr-4">{{dvdInfo.frequency}}</span>
                                  <star-rating :star-size="25" :rating="dvdInfo.rating" :show-rating="false" :read-only="true" :round-start-rating="false"></star-rating>
                              </div>
                            </div>
                            <div class="col-lg-6 col-xs-12 my-auto">
                              <span v-if="!checkRes(992 - 17)" class="font-size-18 pr-2">Offer</span>
                              <span class="font-size-14 badge badge-pill badge-dark ml-4">{{dvdInfo.name}}</span>
                            </div>
                            </div>
                           <!-- Release | Duration -->
                           <div id="release-duration" class="price d-flex align-items-center font-weight-500 mb-1">
                              <span class="font-size-18 pr-2">released</span>
                              <span :class="!checkRes(992 - 17) ? 'mr-4' : 'mr-5'" class="font-size-22 text-dark">{{dvdInfo.released_at}}</span>
                              <span class="font-size-18 pr-2">duration</span>
                              <span class="font-size-22 text-dark">{{dvdInfo.Duration}}</span>
                           </div>
                           <!-- Genre -->
                           <div class="price d-flex align-items-center font-weight-500 mb-1">
                              <span class="font-size-18 pr-2">Genre</span>
                              <span :key="index" v-for="(genre, index) in dvdInfo.Genre" class="font-size-24 text-dark mr-3">
                                <span class="font-size-14 badge badge-pill badge-dark mb-2">{{genre}}</span>
                              </span>
                           </div>
                           <!-- Handle Ranting -->
                           <div class="row my-3">
                            <!-- Return Button -->
                            <div id="return-button" v-if="dvdInfo.status === 'pending'" @click="handleReturning" class="col-8 my-auto">
                              <div class="badge badge-pill badge-warning d-flex py-2 cursor-pointer">
                                <p class="col-6 my-auto font-size-16 text-dark">Return Now</p>
                                <p class="my-auto font-size-16 text-dark ml-auto">Days Left</p>
                                <p class="my-auto font-size-16 text-dark ml-2 mr-auto">{{dvdInfo.days_left}}</p>
                              </div>
                            </div>
                           <!-- Rent Button -->
                            <div id="rent-button" v-else class="col-md-8 col-sm-12">
                              <div class="row">
                                <div @click="handleRanting" class="col-8 my-auto">
                                  <div class="badge badge-pill badge-success d-flex py-2 cursor-pointer">
                                    <p class="my-auto font-size-16 text-dark">
                                      Rent for {{days}} {{days > 1 ? 'Days' : 'Day'}}
                                    </p>
                                    <p class="old-price my-auto font-size-16 text-dark ml-auto">${{dvdInfo.price * days}}</p>
                                    <p class="my-auto font-size-16 text-dark ml-2">${{((dvdInfo.price - dvdInfo.off) * days).toFixed(2)}}</p>
                                  </div>
                                </div>
                                <!-- Select Number of Days -->
                                <div class="col-4 pl-0 ml-auto">
                                  <select v-model="days" class="font-size-16 text-dark badge badge-pill badge-success border-success w-100 py-2 cursor-pointer" >
                                    <option :key="index" v-for="index in 7" :value="index">{{index}} {{index > 1 ? 'Days' : 'Day'}}</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <!-- Kiosk List -->
                            <div id="kiosk-selector" class="col-md-4 col-sm-12">
                              <select v-model="kiosk" class="font-size-16 badge badge-pill badge-dark w-100 py-2 cursor-pointer" >
                                <option value="Kiosk East">Kiosk East {{dvdInfo.kiosk_east}}</option>
                                <option value="Kiosk West">Kiosk West {{dvdInfo.kiosk_west}}</option>
                                <option value="Kiosk North">Kiosk North {{dvdInfo.kiosk_north}}</option>
                                <option value="Kiosk South">Kiosk South {{dvdInfo.kiosk_south}}</option>
                              </select>
                            </div>
                           </div>
                           <!-- Summary Section -->
                           <div class="text-primary mb-4">
                              Summary:
                              <p class="summary"> {{dvdInfo.Summary}}</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <!-- Information End-->
                  <!-- Similiar Dvd Slider Start-->
                  <div v-if="checkRes(1100)" class="col-md-2 col">
                    <div class="col-xl-9 mx-auto">
                      <Slick v-if="similiarDvds" id="description-slider-nav" :option="option1">
                        <li class="display-none" v-for="(dvd, index) in similiarDvds" :key="index">
                          <router-link :to="`/dvd/${dvd.title.replaceAll(/\s+/g, '-').replaceAll('%', '%25')}`" class="cursor-pointer">
                            <img :src="dvd ? dvd.image_url : ''" class="img-fluid rounded w-100" alt="">
                          </router-link>
                        </li>
                      </Slick>
                    </div>
                  </div>
                  <!-- Similiar Dvd Slider End-->
               </div>
            </template>
         </iq-card>
      </b-col>
      <!-- Description Contents End -->
      <!-- Trending Slider-->
      <CustomSlider v-if="trendingList.length !== 0" :renderList="trendingList" :heading="'Trending'" :sliderOption="{ autoplaySpeed: 3500 }" :to="'/view-more/trending'" />
      <!-- Top Rated Slider -->
      <CustomSlider v-if="topRatedList.length !== 0" :renderList="topRatedList" :heading="'Top Rated'" :sliderOption="{ autoplaySpeed: 2500 }" :to="'/view-more/top-rated'" />
   </b-row>
  </b-container>
</template>
<script>
import { core } from '../../config'
import { mapGetters, mapActions } from 'vuex'
import StarRating from 'vue-star-rating'
const $ = require('jquery')
export default {
  name: 'dvdpage',
  mounted () { core.index(); core.fetchDvdInfo(this.$route.params.title.replaceAll('-', ' ').replaceAll('%25', '%')); this.loader = true },
  components: { StarRating },
  watch: {
    $route (to, from) {
      if (to.params.title !== from.params.title) {
        core.fetchDvdInfo(this.$route.params.title.replaceAll('-', ' ').replaceAll('%25', '%'))
        core.index(); this.loader = true
      } else document.getElementById('loading').classList.add('d-none')
    },
    genreList () { core.fetchDvdInfo(this.$route.params.title.replaceAll('-', ' ').replaceAll('%25', '%')) }
  },
  computed: {
    ...mapGetters({
      auth: 'Main/auth',
      trendingList: 'Main/trendingList',
      topRatedList: 'Main/topRatedList',
      dvdInfo: 'Main/dvdInfo',
      similiarDvds: 'Main/similiarDvds',
      modalState: 'Main/modalState',
      genreList: 'Main/genreList'
    })
  },
  methods: {
    ...mapActions({
      setDvdInfoAction: 'Main/setDvdInfoAction',
      setModalStateAction: 'Main/setModalStateAction'
    }),
    checkRes (size) {
      if ($(window).width() >= size) return true
      else return false
    },
    getLateFee () {
      let daysLeft = this.dvdInfo.days_left * -1
      if (daysLeft > 0) {
        if (daysLeft <= 7) return daysLeft * 2
        else return 30
      } else return 0
    },
    onclickRent () {
      if (this.modalState.okTitle === 'rent') core.onclickRent(this.dvdInfo, this.rent, this.days, this.kiosk)
      if (this.modalState.okTitle === 'return') core.onclickReturn(this.dvdInfo, this.getLateFee(), (this.dvdInfo.days_left * -1), this.kiosk)
    },
    handleRanting () {
      if (this.auth) {
        if (this.checkKioskAvailability()) {
          if (this.dvdInfo.offer_code) {
            this.rent = (this.dvdInfo.price - this.dvdInfo.off) * this.days
            this.setModalStateAction([true, 'One more click !', null, 'rent', false])
          }
        }
      } else this.setModalStateAction([true, 'Opps !', 'You have to log In first'])
    },
    handleReturning () {
      this.setModalStateAction([true, 'One more click !', null, 'return', false])
    },
    checkKioskAvailability () {
      if (this.dvdInfo.kiosk_east === 0 && this.dvdInfo.kiosk_east === 0 && this.dvdInfo.kiosk_east === 0 && this.dvdInfo.kiosk_east === 0) {
        this.setModalStateAction([true, 'Sorry !', 'This item is not available right now.', 'Ok'])
        return false
      } else {
        if (this.kiosk === 'Kiosk East' && this.dvdInfo.kiosk_east > 0) return true
        else if (this.kiosk === 'Kiosk West' && this.dvdInfo.kiosk_west > 0) return true
        else if (this.kiosk === 'Kiosk North' && this.dvdInfo.kiosk_north > 0) return true
        else if (this.kiosk === 'Kiosk South' && this.dvdInfo.kiosk_south > 0) return true
        else {
          this.setModalStateAction([true, 'Sorry !', 'This item is not available in this Kiosk. Please select another.', 'Ok'])
          return false
        }
      }
    },
    pushRoute (item) {
    }
  },
  data: () => ({
    kiosk: 'Kiosk East',
    days: 1,
    rent: 0,
    loader: false,
    option1: {
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      infinite: true,
      swipe: true,
      swipeToSlide: true,
      vertical: true,
      verticalSwiping: true,
      speed: 300,
      autoplay: true
    }
  })
}
</script>

<style scoped lang="scss" >
  @media(max-width:500px) {
    #rent-button, #return-button {
      .font-size-16 { font-size: 12px !important; }
    }
    #kiosk-selector {
      margin-top: 10px;
      .font-size-16 { font-size: 11px !important; }
    }
  }
  @media(max-width:767px) {
    #kiosk-selector {
      margin-top: 10px;
    }
  }
  @media(min-width:768px) and (max-width:890px) {
    #release-duration {
      .font-size-22 { font-size: 16px !important; }
    }
  }
  @media(min-width:768px) and (max-width:867px) {
    #rent-button, #return-button, #kiosk-selector {
      .font-size-16 { font-size: 8px !important; }
    }
  }
  @media(min-width:868px) and (max-width:967px) {
    #rent-button, #return-button {
      .font-size-16 { font-size: 10px !important; }
    }
    #kiosk-selector {
      .font-size-16 { font-size: 9px !important; }
    }
  }
  @media(min-width:968px) and (max-width:1067px) {
    #rent-button, #return-button {
      .font-size-16 { font-size: 11px !important; }
    }
    #kiosk-selector {
      .font-size-16 { font-size: 10px !important; }
    }
  }
  @media(min-width:1068px) and (max-width:1278px) {
    #rent-button, #kiosk-selector {
      .font-size-16 { font-size: 12px !important; }
    }
    #kiosk-selector {
      .font-size-16 { font-size: 11px !important; }
    }
  }

</style>
