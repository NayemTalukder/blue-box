<template>
  <!-- loader Start -->
  <div id="loading" :style="style">
    <div id="loading-center">
    </div>
  </div>
  <!-- loader END -->
</template>
<script>
import lightLoader from '../../../assets/images/logo.png'
import { animation } from '../../../config'
export default {
  name: 'Loader',
  watch: {
    '$route': function (to, from) {
      // eslint-disable-next-line no-mixed-operators
      let load = document.getElementById('loading')
      animation.fadeIn(load, { duration: 150 })
      load.classList.remove('d-none')
    }
  },
  computed: {
    style () {
      return `background: #fff url(${lightLoader}) no-repeat scroll center center; background-size: 15%;`
    }
  },
  mounted () {
  }
}
</script>
