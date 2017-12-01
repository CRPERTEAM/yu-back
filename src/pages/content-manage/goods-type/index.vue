<template>
  <div class="goods-container">
    <div class="top-content">
      <el-button type="primary" @click="toAddGoods">添加类型</el-button>
    </div>
    <div class="main-content">
      <l-table :fields="fields"
               :list="list"
               :operate-type="7"
               @handleOperate="handleOperate"></l-table>
    </div>
  </div>
</template>

<script>
import { createFields } from '@/utils/fields'
import { getGoodsTypeList } from '@/api'
import LTable from 'components/tables'
export default {
  components: {
    LTable
  },
  data () {
    return {
      list: [],
      fields: [
        ...createFields(['_id']),
        {
          prop: 'value',
          label: '类别'
        }
      ]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        let res = await getGoodsTypeList()
        this.list = res.data
        console.log(res)
      } catch (err) {
        throw err
      }
    },
    async getNextList () {
      try {
        // let res = await getGoodsList()
      } catch (err) {
        throw err
      }
    },
    handleOperate (type, item) {
      let name = {
        'edit': 'GoodsEdit',
        'view': 'GoodsDetail'
      }
      this.$router.push({ name: name[type] })
      console.log(type, item)
    },
    toAddGoods () {
      this.$router.push({ name: 'GoodsAdd' })
    }
  }
}
</script>

<style lang="scss">
.goods-container {
  .top-content {

  }
  .main-content {
    margin-top: 20px;
  }
}
</style>
