<template>
  <div class="goods-container">
    <div class="top-content">
      <el-button type="primary">添加商品</el-button>
    </div>
    <div class="main-content">
      <l-table></l-table>
    </div>
  </div>
</template>

<script>
import { getGoodsList } from '@/api'
import LTable from 'components/tables'
export default {
  components: {
    LTable
  },
  data () {
    return {
      list: [],
      fields: []
    }
  },
  created () {

  },
  methods: {
    async getList () {
      await getGoodsList()
    }
  }
}
</script>

<style lang="scss">
.goods-container {
  .top-content {

  }
}
</style>
