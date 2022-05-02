<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
          <iq-card>
              <template v-slot:headerTitle>
                  <h4 class="card-title">invoice List</h4>
                </template>
                <template v-slot:headerAction>
                <select v-model="invoiceType" class="font-size-16 badge badge-pill badge-success text-dark border-success w-100 cursor-pointer" >
                  <option value="all">All</option>
                  <option value="lastMonth">Last Month</option>
                </select>
                </template>
            <template v-slot:body>
                <div class="table-responsive">
                  <table class="data-tables table table-striped table-bordered" style="width:100%">
                    <thead>
                        <tr>
                            <th style="width: 3%;">No</th>
                            <th style="width: 7%;">Dvd Image</th>
                            <th style="width: 15%;">Dvd Name</th>
                            <th style="width: 7%;">Total Fees</th>
                            <th style="width: 7%;">Late Fees</th>
                            <th style="width: 7%;">Total Days</th>
                            <th style="width: 10%;">Rent Date</th>
                            <th style="width: 10%;">Return Date</th>
                            <th style="width: 7%;">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr class="text-center" v-for="(invoice, index) in invoiceList" :key="index">
                        <td>{{index+1}}</td>
                        <td><router-link :to="`/dvd/${invoice.dvd_title.replaceAll(/\s+/g, '-').replaceAll('%', '%25')}`"><img class="img-fluid rounded" :src="invoice.image_url" alt=""></router-link></td>
                        <td>{{invoice.dvd_title}}</td>
                        <td>$ {{invoice.fees}}</td>
                        <td>$ {{invoice.late_fees}}</td>
                        <td>{{invoice.rent_period}}</td>
                        <td>{{getFormatedDate(invoice.rent_date)}}</td>
                        <td>{{getFormatedDate(invoice.return_date)}}</td>
                        <td>
                          <i v-if="invoice.status === 'clear'" class="fas fa-check"></i>
                          <i v-if="invoice.status === 'pending'" class="fas fa-exclamation"></i>
                        </td>
                      </tr>
                    </tbody>
                </table>
                </div>
            </template>
          </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../config'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Invoice',
  mounted () {
    core.index()
    if (this.user) core.getInvoice('all')
  },
  computed: {
    ...mapGetters({
      invoiceList: 'Main/invoiceList',
      user: 'Main/user'
    })
  },
  watch: {
    invoiceType (val) {
      this.setInvoiceListAction([])
      if (this.user) core.getInvoice(val)
    },
    user (val) {
      if (val) core.getInvoice('all')
    }
  },
  methods: {
    ...mapActions({
      setInvoiceListAction: 'Main/setInvoiceListAction'
    }),
    getFormatedDate (timeStamp) {
      const date = new Date(timeStamp)
      if (timeStamp) return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
      else return null
    }
  },
  data: () => ({
    invoiceType: 'all'
  })
}
</script>
