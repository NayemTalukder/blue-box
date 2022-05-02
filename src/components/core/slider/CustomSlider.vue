<template>
  <b-col sm="12" >
      <iq-card className="iq-card iq-card-block iq-card-stretch iq-card-height" headerClass="align-items-center position-relative" :bodyClass="bodyClass">
        <template v-slot:headerTitle>
          <h4 v-if="renderList.length !== 0" class="card-title mb-0">{{heading}}</h4>
        </template>
        <template v-slot:headerAction>
          <router-link v-if="!featured && renderList.length !== 0" :to="to" class="btn btn-sm btn-primary view-more text-white">View More</router-link>
        </template>
        <template v-slot:body>
          <Slick v-if="!featured && renderList.length !== 0" :option="sliderOptions()">
            <li class="display-none" v-for="(dvd, index) in renderList" :key="index">
              <span class="d-flex align-items-center">
                <div class="col-5" :class="extraWidth ? 'p-0' : ''">
                    <div class="position-relative image-overlap-shadow">
                      <a href="javascript:void(0)"><img class="img-fluid rounded w-100" :src="dvd.image_url" alt=""></a>
                      <div class="view-dvd">
                          <router-link :to="`/dvd/${dvd.title.replaceAll(/\s+/g, '-').replaceAll('%', '%25')}`" class="btn btn-sm btn-white">View Dvd</router-link>
                      </div>
                    </div>
                </div>
                <div class="col-7" :class="paddingLeft">
                  <div class="mb-2">
                      <h6 class="mb-1">{{dvd.title}}</h6>
                      <p class="font-size-13 line-height mb-1">Duration: {{dvd.Duration}}</p>
                      <div class="d-block line-height">
                        <star-rating :star-size="13"  :rating="dvd.rating" :show-rating="false" :read-only="true" :round-start-rating="false"></star-rating>
                      </div>
                  </div>
                  <div class="price d-flex align-items-center">
                      <span class="pr-1">Released</span>
                      <h6><b>{{dvd.released_at}}</b></h6>
                  </div>
                  <div class="price d-flex align-items-center">
                      <span class="pr-1">Rented</span>
                      <h6><b>{{dvd.frequency}}</b></h6>
                  </div>
                </div>
              </span>
            </li>
          </Slick>
        </template>
      </iq-card>
  </b-col>
</template>

<script>
import Slick from './core/Slick'
import { mapGetters, mapActions } from 'vuex'
import StarRating from 'vue-star-rating'
export default {
  name: 'Slider1',
  components: { Slick, StarRating },
  props: {
    featured: { type: Boolean, default: false },
    renderList: { type: Array, default: () => [] },
    heading: { type: String, default: '' },
    to: { type: String, default: '/' },
    bodyClass: { type: String, default: 'custom-slider' },
    sliderOption: { type: Object, default: () => {} },
    extraWidth: { type: Boolean, default: true },
    paddingLeft: { type: String, default: '' }
  },
  computed: {
    ...mapGetters({
      favouriteList: 'Main/favouriteList',
      readLaterList: 'Main/readLaterList'
    })
  },
  methods: {
    ...mapActions({
      setSimiliarDvdsAction: 'Main/setSimiliarDvdsAction'
    }),
    sliderOptions () {
      if (this.featured) {
        return {
          ...this.option,
          ...this.sliderOption,
          responsive: this.responsiveFeatured
        }
      } else {
        return {
          ...this.option,
          ...this.sliderOption,
          responsive: this.responsive
        }
      }
    }
  },
  data: () => ({
    responsiveFeatured: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    option: {
      dots: false,
      arrows: false,
      infinite: true,
      autoplay: true,
      speed: 300,
      centerMode: false,
      autoplaySpeed: 3000,
      slidesToShow: 3,
      slidesToScroll: 1,
      focusOnSelect: false
    }
  })
}
</script>
