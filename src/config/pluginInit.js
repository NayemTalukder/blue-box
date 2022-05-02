/* eslint-disable no-undef */
import { firestore } from './firebase_init'
import Scrollbar from 'smooth-scrollbar'
import Store from '../store/index'
const $ = require('jquery')
if (typeof window !== 'undefined') {
  window.$ = $
  window.jQuery = $
  require('bootstrap/js/src/tab')
}

export const APPNAME = 'BlueBox'

export const core = {
  index () {
    this.loaderInit()
    this.activeRoute()
    this.SmoothScrollbar()
    this.Accordian()
  },
  mainIndex () {
    this.ripple()
    this.fullscreen()
    this.navBarAction()
    this.AccordianInit()
    this.fixedHeader()
  },
  loaderInit () {
    let load = document.getElementById('loading')
    animation.fadeOut(load, { duration: 0 })
    animation.fadeOut(load, { duration: 2000 })
    setTimeout(() => {
      load.classList.add('d-none')
    }, 2000)
    // $('#loading').delay(1000).fadeOut('slow')
  },
  activeRoute () {
    if (window.innerWidth < 1500) {
      let wrapperMenu = document.querySelector('.wrapper-menu')
      if (wrapperMenu) {
        wrapperMenu.classList.remove('open')
        document.querySelector('body').classList.remove('sidebar-main')
      }
    }
  },
  fixedHeader () {
    $(window).scroll(function () {
      if ($(window).scrollTop() >= 75) {
        $('.iq-top-navbar').addClass('fixed-header')
      } else {
        $('.iq-top-navbar').removeClass('fixed-header')
      }
    })
  },
  ripple () {
    $(document).on('click', '.iq-waves-effect', function (e) {
      // Remove any old one
      $('.ripple').remove()
      // Setup
      let posX = $(this).offset().left
      let posY = $(this).offset().top
      let buttonWidth = $(this).width()
      let buttonHeight = $(this).height()

      // Add the element
      $(this).prepend("<span class='ripple'></span>")

      // Make it round!
      if (buttonWidth >= buttonHeight) {
        buttonHeight = buttonWidth
      } else {
        buttonWidth = buttonHeight
      }

      // Get the center of the element
      let x = e.pageX - posX - buttonWidth / 2
      let y = e.pageY - posY - buttonHeight / 2

      // Add the ripples CSS and start the animation
      $('.ripple').css({
        width: buttonWidth,
        height: buttonHeight,
        top: y + 'px',
        left: x + 'px'
      }).addClass('rippleEffect')
    })
  },

  fullscreen () {
    const elementExist = this.checkElement('class', 'iq-full-screen')
    if (elementExist) {
      $(document).on('click', '.iq-full-screen', function () {
        let elem = $(this)
        if (!document.fullscreenElement &&
          !document.mozFullScreenElement &&
          !document.webkitFullscreenElement &&
          !document.msFullscreenElement) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen()
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
          } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
          }
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        }
        elem.find('i').toggleClass('ri-fullscreen-line').toggleClass('ri-fullscreen-exit-line')
      })
    }
  },
  triggerSet () {
    const elementExist = this.checkElement('class', 'wrapper-menu')
    if (elementExist) {
      let wrapperMenu = document.querySelector('.wrapper-menu')
      let body = document.querySelector('body')
      this.sidebarMiniSetEvent(wrapperMenu, body)
      /* for (let i = 0; i < wrapperMenu.length; i++) {
      } */
    }
  },
  sidebarMiniSetEvent (element, target) {
    element.classList.toggle('open')
    target.classList.toggle('sidebar-main')
  },
  checkClass (ele, type, className) {
    switch (type) {
      case 'addClass':
        if (!ele.hasClass(className)) {
          ele.addClass(className)
        }
        break
      case 'removeClass':
        if (ele.hasClass(className)) {
          ele.removeClass(className)
        }
        break
      case 'toggleClass':
        ele.toggleClass(className)
        break
    }
  },

  navBarAction () {
    $(document).on('click', '.iq-sub-dropdown', function (e) {
      e.stopPropagation()
    })
    $(document).on('click', function (e) {
      let myTargetElement = e.target
      let selector, mainElement
      if ($(myTargetElement).hasClass('search-toggle') || $(myTargetElement).parent().hasClass('search-toggle') || $(myTargetElement).parent().parent().hasClass('search-toggle')) {
        if ($(myTargetElement).hasClass('search-toggle')) {
          selector = $(myTargetElement).parent()
          mainElement = $(myTargetElement)
        } else if ($(myTargetElement).parent().hasClass('search-toggle')) {
          selector = $(myTargetElement).parent().parent()
          mainElement = $(myTargetElement).parent()
        } else if ($(myTargetElement).parent().parent().hasClass('search-toggle')) {
          selector = $(myTargetElement).parent().parent().parent()
          mainElement = $(myTargetElement).parent().parent()
        }
        if (!mainElement.hasClass('active') && $('.navbar-list li').find('.active')) {
          $('.navbar-list li').removeClass('iq-show')
          $('.navbar-list li .search-toggle').removeClass('active')
        }

        selector.toggleClass('iq-show')
        mainElement.toggleClass('active')

        e.preventDefault()
      } else if ($(myTargetElement).is('.search-input')) {} else {
        $('.navbar-list li').removeClass('iq-show')
        $('.navbar-list li .search-toggle').removeClass('active')
      }
    })
  },

  checkElement (type, element) {
    let found = false
    let elements
    switch (type) {
      case 'class':
        elements = document.getElementsByClassName(element)
        if (elements !== undefined && elements !== null && elements.length > 0) {
          found = true
        }
        break

      case 'id':
        elements = document.getElementById(element)

        if (elements !== undefined && elements !== null) {
          found = true
        }
        break
    }
    return found
  },

  SmoothScrollbar () {
    const elementExistMain = this.checkElement('id', 'sidebar-scrollbar')
    if (elementExistMain) {
      Scrollbar.init(document.querySelector('#sidebar-scrollbar'))
    }
  },

  Accordian () {
    $('.iq-accordion .iq-accordion-block .accordion-details').hide()
    $('.iq-accordion .iq-accordion-block:first').addClass('accordion-active').children().slideDown('slow')
  },

  AccordianInit () {
    $(document).on('click', '.iq-accordion .iq-accordion-block', function () {
      if ($(this).children('div.accordion-details ').is(':hidden')) {
        $('.iq-accordion .iq-accordion-block').removeClass('accordion-active').children('div.accordion-details ').slideUp('slow')
        $(this).toggleClass('accordion-active').children('div.accordion-details ').slideDown('slow')
      }
    })
  },

  getActiveLink (item, activeRoute) {
    let active = false
    if (item.children !== undefined) {
      item.children.filter(function (child) {
        if (child.link.name === activeRoute) {
          active = true
        }
        if (child.children !== undefined) {
          child.children.filter(function (inChild) {
            if (inChild.link.name === activeRoute) {
              active = true
            }
          })
        }
      })
    } else {
      if (item.link.name === activeRoute) {
        active = true
      }
    }
    return active
  },
  // Initial Data Handling Start
  async setInitialUserState (user, name, email) {
    let val = true; Store.dispatch('Main/setAuthAction', true)
    await firestore.collection('Customer').doc(user.uid).get().then(snap => { if (snap.exists) val = false })
    if (val) firestore.collection('Customer').doc(user.uid).set({ uid: user.uid, name, email: email || user.email, frequency: 0 })
    sidebar.getNavigationOptions()
  },
  async fetchUserInfo (user) {
    firestore.collection('Customer').doc(user.uid).get().then(snap => {
      let userInfo = { uid: user.uid, email: user.email, name: user.displayName }
      if (snap.exists) {
        userInfo = { ...userInfo, email: snap.data().email, name: snap.data().name, frequency: snap.data().frequency }
      }
      Store.dispatch('Main/setUserAction', userInfo)
    })
  },
  async fetchInitialData () {
    await this.fetchInitial('Genre', 'frequency', 'desc')
    await this.fetchInitial('Offer', 'off', 'desc')
    await this.fetchInitial('Dvd', 'published', 'desc')
    await this.fetchInitial('Dvd', 'rating', 'desc')
    await this.fetchInitial('Dvd', 'frequency', 'desc')
    sidebar.getNavigationOptions()
    const promises = []
    for (let i = 0; i < Store.getters['Main/offerList'].length; i++) {
      promises.push(new Promise(resolve => {
        const offer = Store.getters['Main/offerList'][i]
        firestore.collection('Dvd').where('offer_code', '==', offer.code).get().then((snap) => {
          if (!snap.empty) {
            const data = []; snap.forEach((doc) => data.push(doc.data()))
            resolve({ name: offer.name, array: data })
          }
        })
      }))
    }
    Promise.all(promises).then((values) => {
      Store.dispatch('Main/setOfferSliderListAction', values)
    })
  },
  async fetchInitial (collection, field, sort) {
    let ref = firestore.collection(collection).orderBy(field || 'name', sort || 'asc')
    await ref.get().then((snap) => {
      const data = []; snap.forEach((doc) => data.push({ ...doc.data(), docId: doc.id }))
      if (collection === 'Genre') Store.dispatch('Main/setGenreListAction', data)
      else if (collection === 'Offer') Store.dispatch('Main/setOfferListAction', data)
      else if (field === 'published') Store.dispatch('Main/setRecentListAction', data)
      else if (field === 'rating') Store.dispatch('Main/setTrendingListAction', data)
      else if (field === 'frequency') Store.dispatch('Main/setTopRatedListAction', data)
    })
  },
  // Initial Data Handling End
  //  Fetch Dvd Info Start
  async fetchDvdInfo (title) {
    Store.dispatch('Main/setDvdInfoAction', null)
    Store.dispatch('Main/setSimiliarDvdsAction', null)
    let data = null
    await this.fetchDvdInfoExtended('Dvd', 'title', title, null).then(snap => (data = snap[0]))
    await this.fetchDvdInfoExtended('Dvd', 'Genre', null, data.Genre).then(snap => (Store.dispatch('Main/setSimiliarDvdsAction', snap)))
    await this.fetchDvdInfoExtended('Kiosk', 'dvd_title', title).then(snap => (data = { ...data, ...snap[0] }))
    await this.fetchDvdInfoExtended('Offer', 'code', data.offer_code).then(snap => (data = { ...data, ...snap[0] }))
    if (Store.getters['Main/auth']) {
      await firestore.collection('RentedDvd')
        .where('customer_uid', '==', Store.getters['Main/user'].uid)
        .where('dvd_title', '==', data.title)
        .where('status', '==', 'pending').limit(1).get().then(snap => {
          if (!snap.empty) {
            const doc = snap.docs[0].data()
            let timeStamp = doc.rent_date + (doc.rent_period * 24 * 60 * 60 * 1000)
            timeStamp = timeStamp - doc.rent_date
            let daysLeft = timeStamp / (1000 * 60 * 60 * 24)
            data = {
              ...data,
              fees: doc.fees,
              status: doc.status,
              rent_date: doc.rent_date,
              rent_period: doc.rent_period,
              days_left: daysLeft,
              rentedDvdUid: snap.docs[0].id
            }
            Store.dispatch('Main/setDvdInfoAction', data)
          } else Store.dispatch('Main/setDvdInfoAction', data)
        })
    } else Store.dispatch('Main/setDvdInfoAction', data)
  },
  async fetchDvdInfoExtended (col, field, title, array, docId) {
    return firestore.collection(col).where(field, array ? 'array-contains-any' : '==', array || title)
      .limit(array ? 20 : 1).get().then(snap => {
        const data = []
        if (col === 'Dvd') snap.docs.forEach(e => data.push({ ...e.data(), uid: e.id }))
        if (col === 'Kiosk') snap.docs.forEach(e => data.push({ ...e.data(), kioskUid: e.id }))
        else snap.docs.forEach(e => data.push(e.data()))
        if (!snap.empty) return data
        else return null
      })
  },
  //  Fetch Dvd Info Start
  // Renting Process Start
  async onclickRent (dvdInfo, rent, days, kiosk) {
    await this.updateRentedDvd(dvdInfo, rent, days)
    await this.updateDoc('Customer', Store.getters['Main/user'], 'setUserAction')
    await this.updateDoc('Dvd', dvdInfo, 'setDvdInfoAction', kiosk)
    await this.findThenUpdateDoc('Kiosk', 'dvd_title', dvdInfo.title, null, kiosk)
    await this.findThenUpdateDoc('Genre', 'name', null, dvdInfo.Genre)
    await this.fetchInitial('Genre', 'frequency', 'desc')
  },
  async findThenUpdateDoc (col, field, title, array, kiosk) {
    firestore.collection(col).where(field, array ? 'in' : '==', array || title).get().then(snap => {
      if (!snap.empty) {
        snap.docs.forEach(e => {
          if (col === 'Genre') {
            this.updateDoc('Genre', { ...e.data(), uid: e.id })
          } else if (col === 'Kiosk') {
            firestore.collection('Kiosk').doc(e.id).update({
              kiosk_east: kiosk === 'Kiosk East' ? e.data().kiosk_east - 1 : e.data().kiosk_east,
              kiosk_west: kiosk === 'Kiosk West' ? e.data().kiosk_west - 1 : e.data().kiosk_west,
              kiosk_north: kiosk === 'Kiosk North' ? e.data().kiosk_north - 1 : e.data().kiosk_north,
              kiosk_south: kiosk === 'Kiosk South' ? e.data().kiosk_south - 1 : e.data().kiosk_south
            })
          }
        })
      }
    })
  },
  async updateDoc (col, doc, action, kiosk) {
    const frequency = doc.frequency + 1
    firestore.collection(col).doc(doc.uid).update({ frequency })
    if (action) {
      if (kiosk) {
        Store.dispatch(`Main/${action}`, {
          ...doc,
          frequency,
          kiosk_east: kiosk === 'Kiosk East' ? doc.kiosk_east - 1 : doc.kiosk_east,
          kiosk_west: kiosk === 'Kiosk West' ? doc.kiosk_west - 1 : doc.kiosk_west,
          kiosk_north: kiosk === 'Kiosk North' ? doc.kiosk_north - 1 : doc.kiosk_north,
          kiosk_south: kiosk === 'Kiosk South' ? doc.kiosk_south - 1 : doc.kiosk_south
        })
      } else Store.dispatch(`Main/${action}`, { ...doc, frequency })
    }
  },
  async updateRentedDvd (dvdInfo, rent, days) {
    firestore.collection('RentedDvd').add({
      customer_uid: Store.getters['Main/user'].uid,
      dvd_title: dvdInfo.title,
      image_url: dvdInfo.image_url,
      fees: rent,
      late_fees: 0,
      rent_date: Date.now(),
      rent_period: days,
      return_date: null,
      status: 'pending'
    })
  },
  // Renting Process End
  // Return Process Start
  async onclickReturn (dvdInfo, lateFee, lateReturn, kiosk) {
    await firestore.collection('RentedDvd').doc(dvdInfo.rentedDvdUid).update({
      return_date: Date.now(),
      fees: dvdInfo.fees + lateFee,
      late_fees: lateFee,
      late_return: lateReturn > 0 ? lateReturn : 0,
      status: 'clear'
    })
    if (kiosk === 'Kiosk East') this.checkKoskAvailability(dvdInfo, dvdInfo.kiosk_east)
    else if (kiosk === 'Kiosk West') this.checkKoskAvailability(dvdInfo, dvdInfo.kiosk_west)
    else if (kiosk === 'Kiosk North') this.checkKoskAvailability(dvdInfo, dvdInfo.kiosk_north)
    else if (kiosk === 'Kiosk South') this.checkKoskAvailability(dvdInfo, dvdInfo.kiosk_south)
  },
  async checkKoskAvailability (dvdInfo, value) {
    if (value < 4) {
      await this.updateKiosk(dvdInfo, value)
      this.fetchDvdInfo(dvdInfo.title)
    } else {
      await this.updateKiosk(dvdInfo, null)
      this.fetchDvdInfo(dvdInfo.title)
    }
  },
  async updateKiosk (dvdInfo, matched) {
    const ref = firestore.collection('Kiosk').doc(dvdInfo.kioskUid)
    let minimum = null
    if (matched) minimum = matched
    else {
      Array.min = function (array) {
        return Math.min.apply(Math, array)
      }
      minimum = Array.min([dvdInfo.kiosk_east, dvdInfo.kiosk_west, dvdInfo.kiosk_north, dvdInfo.kiosk_south])
    }

    if (minimum === dvdInfo.kiosk_east) ref.update({ kiosk_east: dvdInfo.kiosk_east + 1 })
    else if (minimum === dvdInfo.kiosk_west) ref.update({ kiosk_west: dvdInfo.kiosk_west + 1 })
    else if (minimum === dvdInfo.kiosk_north) ref.update({ kiosk_north: dvdInfo.kiosk_north + 1 })
    else if (minimum === dvdInfo.kiosk_south) ref.update({ kiosk_south: dvdInfo.kiosk_south + 1 })
  },
  // Return Process End
  // Fetch Displayed Dvds Start
  async fetchDisplayedDvds (value) {
    return firestore.collection('Dvd').where('Genre', 'array-contains', value).get().then(snap => {
      const Dvds = []; snap.forEach(doc => Dvds.push(doc.data())); return Dvds
    })
  },
  // Fetch Displayed Dvds End
  //  Handle User Start
  async updateUserInfo (name, phone, birthDate) {
    return firestore.collection('Customer').doc(Store.getters['Main/user'].uid).update({ name, phone, birthDate }).then(() => {
      Store.dispatch('Main/setUserAction', { ...Store.getters['Main/user'], name, phone, birthDate })
      Store.dispatch('Main/setModalStateAction', [true, 'Success !', 'Personal Info updated', 'Ok'])
    }).catch(() => Store.dispatch('Main/setModalStateAction', [true, 'Warning !', 'Something went wrong', 'Ok']))
  },
  async getInvoice (type) {
    let ref = firestore.collection('RentedDvd').where('customer_uid', '==', Store.getters['Main/user'].uid)
    if (type === 'lastMonth') {
      const timeStamp = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)).getTime()
      ref = ref.where('rent_date', '>=', timeStamp)
    }
    ref.orderBy('rent_date').get().then(snap => {
      const data = []; snap.forEach((doc) => data.push({ ...doc.data(), docId: doc.id }))
      Store.dispatch('Main/setInvoiceListAction', data)
    })
  }
  //  Handle User End
}

export const animation = {
  easing: {
    linear: function (progress) {
      return progress
    },
    quadratic: function (progress) {
      return Math.pow(progress, 2)
    },
    swing: function (progress) {
      return 0.5 - Math.cos(progress * Math.PI) / 2
    },
    circ: function (progress) {
      return 1 - Math.sin(Math.acos(progress))
    },
    back: function (progress, x) {
      return Math.pow(progress, 2) * ((x + 1) * progress - x)
    },
    bounce: function (progress) {
      // eslint-disable-next-line no-unused-vars
      for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (progress >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2)
        }
      }
    },
    elastic: function (progress, x) {
      return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress)
    }
  },
  animate: function (options) {
    let start = new Date()
    let id = setInterval(function () {
      let timePassed = new Date() - start
      let progress = timePassed / options.duration
      if (progress > 1) {
        progress = 1
      }
      options.progress = progress
      let delta = options.delta(progress)
      options.step(delta)
      if (progress === 1) {
        clearInterval(id)
      }
    }, options.delay || 10)
  },
  fadeOut: function (element, options) {
    let to = 1
    this.animate({
      duration: options.duration,
      delta: function (progress) {
        progress = this.progress
        return animation.easing.swing(progress)
      },
      step: function (delta) {
        element.style.opacity = to - delta
      }
    })
  },
  fadeIn: function (element, options) {
    let to = 0
    this.animate({
      duration: options.duration,
      delta: function (progress) {
        progress = this.progress
        return animation.easing.swing(progress)
      },
      step: function (delta) {
        element.style.opacity = to + delta
      }
    })
  }
}

export const flatpickerSetting = {
  wrap: true,
  altFormat: 'j M Y',
  altInput: true,
  dateFormat: 'Y-m-d'
}

export const sidebar = {
  getChildrenArray (array, type) {
    const returnArray = []; let link = ''
    array.forEach((e) => {
      if (type === 'genre') link = `/genre/${e.name.replaceAll(/\s+/g, '-').replaceAll('%', '%25')}`
      else if (type === 'offer') link = `/offer/${e.name.replaceAll(/\s+/g, '-').replaceAll('%', '%25')}`
      const obj = { title: e.name, name: e.name, is_active: false, link }; returnArray.push(obj)
    })
    return returnArray
  },

  getMletenuItem (name, url, children) {
    const returnObj = {
      title: name,
      name: name.replaceAll(/\s+/g, '-'),
      is_heading: false,
      is_active: false,
      link: `/${url}`,
      is_icon_class: true,
      icon: 'fas fa-compact-disc'
    }
    if (children) return { ...returnObj, children }
    else return returnObj
  },

  async getNavigationOptions () {
    const genreChildren = this.getChildrenArray(Store.getters['Main/genreList'], 'genre')
    const offerChildren = this.getChildrenArray(Store.getters['Main/offerList'], 'offer')
    const Genre = this.getMletenuItem('Genre', '', genreChildren)
    const Offers = this.getMletenuItem('Offers', '', offerChildren)
    const Invoice = this.getMletenuItem('Invoice', 'invoice')
    const Profile = this.getMletenuItem('Profile', 'profile')
    const AboutUs = this.getMletenuItem('About Us', 'about-us')
    let options = []
    if (Store.getters['Main/auth']) options = [ Genre, Offers, Invoice, Profile, AboutUs ]
    else options = [ Genre, Offers, AboutUs ]
    Store.dispatch('Main/setVerticalMenuAction', options)
  }
}
