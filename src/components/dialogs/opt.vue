<template>
  <el-dialog :title="fullTitle" :visible.sync="visible">
    <l-form ref="form" :fields="fields" :values="values" v-if="formVisible"></l-form>
    <slot></slot>
    <el-button-group>
      <el-button type="primary" @click.native="commit">提交</el-button>
      <el-button @click.native="cancel">取消</el-button>
    </el-button-group>
  </el-dialog>
</template>

<script>
// add & modify 弹框模板
export default {
  props: {
    title: String,
    fields: Map,
    values: Object
  },
  methods: {
    commit () {

    },
    cancal () {

    }
  }
}
</script>

<style>

</style>
