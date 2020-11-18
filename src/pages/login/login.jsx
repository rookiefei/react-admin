import React, { Component } from 'react';

import './login.less'
import logo from '../../assets/images/panda.jpg'
import {
  Form,
  Icon,
  Input,
  Button,
  message
} from 'antd';
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';

class Login extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        const {username, password} = values
        const result = await reqLogin(username, password)
        if (result.status ===0) {
          message.success('Congratulations!!!!')
          const user = result.data
          memoryUtils.user = user
          storageUtils.saveUser(user)
          // 跳转到管理界面
          this.props.history.replace('/')
        } else {
          message.error("You're wrong!!! Guess again...", 5)
        }
      } else {
        console.log('检验失败！')
      }
    })
    const form = this.props.form
    const values = form.getFieldsValue()
    console.log(values)
  }
  /*
  对密码进行自定义验证
  */
 validatePwd = (rule, value, callback) => {
   if (!value) {
     callback('密码必须输入！')
   } else if (value.length<4) {
     callback('密码长度不能小于4！')
   } else if (value.length>12) {
     callback('密码长度不能大于12位')
   } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
     callback('密码必须是英文、数字或下划线组成！')
   } else {
     callback()
   }
 }
  render() {
    const user = memoryUtils.user
    if (user && user._id) {
      return <Redirect to='/' />
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form className="login-form" onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                // 声明式验证：直接使用别人定义好的验证规则进行验证
                initialValue: 'admin',
                rules: [
                  { required: true, whitespace: true, message: 'Please input your username!' },
                  { min: 2, message: "最少输入2个字符"},
                  { max: 12, message: "至多输入12个字符"},
                  { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须是英文、数字或下划线组成！"}
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                initialValue: 'admin',
                rules: [{ validator: this.validatePwd }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
const WrapLogin = Form.create()(Login);
export default WrapLogin;