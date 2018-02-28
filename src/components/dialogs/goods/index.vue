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
    fields: {
      type: Map
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
      visible: false,
      formVisible: false,
      typeAssociationObj: {
        edit: {
          title: '编辑'
        },
        add: {
          title: '添加'
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
  methods: {
    show () {
      this.visible = true
    },
    hidden () {
      this.visible = false
    },
    cancel () {
      this.hidden()
    },
    async commit () {
      let data = this.$refs.form.getFormDatas()
      console.log('commit: ', data)
      this.$emit('commit', data)
    }
  }
}
</script>

<style lang="scss">

</style>
