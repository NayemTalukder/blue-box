<template>
   <div class="">
      <b-row>
         <!-- Recent Slider -->
         <b-col lg="12" class="p-0">
         <iq-card className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height rounded">
            <div class="newrealease-contens">
               <Slick v-if="recentList.length !== 0" id="newrealease-slider" :option="option1">
                  <li v-for="(dvd, index) in recentList" :key="index" class="item display-none">
                     <a href="javascript:void(0)" :class="index+'_'+'recent_dvd_slider'" @click="pushRouteTopSlider(dvd, index+'_'+'recent_dvd_slider')" >
                        <img :src="dvd.image_url" class="img-fluid w-100 rounded" alt="">
                     </a>
                  </li>
               </Slick>
            </div>
         </iq-card>
         </b-col>
      </b-row>
      <b-container fluid>
         <b-row>
            <!-- Top Rated -->
            <CustomSlider v-if="topRatedList.length !== 0" :renderList="topRatedList" :heading="'Top Rated'" :sliderOption="{ autoplaySpeed: 2500 }" to="/view-more/top-rated" />
            <!-- Trending -->
            <CustomSlider v-if="trendingList.length !== 0" :renderList="trendingList" :heading="'Trending'" :sliderOption="{ autoplaySpeed: 3500 }" to="/view-more/trending" />
         </b-row>
         <!-- offer Slider -->
         <b-row :key="index" v-for="(offer, index) in offerSliderList" >
            <CustomSlider v-if="topRatedList.length !== 0" :renderList="offer.array" :heading="offer.name" :sliderOption="{ autoplaySpeed: 2500 }" :to="`/offer/${offer.name.replaceAll(/\s+/g, '-').replaceAll('%', '%25')}`" />
         </b-row>
      </b-container>
   </div>
</template>
<script>
import { core } from '../../config'
import { mapGetters, mapActions } from 'vuex'
const $ = require('jquery')
export default {
  name: 'Home',
  mounted () {
    core.index()
    if (this.recentList.length !== 0) this.adjustRecentListSlider()
  },
  computed: {
    ...mapGetters({
      auth: 'Main/auth',
      recentList: 'Main/recentList',
      trendingList: 'Main/trendingList',
      topRatedList: 'Main/topRatedList',
      offerSliderList: 'Main/offerSliderList'
    })
  },
  watch: {
    '$route': function (to, from) {
      core.index()
    },
    recentList (newValue, oldValue) {
      setTimeout(() => { if (oldValue.length === 0) this.adjustRecentListSlider() }, 100)
    }
  },
  methods: {
    ...mapActions({
      setSimiliarDvdsAction: 'Main/setSimiliarDvdsAction'
    }),
    adjustRecentListSlider () {
      $('#newrealease-slider .slick-active.slick-center a').addClass('route')
      $('#newrealease-slider .slick-active.slick-center').prev('.slick-active').addClass('temp')

      $('#newrealease-slider .slick-active.temp').prev().addClass('temp-1')
      $('#newrealease-slider .slick-active.temp-1').prev().addClass('temp-2')
      $('#newrealease-slider .slick-active.slick-center').next('.slick-active').addClass('temp-next')
      $('#newrealease-slider .slick-active.temp-next').next().addClass('temp-next-1')
      $('#newrealease-slider .slick-active.temp-next-1').next().addClass('temp-next-2')
      $('#newrealease-slider').on('afterChange', function () {
        $('#newrealease-slider .slick-active.slick-center a').addClass('route')
        let SLICKSLIDER = $('.slick-active.slick-center').data('slick-index')
        $('#newrealease-slider .slick-active[data-slick-index="' + (SLICKSLIDER - 1) + '"]').addClass('temp')
        $('#newrealease-slider .slick-active[data-slick-index="' + (SLICKSLIDER - 1) + '"] a').removeClass('route')
        $('#newrealease-slider .slick-active[data-slick-index="' + (SLICKSLIDER - 2) + '"]').addClass('temp-1')
        $('#newrealease-slider .slick-active[data-slick-index="' + (SLICKSLIDER - 2) + '"] a').removeClass('route')
        $('#newrealease-slider .slick-active[data-slick-index="' + (SLICKSLIDER - 3) + '"]').addClass('temp-2')
        $('#newrealease-slider .slick-active[data-slick-index="' + (SLICKSLIDER - 3) + '"] a').removeClass('route')
        $('#newrealease-slider .slick-active[data-slick-index="' + (parseInt(SLICKSLIDER + 1)) + '"]').addClass('temp-next')
        $('#newrealease-slider .slick-active[data-slick-index="' + (parseInt(SLICKSLIDER + 1)) + '"] a').removeClass('route')
        $('#newrealease-slider .slick-active[data-slick-index="' + (parseInt(SLICKSLIDER + 2)) + '"]').addClass('temp-next-1')
        $('#newrealease-slider .slick-active[data-slick-index="' + (parseInt(SLICKSLIDER + 2)) + '"] a').removeClass('route')
        $('#newrealease-slider .slick-active[data-slick-index="' + (parseInt(SLICKSLIDER + 3)) + '"]').addClass('temp-next-2')
        $('#newrealease-slider .slick-active[data-slick-index="' + (parseInt(SLICKSLIDER + 3)) + '"] a').removeClass('route')
      })
      $('#newrealease-slider').on('beforeChange', function () {
        let SLICKSLIDER = $('.slick-active.slick-center').data('slick-index')
        $('#newrealease-slider .slick-active[data-slick-index="' + (SLICKSLIDER - 1) + '"]').removeClass('temp')
        $('#newrealease-slider .slick-active[data-slick-index="' + (SLICKSLIDER - 2) + '"]').removeClass('temp-1')
        $('#newrealease-slider .slick-active[data-slick-index="' + (SLICKSLIDER - 3) + '"]').removeClass('temp-2')
        $('#newrealease-slider .slick-active[data-slick-index="' + (parseInt(SLICKSLIDER + 1)) + '"]').removeClass('temp-next')
        $('#newrealease-slider .slick-active[data-slick-index="' + (parseInt(SLICKSLIDER + 2)) + '"]').removeClass('temp-next-1')
        $('#newrealease-slider .slick-active[data-slick-index="' + (parseInt(SLICKSLIDER + 3)) + '"]').removeClass('temp-next-2')
      })
    },
    featuredAuthors () {
      const featuredAuthors = []
      this.authors.forEach(e => featuredAuthors.push(e))
      featuredAuthors.sort((a, b) => { return b.point - a.point })
      return featuredAuthors.slice(0, 10)
    },
    pushRouteTopSlider (item, route) {
      const hasRoute = $('.' + route).hasClass('route')
      if (hasRoute) {
        const pathToGo = '/dvd/' + item.title.replaceAll(/\s+/g, '-').replaceAll('%', '%25')
        if (this.$route.fullPath !== pathToGo) this.$router.push(pathToGo)
      }
    }
  },
  data: () => ({
    option1: {
      autoplay: true,
      autoplaySpeed: 3500,
      slidesToShow: 7,
      slidesToScroll: 1,
      variableWidth: true,
      centerMode: true,
      focusOnSelect: true
    },
    option2: {
      arrows: false,
      autoplaySpeed: 3500,
      slidesToShow: 2,
      slidesToScroll: 2
    }
  })
}
</script>
