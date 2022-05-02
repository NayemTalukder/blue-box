import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
  miniSidebarMenu: false,
  modalState: {
    visible: false,
    title: '',
    body: '',
    okTitle: '',
    okOnly: true
  },
  auth: false,
  user: null,
  verticalMenu: [],
  genreList: [],
  offerList: [],
  offerSliderList: [],
  recentList: [],
  trendingList: [],
  topRatedList: [],
  dvdInfo: null,
  similiarDvds: null,
  invoiceList: []
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
