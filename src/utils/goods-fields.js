import { getGoodsTypeList } from 'api'

const formFields = {
  title: {
    label: '标题',
    type: 'input',
    rule: {}
  },
  desc: {
    label: '描述',
    type: 'textarea',
    rule: {}
  },
  types: {
    label: '类型',
    type: 'select',
    multiple: true,
    method: getGoodsTypeList
  },
  typeIds: {
    label: '类型',
    type: 'select',
    multiple: true,
    optionProp: 'typeLabels',
    slot: true,
    rule: {},
    method: getGoodsTypeList
  },
  typeLabels: {},
  price: {
    label: '价格',
    type: 'input-number',
    rule: {},
    style: {
      width: '200px'
    }
  }
}

export const getFields = (fields) => {
  let map = new Map()
  for (let key of fields) {
    if (key in formFields) {
      map.set(key, formFields[key])
    }
  }
  return map
}
