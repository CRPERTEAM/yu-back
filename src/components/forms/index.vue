<template lang="html">
  <div class="l-forms">
    <el-form ref="form" :model="formDatas" label-width="100px" class="form">
      <el-form-item
        v-for="(item, index) of getFieldsValues"
        :key="index"
        :label="item.label"
        :prop="getFieldsKeys[index]"
        class="form-item">
        <el-input
          v-model="formDatas[getFieldsKeys[index]]"
          :placeholder="placeholder(item.label)"
          clearable
          :style="item.style"
          v-if="isType(item.type, 'input')"></el-input>
        <el-input
          v-model.number="formDatas[getFieldsKeys[index]]"
          :placeholder="placeholder(item.label)"
          clearable
          type="number"
          :style="item.style"
          v-if="isType(item.type, 'input-number')"></el-input>
        <el-input
          type="textarea"
          :row="item.row || 2"
          v-model="formDatas[getFieldsKeys[index]]"
          :placeholder="placeholder(item.label)"
          v-if="isType(item.type, 'textarea')"></el-input>
        <el-select
          v-model="formDatas[getFieldsKeys[index]]"
          :placeholder="placeholder(item.label)"
          v-if="isType(item.type, 'select')"
          class="form-slelct"
          value-key="label"
          :multiple="item.multiple"
          :loading="!item.loaded"
          @visible-change="selectVisible($event, item, getFieldsKeys[index])">
          <el-option
            v-for="(optionItem, index) in item.options"
            :key="optionItem.label"
            :label="optionItem.label"
            :value="optionItem">
          </el-option>
        </el-select>
        <el-switch
          v-model="formDatas[getFieldsKeys[index]]"
          :on-text="item.onText || ''"
          :off-text="item.offText || ''"
          v-if="isType(item.type, 'switch')"
        ></el-switch>
        <!-- <el-upload
          class="upload-files"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="handleUploadFilesSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="formDatas[item.prop].value"
          :drag="item.drag"
          v-if="isType(item, 'upload-files')">
          <el-button size="small" type="primary" v-if="!item.drag">点击上传</el-button>
          <i class="el-icon-upload" v-if="item.drag"></i>
          <div class="el-upload__text" v-if="item.drag">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <el-upload
          class="upload-avatar"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleUploadAvatarSuccess"
          :before-upload="beforeUpload"
          v-if="isType(item, 'upload-avatar')">
          <img v-if="formDatas[item.prop].url" :src="formDatas[item.prop].url" class="avatar">
          <i v-else class="el-icon-plus avatar-icon"></i>
        </el-upload>
        <l-tinymce
          v-if="isType(item, 'richText')"></l-tinymce> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import rulesUtil from '@/utils/rules'
import LTinymce from 'components/common/tinymce'

export default {
  name: 'LForms',
  components: {
    LTinymce
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    fields: {
      type: Map // 接受一个Map对象
    },
    values: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    getFieldsValues () {
      return [...this.fields.values()]
    },
    getFieldsKeys () {
      return [...this.fields.keys()]
    }
  },
  data () {
    return {
      rules: {},
      editor: null,
      uploadFiles: [],
      selectOptions: {},
      fieldList: this.getFieldList(),
      formDatas: this.initModel()
    }
  },
  watch: {
  },
  mounted () {
    console.log('this.fieldList: ', this.fieldList)
    console.log('this.fields: ', this.fields)
  },
  created () {
    console.log('this.fieldList: ', this.fieldsArr)
  },
  destroyed () {

  },
  methods: {
    initModel () {
      let obj = {}
      // 为了防止内部修改引起外部的同步修改，不能直接使用values作为v-model的绑定值
      console.log('values: ', this.values)
      this.fields.forEach((value, key) => {
        obj[key] = this.values[key] || undefined
        this.getOptions(value, key)
      })
      this.$forceUpdate()
      console.log('obj: ', obj)
      return obj
    },
    getFieldList () {
      let arr = []
      for (let key of this.fields.keys()) {
        arr.push(key)
      }
      return arr
    },
    getFormDatas () {
      return this.formDatas
    },
    isType: function (itemType, type) {
      return itemType === type
    },
    configRules: function (datas) {
      let obj = {}
      Object.keys(datas).forEach((val) => {
        obj[val] = rulesUtil[val]
      })

      return obj
    },
    placeholder: function (str) {
      return '请输入' + str
    },
    resetFields: function () {
      this.$store.dispatch('resetForm')
      this.$refs['form'].resetFields()
    },
    getUEContent: function () {
      return this.editor.getContent()
    },
    handlePreview: function (file) {
      console.log('handlePreview: ', file)
      window.open(file.url)
    },
    handleRemove: function (file, fileList) {
      console.log('handleRemove: ', file, fileList)
      this.formDatas.attachment = fileList
    },
    handleUploadFilesSuccess: function (res, file) {
      console.log('handleUploadSuccess: ', res, file)
      this.formDatas.attachment.push(file)
      console.log('this.formData: ', this.formDatas)
    },
    handleUploadAvatarSuccess: function (res, file) {
      console.log('handleUploadSuccess: ', res, file)
      this.formDatas.avatar = file
    },
    beforeUpload: function () {

    },
    // select focus的时候去请求options
    selectVisible: function (visible, item, key) {
      if (visible) this.getOptions(item, key)
    },
    getOptions: async function (item, key) {
      // 如果该key存在于这个selectOptions中，则表示不需要请求数据
      if (item.options && item.options.length > 0) {
        return
      }

      let method = item && typeof item.method === 'function' && item.method

      if (!method) return

      try {
        let res = await method()
        // this.formData[item.optionProp] = res.data
        item.options = res.data
        item.loaded = true
        this.$forceUpdate()
      } catch (err) {}
    }
  }
}
</script>

<style lang="scss">
.l-forms {
  height: 100%;
  // overflow: hidden;
  padding: 20px 80px 50px 10px;
  .form {
    .upload-avatar {
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover {
          border-color: #20a0ff;
        }

        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }

        .avatar-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
      }
    }
    .form-slelct {
      width: 200px;
    }
  }
}
</style>
