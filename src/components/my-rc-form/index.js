import React, { Component } from "react";

export default function createForm(Cmp) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {

      }
      this.options = {}
    }
    handleChange = (e) => {
      const { name, value } = e.target
      this.setState({
        [name]: value
      })
    }
    // 扩展Input组件使其成为受控组件
    getFieldDecorator = (field, option) => (InputCmp) => {
      this.options[field] = option
      return React.cloneElement(InputCmp, {
        name: field,
        value: this.state[field],
        onChange: this.handleChange,
      })
    }
    // 设置初始值
    setFieldsValue = (newStore) => {
      this.setState(newStore)
    }
    // 校验
    validateFields = (callback) => {
      let err = []

      for (const field in this.options) {
        if (Object.hasOwnProperty.call(this.options, field)) {
          const element = this.state[field];
          if (element === undefined) {
            err.push({ [field]: "error" })
          }
        }
      }

      if (err.length === 0) {
        callback(null, this.state)
      } else {
        callback(err, this.state)
      }

    }
    // 获取状态值
    getFieldsValue = () => {
      return { ...this.state }
    }

    getForm() {
      return {
        form: {
          getFieldDecorator: this.getFieldDecorator,
          setFieldsValue: this.setFieldsValue,
          validateFields: this.validateFields,
          getFieldsValue: this.getFieldsValue
        }
      }
    }
    render() {
      console.log('this.props:', this.props);
      return <Cmp {...this.props} {...this.getForm()} />
    }
  }
}