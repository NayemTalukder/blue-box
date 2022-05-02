<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12">
        <div class="iq-accordion career-style faq-style">
          <iq-card :class="`iq-card iq-accordion-block ${index == 0 ? 'accordion-active' : ''}`" v-for="(item,index) in faqList" :key="index" headerClass="active-faq clearfix" body-class="accordion-details">
            <template v-slot:headerTitle>
              <h4 class="card-title" @click="onCollapse" v-b-toggle="`accordian-${index}`">{{ item.title }}</h4>
            </template>
            <b-collapse :id="`accordian-${index}`" :visible="index == 0 ? true : false" accordion="my-accordion" role="tabpanel" class="accordion-details iq-card-body">
              <p class="mb-0 p-0">{{ item.description }} </p>
            </b-collapse>
          </iq-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../config'

export default {
  name: 'AboutUs',
  mounted () {
    core.index()
  },
  data () {
    return {
      faqList: [
        {
          title: 'Who Are We ?',
          description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.',
          active: false
        },
        {
          title: 'What is Our Purpose ?',
          description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.',
          active: false
        },
        {
          title: 'What is BlueBox ?',
          description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.',
          active: false
        },
        {
          title: 'Why do You Need it ?',
          description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.',
          active: false
        },
        {
          title: 'Our Goals ?',
          description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.',
          active: false
        },
        {
          title: 'Our Vision ?',
          description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.',
          active: false
        }
      ]
    }
  },
  methods: {
    onCollapse (e) {
      let activeEl = document.getElementsByClassName('accordion-active')[0]
      activeEl.classList.remove('accordion-active')
      let el = e.target.closest('.iq-accordion-block')
      el.classList.add('accordion-active')
    }
  }
}
</script>
