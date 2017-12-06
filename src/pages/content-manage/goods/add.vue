<template>
  <div class="goods-container">
    <l-form :datas="datas">

    </l-form>
  </div>
</template>

<script>
import LForm from 'components/forms'
// import { createFields } from '@/utils/fields'
// import rules from '@/utils/rules'
export default {
  components: {
    LForm
  },
  data () {
    return {
      datas: this.initMap({
        title: {
          label: '标题',
          value: '',
          type: 'input',
          rule: {}
        },
        desc: {
          label: '描述',
          value: '',
          type: 'textarea',
          rule: {}
        }
      })
    }
  },
  created () {
    this.$nextTick(() => {
      console.log(this.fields)
    })
  },
  methods: {
    initMap (datas) {
      let map = new Map()
      Object.keys(datas).forEach((key) => {
        map.set(key, datas[key])
      })
      return map
    }
  }
}
</script>

<style lang="scss">

</style>
