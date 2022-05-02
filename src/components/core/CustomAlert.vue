<template>
  <b-modal :visible="modalState.visible" centered :title="modalState.title" title-class="mx-auto text-capitalize" :ok-only="modalState.okOnly" hide-header-close no-close-on-backdrop :ok-title-html="getOkTitle()" @close="reset" @cancel="reset" @ok="ok" >
      <p v-if="modalState.body" class="text-center">{{modalState.body}}</p>
      <slot name="body"></slot>
  </b-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CustomAlert',
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
      this.$emit('ok')
      this.reset()
    },
    reset () {
      this.setModalStateAction(false)
    },
    getOkTitle () {
      return `<span class='text-dark'>${this.modalState.okTitle}</span>`
    }
  }
}
</script>
