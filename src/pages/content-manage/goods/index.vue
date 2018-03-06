<template>
  <div class="goods-container">
    <div class="top-content">
      <el-button type="primary" @click="toAddGoods">添加商品</el-button>
    </div>
    <div class="main-content">
      <l-table :fields="fields"
               :list="list"
               :operate-type="7"
               @handleOperate="handleOperate">
      </l-table>
    </div>

    <opt-dialog ref="goodsDialog"
      :type="type"
      :values="values"
      :fields="dialogFields"
      @commit="commit">
    </opt-dialog>
  </div>
</template>

<script>
import { createFields } from '@/utils/fields'
import { getGoodsList, deleteGoods, updateGoods, addGoods } from '@/api'
import { getFields } from '@/utils/goods-fields'
import LTable from 'components/tables'
import optDialog from 'components/dialogs/opt'
export default {
  components: {
    LTable,
    optDialog
  },
  data () {
    return {
      list: [],
      fields: [
        ...createFields(['title', 'desc', 'price']),
        {
          prop: 'types',
          label: '类型',
          width: '200',
          slot: true
        }
      ],
      dialogFields: getFields(['title', 'desc', 'types', 'price']),
      values: {},
      type: 'add',
      _id: 0,
      addMethod: addGoods,
      editMethod: updateGoods
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
        'view': null,
        'delete': this.toDeleteGoods
      }
      console.log(item)
      typeof obj[type] === 'function' && obj[type](item)
    },
    toAddGoods () {
      this.values = {}
      this.type = 'add'
      this.$refs.goodsDialog.show()
    },
    toEditGoods (item) {
      console.log(item)
      this.values = item
      // this.values.typeLabels = this.values.typeLabels.split(',')
      console.log('toEdit: ', this.values)
      this.type = 'edit'
      this._id = item._id
      this.$refs.goodsDialog.show()
    },
    async toDeleteGoods (item) {
      try {
        await deleteGoods(item)
        this.getList()
      } catch (err) {
        throw err
      }
    },
    async commit (data) {
      if (this.type === 'add') {
        await this.addMethod(data)
      } else if (this.type === 'edit') {
        data._id = this._id
        await this.editMethod(data)
      }
      this.$refs.goodsDialog.hidden()
      this.getList()
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
