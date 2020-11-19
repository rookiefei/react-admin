import React, { Component } from 'react';
import propTypes from 'prop-types'
import { Form, Input } from 'antd'
class UpdateForm extends Component {
  static propTypes = {
    categoryName: propTypes.string.isRequired,
    setForm: propTypes.func.isRequired
  }
  componentWillMount () {
    console.log(this.props.setForm)
    this.props.setForm(this.props.form)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { categoryName } = this.props
    return (
      <Form>
        <Form.Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: categoryName,
              rules: [
                {required: true, message: '分类名称必须输入！'}
              ]
            })(
              <Input placeholder="请输入分类名称" />
            )
          }
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(UpdateForm);