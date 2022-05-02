export default {
  miniSidebarAction (context, payload) {
    return new Promise((resolve, reject) => {
      if (context.state.miniSidebarMenu) {
        context.commit('miniSidebarCommit', false)
        resolve(false)
      } else {
        context.commit('miniSidebarCommit', true)
        resolve(true)
      }
    })
  },
  resetStateAction (context) { context.commit('resetState') },
  setModalStateAction (context, payload) {
    const modalState = {
      visible: payload[0] || false,
      title: payload[1] || '',
      body: payload[2] || '',
      okTitle: payload[3] || 'Ok',
      okOnly: payload[4] === false ? payload[4] : true
    }
    context.commit('setModalState', modalState)
  },
  setAuthAction (context, payload) { context.commit('setAuth', payload) },
  setUserAction (context, payload) { context.commit('setUser', payload) },
  setGenreListAction (context, payload) { context.commit('setGenreList', payload) },
  setOfferListAction (context, payload) { context.commit('setOfferList', payload) },
  setOfferSliderListAction (context, payload) { context.commit('setOfferSliderList', payload) },
  setTrendingListAction (context, payload) { context.commit('setTrendingList', payload) },
  setTopRatedListAction (context, payload) { context.commit('setTopRatedList', payload) },
  setRecentListAction (context, payload) { context.commit('setRecentList', payload) },
  setDvdInfoAction (context, payload) { context.commit('setDvdInfo', payload) },
  setSimiliarDvdsAction (context, payload) { context.commit('setSimiliarDvds', payload) },
  setInvoiceListAction (context, payload) { context.commit('setInvoiceList', payload) },
  setVerticalMenuAction (context, payload) { context.commit('setVerticalMenu', payload) }
}
