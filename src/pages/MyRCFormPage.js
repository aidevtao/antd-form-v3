import React, { Component } from "react";
import createForm from "../components/my-rc-form/index";
import Input from "../components/Input";

const nameRules = { required: true, message: "请输入姓名！" };
const passwordRules = { required: true, message: "请输入密码！" };

// HOC higher order component : 是个函数，但是接收组件作为参数，返回一个新的组件
@createForm
class MyRCFormPage extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   username: "",
    //   password: ""
    // };
  }

  componentDidMount() {
    this.props.form.setFieldsValue({ username: "default" });
  }

  submit = () => {
    const { getFieldsValue, validateFields } = this.props.form;
    validateFields((err, val) => {
      if (err) {
        console.log("err", err); //sy-log
      } else {
        alert('校验成功', { ...val })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h3>MyRCFormPage</h3>
        {getFieldDecorator("username", { rules: [nameRules] })(
          <Input placeholder="Username" />
        )}
        {getFieldDecorator("password", { rules: [passwordRules] })(
          <Input placeholder="Password" />
        )}

        <button onClick={this.submit}>submit</button>
      </div>
    );
  }
}

export default MyRCFormPage;
