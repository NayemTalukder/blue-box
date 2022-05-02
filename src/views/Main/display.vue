<template>
  <b-container fluid>
      <b-row>
        <!-- Displayed DVD by Types -->
        <b-col lg="12" id="main">
          <iq-card>
              <template v-slot:headerTitle>
                <h4 v-if="$route.name === 'genre'" class="card-title mb-0 text-capitalize"><span class="mr-2"> {{$route.meta.name}}</span> "{{$route.params.title.replaceAll('-', ' ').replaceAll('%25', '%')}}"</h4>
                <h4 v-else class="card-title mb-0 text-capitalize">{{$route.params.title.replaceAll('-', ' ').replaceAll('%25', '%')}}</h4>
              </template>
              <template v-slot:body>
                <div class="row">
                    <h1 v-if="renderList.length === 0" class="mx-auto p-4">Nothing Found . . .</h1>
                    <div class="col-sm-6 col-md-4 col-lg-3"
                      v-for="(item, index) in renderList" :key="index" >
                      <div class="iq-card iq-card-block iq-card-stretch iq-card-height browse-dvd-content">
                          <div class="iq-card-body p-0">
                            <div class="d-flex align-items-center">
                                <div class="col-6 p-0 position-relative image-overlap-shadow">
                                  <a href="javascript:void(0)"><img class="img-fluid rounded w-100" v-lazy="item.image_url" alt=""></a>
                                  <div class="view-dvd">
                                      <router-link :to="`/dvd/${item.title.replaceAll(/\s+/g, '-').replaceAll('%', '%25')}`" class="btn btn-sm btn-white">View Dvd</router-link>
                                  </div>
                                </div>
                                <div class="col-6">
                                  <div class="mb-2">
                                      <h6 class="mb-1">{{item.title}}</h6>
                                      <p class="font-size-13 line-height mb-1">{{item.released_at}} | {{item.Duration}}</p>
                                      <div class="d-block line-height">
                                        <star-rating :star-size="13"  :rating="item.rating" :show-rating="false" :read-only="true" :round-start-rating="false"></star-rating>
                                      </div>
                                  </div>
                                  <div class="price d-flex align-items-center">
                                      <span class="pr-1 font-size-13">Released</span>
                                      <h6><b>{{item.released_at}}</b></h6>
                                  </div>
                                  <div class="price d-flex align-items-center">
                                      <span class="pr-1 font-size-13">Rented</span>
                                      <h6><b>{{item.frequency}}</b></h6>
                                  </div>
                                </div>
                            </div>
                          </div>
                      </div>
                    </div>
                </div>
              </template>
          </iq-card>
        </b-col>
        <!-- Top Rated -->
        <CustomSlider v-if="getSlider('top-rated') && topRatedList.length !== 0" :renderList="topRatedList" :heading="'Top Rated'" :sliderOption="{ autoplaySpeed: 2500 }" to="/view-more/top-rated" />
        <!-- Trending -->
        <CustomSlider v-if="getSlider('trending') && trendingList.length !== 0" :renderList="trendingList" :heading="'Trending'" :sliderOption="{ autoplaySpeed: 3500 }" to="/view-more/trending" />
      </b-row>
  </b-container>
</template>
<script>
import { core } from '../../config'
import { mapGetters, mapActions } from 'vuex'
import StarRating from 'vue-star-rating'
export default {
  name: 'Display',
  mounted () { core.index(); this.fetchInitial() },
  components: { StarRating },
  computed: {
    ...mapGetters({
      trendingList: 'Main/trendingList',
      topRatedList: 'Main/topRatedList',
      offerSliderList: 'Main/offerSliderList'
    })
  },
  watch: {
    $route (to, from) { core.index(); this.fetchInitial() },
    offerSliderList () { this.fetchInitial() }
  },
  methods: {
    ...mapActions({
      setLastItemAction: 'Main/setLastItemAction'
    }),
    getSlider (val) {
      if (this.$route.params.title === val) return false
      else return true
    },
    fetchInitial () {
      if (this.$route.params.title === 'trending') this.renderList = this.trendingList
      else if (this.$route.params.title === 'top-rated') this.renderList = this.topRatedList
      else if (this.$route.name === 'offer') {
        this.offerSliderList.forEach(e => {
          let name = e.name.replaceAll(/\s+/g, '-').replaceAll('%', '%25').replaceAll('-', ' ').replaceAll('%25', '%')
          if (name === this.$route.params.title.replaceAll('-', ' ').replaceAll('%25', '%')) this.renderList = e.array
        })
      } else if (this.$route.name === 'genre') {
        core.fetchDisplayedDvds(this.$route.params.title.replaceAll('-', ' ').replaceAll('%25', '%'))
          .then(snap => (this.renderList = snap))
      }
    }
  },
  data () {
    return {
      renderList: []
    }
  }
}
</script>
