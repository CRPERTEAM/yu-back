<template>
  <el-dialog :title="fullTitle" :visible.sync="visible">
    <l-form ref="form" :fields="fields" :values="values" v-if="formVisible"></l-form>
    <el-button-group>
      <el-button type="primary" @click.native="commit">提交</el-button>
      <el-button @click.native="cancel">取消</el-button>
    </el-button-group>
  </el-dialog>
</template>

<script>
import LForm from 'components/forms'
import { getFields } from '@/utils/goods-fields'
import { getGoodsTypeList, addGoods, updateGoods } from '@/api'
export default {
  components: {
    LForm
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    // 如果传递了value则说明是修改的表单，可以考虑写入mixins
    values: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: 'add',
      validator: (value) => {
        return ['add', 'edit'].indexOf(value) > -1
      }
    }
  },
  data () {
    return {
      // 返回的是一个map，约束了一些常用字段
      fields: getFields(['title', 'desc', 'typeIds', 'price']),
      visible: false,
      formVisible: false,
      typeAssociationObj: {
        edit: {
          title: '编辑',
          method: updateGoods
        },
        add: {
          title: '添加',
          method: addGoods
        }
      }
    }
  },
  computed: {
    fullTitle () {
      return this.title + this.typeAssociationObj[this.type].title
    }
  },
  watch: {
    'visible' (newVal) {
      if (newVal) {
        this.formVisible = newVal
      } else {
        // 配合dialog的动画
        setTimeout(() => {
          this.formVisible = newVal
        }, 500)
      }
    }
  },
  mounted () {
    // this.getTypes()
    this.getSelectOptions()
  },
  methods: {
    // 给typeIds添加options
    async getTypes () {
      try {
        let res = await getGoodsTypeList()
        console.log(res)
        this.fields.get('typeIds').options = Object.assign({}, res.data)
      } catch (err) {
        throw err
      }
    },
    getSelectOptions (item, key) {
      this.fields.forEach(async (value, key) => {
        console.log('get value: ', value)
        if (value.method && typeof value.method === 'function') {
          try {
            let res = await value.method()
            this.fields.get(key).options = Object.assign({}, res.data)
            console.log('getSelectOptions: ', this.fields)
          } catch (err) {
            throw err
          }
        }
      })
    },
    show () {
      this.visible = true
    },
    cancel () {
      this.visible = false
    },
    async commit () {
      let data = this.$refs.form.getFormDatas()
      console.log('commit: ', data)
      try {
        if (this.type !== 'add') {
          data._id = this.values._id
        }
        let res = await this.typeAssociationObj[this.type].method(data)
        this.$emit('success', res.data)
        this.visible = false
      } catch (err) {
        throw err
      }
      // 根据type类型进行提交操作
    }
  }
}
</script>

<style lang="scss">

</style>
