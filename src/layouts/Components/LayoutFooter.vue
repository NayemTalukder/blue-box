<template>
  <div>
    <MiniFooter>
      <template v-slot:left>
        <li class="list-inline-item"><router-link to="/privacy-policy">Privacy Policy</router-link></li>
        <li class="list-inline-item"><router-link disabled to="/terms-of-service">Terms of Use</router-link></li>
      </template>
      <template v-slot:right>
        Copyright 2020 <router-link to="/">{{ appName }}</router-link> All Rights Reserved.
      </template>
    </MiniFooter>
  </div>
</template>
<script>
import MiniFooter from '../../components/core/footer/MiniFooter'
import { APPNAME } from '../../config'
export default {
  name: 'LayoutFooter',
  components: {
    MiniFooter
  },
  data () {
    return {
      appName: APPNAME
    }
  }
}
</script>
