import Vue from 'vue'
import VueRouter from 'vue-router'
/* Layouts */
const VerticleLayout = () => import('../layouts/VerticleLayout')

/* Main View */
const Home = () => import('../views/Main/home')
const SignIn = () => import('../views/AuthPages/Default/SignIn')
const SignUp = () => import('../views/AuthPages/Default/SignUp')
const Display = () => import('../views/Main/display')
const dvdDetails = () => import('../views/Main/dvdDetails')

/* Layouts */
const Invoice = () => import('../views/User/invoice')
const ProfileEdit = () => import('../views/User/ProfileEdit')

/* Settings */
const PrivacyPolicy = () => import('../views/Settings/PrivacyPolicy')
const TermsOfService = () => import('../views/Settings/TermsOfService')
const AboutUs = () => import('../views/Settings/AboutUs')
Vue.use(VueRouter)

const childRoutes = () => [
  {
    path: '/',
    name: 'Home',
    meta: { auth: false, name: 'Home' },
    component: Home
  },
  {
    path: 'sign-in',
    name: 'SignIn',
    meta: { auth: false, name: 'Sign In' },
    component: SignIn
  },
  {
    path: 'sign-up',
    name: 'SignUp',
    meta: { auth: false, name: 'Sign Up' },
    component: SignUp
  },
  {
    path: 'dvd/:title',
    name: 'dvd',
    meta: { auth: false, name: 'Dvd Info' },
    component: dvdDetails
  },
  {
    path: 'genre/:title',
    name: 'genre',
    meta: { auth: false, name: 'DVDs by Genre' },
    component: Display
  },
  {
    path: 'offer/:title',
    name: 'offer',
    meta: { auth: false, name: 'offer' },
    component: Display
  },
  {
    path: 'view-more/:title',
    name: 'viewMore',
    meta: { auth: false, name: 'View More' },
    component: Display
  },
  {
    path: 'invoice',
    name: 'invoice',
    component: Invoice,
    meta: { auth: true, name: 'invoice' }
  },
  {
    path: 'profile',
    name: 'profile',
    component: ProfileEdit,
    meta: { auth: true, name: 'profile' }
  },
  {
    path: 'privacy-policy',
    name: 'privacy-policy',
    component: PrivacyPolicy,
    meta: { auth: false, name: 'Privacy Policy' }
  },
  {
    path: 'terms-of-service',
    name: 'terms-of-service',
    component: TermsOfService,
    meta: { auth: false, name: 'Terms Of Service' }
  },
  {
    path: 'about-us',
    name: 'about-us',
    component: AboutUs,
    meta: { auth: false, name: 'About Us' }
  }
]
const routes = [
  {
    path: '/',
    component: VerticleLayout,
    children: childRoutes()
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  scrollBehavior () {
    return window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

export default router
