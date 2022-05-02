import Vue from 'vue'

import { BCollapse } from 'bootstrap-vue/src/components/collapse/collapse'
import { BCardBody } from 'bootstrap-vue/src/components/card/card-body'
import { BNavbarToggle } from 'bootstrap-vue/src/components/navbar/navbar-toggle'
import { BProgress } from 'bootstrap-vue/src/components/progress/progress'
import { BContainer } from 'bootstrap-vue/src/components/layout/container'
import { BRow } from 'bootstrap-vue/src/components/layout/row'
import { BCol } from 'bootstrap-vue/src/components/layout/col'
import { BModal } from 'bootstrap-vue/src/components/modal/modal'

import { VBModal } from 'bootstrap-vue/src/directives/modal/modal'
import { VBToggle } from 'bootstrap-vue/src/directives/toggle/toggle'

Vue.component('b-container', BContainer)
Vue.component('b-row', BRow)
Vue.component('b-col', BCol)
Vue.component('b-modal', BModal)
Vue.component('b-card-body', BCardBody)
Vue.component('b-navbar-toggle', BNavbarToggle)
Vue.component('b-collapse', BCollapse)
Vue.component('b-progress', BProgress)

Vue.directive('b-modal', VBModal)
Vue.directive('b-toggle', VBToggle)
