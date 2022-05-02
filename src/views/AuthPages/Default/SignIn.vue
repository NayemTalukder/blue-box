<template>
  <div class="sign-in-from bg-primary rounded">
    <!-- Alert Modal Start -->
    <CustomAlert v-if="$route.name === 'SignIn'" @ok="ok" />
    <!-- Alert Modal End -->
    <h3 class="mb-0 text-center text-white">Sign In</h3>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
      <form class="mt-4 form-text" novalidate @submit.prevent="handleSubmit(onSubmit)">
        <ValidationProvider vid="name" name="Email" rules="required|email" v-slot="{ errors }">
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" v-model="email" :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')"
                  id="email" aria-describedby="emailHelp" placeholder="Enter email">
            <div class="invalid-feedback">
              <span>{{ errors[0] }}</span>
            </div>
          </div>
        </ValidationProvider>
        <ValidationProvider vid="password" name="Password" rules="required" v-slot="{ errors }">
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')"
                  id="password" placeholder="Password">
            <div class="invalid-feedback">
              <span>{{ errors[0] }}</span>
            </div>
          </div>
        </ValidationProvider>
        <div class="sign-info text-center">
            <div v-if="loader" class="loader"></div>
            <button v-if="!loader" type="submit" class="btn btn-white d-block w-100 mb-2">Sign In</button>
            <span class="text-dark dark-color d-inline-block line-height-2">Don't have an account? <router-link to="/sign-up" class="text-white">Register</router-link></span>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { core } from '../../../config'
import Cookies from 'js-cookie'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SignUp',
  data: () => ({
    loader: false,
    email: '',
    password: ''
  }),
  mounted () { core.index() },
  computed: {
    ...mapGetters({
      modalState: 'Main/modalState'
    })
  },
  methods: {
    ...mapActions({
      setModalStateAction: 'Main/setModalStateAction'
    }),
    ok () {
      if (this.modalState.okTitle === 'Back to Home') this.$router.push('/')
      else location.reload()
    },
    onSubmit () {
      this.loader = true
      // eslint-disable-next-line no-undef
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then((snap) => {
          Cookies.remove('isUserSignedIn'); Cookies.set('isUserSignedIn', 'isUserSignedIn', { expires: 30 })
          this.loader = false
          this.setModalStateAction([true, 'Congratulations !', 'You are successfully Logged In.', 'Back to Home'])
          try {
            if (snap.user && !snap.user.isAnonymous) core.setInitialUserState(snap.user, this.name, this.email)
          } catch (error) {
            // console.log(error.code, error.message)
          }
        })
        .catch((error) => {
          this.loader = false
          this.setModalStateAction([true, 'Error !', error.message, 'Retry'])
        })
    }
  }
}
</script>
