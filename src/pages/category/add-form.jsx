import React, { Component } from 'react';
import propTypes from 'prop-types'
import { Form, Select, Input } from 'antd'
class AddForm extends Component {
  static propTypes = {
    categorys: propTypes.array.isRequired,
    parentId: propTypes.string.isRequired,
    setForm: propTypes.func.isRequired
  }
  componentWillMount () {
    this.props.setForm(this.props.form)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const {categorys, parentId} = this.props
    return (
      <Form>
        <Form.Item>
          {
            getFieldDecorator('parentId', {
              initialValue: parentId,
            })(
              <Select>
                <Select.Option value={'0'}>一级分类</Select.Option>
                {
                  categorys.map(category => <Select.Option value={category._id} key={category._id}>{category.name}</Select.Option>)
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('categoryName', {
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

export default Form.create()(AddForm);