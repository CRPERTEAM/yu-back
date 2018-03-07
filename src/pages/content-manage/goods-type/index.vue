<template>
  <div class="goods-container">
    <div class="top-content">
      <el-button type="primary" @click="toAddGoodsType">添加类型</el-button>
    </div>
    <div class="main-content">
      <l-table :fields="fields"
               :list="list"
               :operate-type="7"
               @handleOperate="handleOperate"></l-table>
    </div>

    <l-opt-dialog ref="goodsTypeDialog"
      :type="type"
      :values="values"
      :fields="dialogFields"
      @commit="commit">
    </l-opt-dialog>
  </div>
</template>

<script>
import { getGoodsTypeList, addGoodsType, updateGoodsType, deleteGoodsType } from '@/api'
import { obj2map } from '@/utils/common'
import LTable from 'components/tables'
import LOptDialog from 'components/dialogs/opt'

export default {
  components: {
    LTable,
    LOptDialog
  },
  data () {
    return {
      list: [],
      fields: [
        {
          prop: '_id',
          label: '编号'
        },
        {
          prop: 'label',
          label: '类别'
        }
      ],
      dialogFields: obj2map({
        label: {
          type: 'input',
          label: '类型字面值'
        },
        value: {
          type: 'input',
          label: '类型值'
        }
      }),
      values: {},
      type: 'add',
      addMethod: addGoodsType,
      editMethod: updateGoodsType
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
      const obj = {
        'edit': this.toEditGoodsType,
        'view': null,
        'delete': this.deleteGoodsType
      }
      typeof obj[type] === 'function' && obj[type](item)
    },
    toAddGoodsType () {
      this.value = {}
      this.type = 'add'
      this.$refs.goodsTypeDialog.show()
    },
    toEditGoodsType (item) {
      this.values = item
      this.type = 'edit'
      this.$refs.goodsTypeDialog.show()
    },
    async toDeleteGoodsType (item) {
      await deleteGoodsType(item)
      this.getList()
    },
    async commit (data) {
      if (this.type === 'add') {
        await this.addMethod(data)
      } else if (this.type === 'edit') {
        data._id = this._id
        await this.editMethod(data)
      }
      this.$refs.goodsTypeDialog.hidden()
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
