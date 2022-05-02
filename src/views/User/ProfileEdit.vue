<template>
  <div class="row">
    <CustomAlert v-if="$route.name === 'profile'" />
    <div class="col-lg-12">
      <div class="iq-edit-list-data">
        <div class="tab-content">
          <div class="tab-pane fade active show" id="personal-information" role="tabpanel">
            <div class="iq-card">
              <div class="iq-card-header d-flex justify-content-between">
                <div class="iq-header-title">
                  <h4 class="card-title">Personal Information</h4>
                </div>
              </div>
              <div v-if="user" class="iq-card-body">
                <form>
                  <div class="row align-items-center">
                    <div class="form-group col-sm-6">
                      <label for="email">Email:</label>
                      <input disabled type="text" class="form-control" id="fname" :placeholder="user.email">
                    </div>
                    <div class="form-group col-sm-6">
                      <label for="uname">User Name:</label>
                      <input v-model="user_name" type="text" class="form-control" id="lname" :placeholder="user.name">
                    </div>
                  </div>

                  <div class="row align-items-center">
                    <div class="form-group col-sm-6">
                      <label for="uname">Phone:</label>
                      <input v-model="phone" type="text" class="form-control" id="uname" :placeholder="user.phone">
                    </div>
                    <div class="form-group col-sm-6">
                      <label for="uname">Date Of Birth:</label>
                      <flat-pickr class="form-control" v-model="birthDate" :placeholder="user.date_of_birth ? user.date_of_birth : 'y / m / d'" ></flat-pickr>
                    </div>
                  </div>
                  <button @click.prevent="onSubmit" type="submit" class="btn btn-primary mr-2">Submit</button>
                  <button @click="onReset" type="reset" class="btn iq-bg-danger">Reset</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { core } from '../../config'
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileEdit',
  mounted () { core.index() },
  computed: {
    ...mapGetters({
      user: 'Main/user'
    })
  },
  data: () => ({
    user_name: '',
    phone: '',
    birthDate: ''
  }),
  methods: {
    onReset () {
      this.user_name = null
      this.phone = null
      this.birthDate = null
    },
    onSubmit () {
      const feedback = core.updateUserInfo(this.user_name, this.phone, this.birthDate)
      feedback.then(result => { if (result) this.$router.go(); this.onReset() })
    }
  }
}
</script>
