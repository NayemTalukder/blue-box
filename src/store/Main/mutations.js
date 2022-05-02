export default {
  miniSidebarCommit (state, data) { state.miniSidebarMenu = data },
  resetState (state) {
    state.miniSidebarMenu = false
    state.modalState = {
      visible: false,
      title: '',
      body: '',
      okTitle: '',
      okOnly: true
    }
    state.auth = false
    state.user = null
    state.verticalMenu = []
    state.genreList = []
    state.offerList = []
    state.offerSliderList = []
    state.recentList = []
    state.trendingList = []
    state.topRatedList = []
    state.dvdInfo = null
    state.similiarDvds = null
    state.invoiceList = []
  },
  setAuth (state, data) { state.auth = data },
  setUser (state, data) { state.user = data },
  setModalState (state, data) { state.modalState = data },
  setGenreList (state, data) { state.genreList = data },
  setOfferList (state, data) { state.offerList = data },
  setOfferSliderList (state, data) { state.offerSliderList = data },
  setTrendingList (state, data) { state.trendingList = data },
  setTopRatedList (state, data) { state.topRatedList = data },
  setRecentList (state, data) { state.recentList = data },
  setDvdInfo (state, data) { state.dvdInfo = data },
  setInvoiceList (state, data) { state.invoiceList = data },
  setSimiliarDvds (state, data) { state.similiarDvds = data },
  setVerticalMenu (state, data) { state.verticalMenu = data }
}
