<template>
  <div class="goods-container">
    <div class="top-content">
      <el-button type="primary" @click="toAddGoods">添加商品</el-button>
    </div>
    <div class="main-content">
      <l-table :fields="fields"
               :list="list"
               :operate-type="7"
               @handleOperate="handleOperate"></l-table>
    </div>

    <goods-dialog ref="goodsDialog" :type="type" :values="values"></goods-dialog>
  </div>
</template>

<script>
import { createFields } from '@/utils/fields'
import { getGoodsList } from '@/api'
import LTable from 'components/tables'
import goodsDialog from 'components/dialogs/goods'
export default {
  components: {
    LTable,
    goodsDialog
  },
  data () {
    return {
      list: [],
      fields: createFields(['title', 'desc', 'price']),
      values: {},
      type: 'add'
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        let res = await getGoodsList()
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
      let obj = {
        'edit': this.toEditGoods,
        'view': null
      }
      console.log(item)
      typeof obj[type] === 'function' && obj[type](type, item)
    },
    toAddGoods () {
      // this.$router.push({ name: 'GoodsAdd' })
      this.values = {}
      this.type = 'add'
      this.$refs.goodsDialog.show()
    },
    toEditGoods (type, item) {
      this.values = item
      this.type = type
      this.$refs.goodsDialog.show()
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
