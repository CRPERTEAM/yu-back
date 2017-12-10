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
import { getGoodsTypeList } from '@/api'
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
      fields: getFields(['title', 'desc', 'typeId', 'price']),
      visible: false,
      formVisible: false,
      titleAdd: {
        'edit': '编辑',
        'add': '添加'
      }
    }
  },
  computed: {
    fullTitle () {
      return this.title + this.titleAdd[this.type]
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
    this.getTypes()
  },
  methods: {
    // 给typeId添加options
    async getTypes () {
      try {
        let res = await getGoodsTypeList()
        console.log(res)
        this.fields.get('typeId').options = Object.assign({}, res.data)
      } catch (err) {
        throw err
      }
    },
    show () {
      this.visible = true
    },
    cancel () {
      this.visible = false
    },
    commit () {
      // 根据type类型进行提交操作
    }
  }
}
</script>

<style lang="scss">

</style>
