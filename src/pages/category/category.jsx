import React, { Component } from 'react';
import { Card, Table, Button, Icon, message, Modal } from 'antd';
import LinkButton from '../../components/link-button'
import AddForm from './add-form'
import UpdateForm from './update-form'
import { reqCategorys, reqUpdateCategorys, reqAddCategorys } from '../../api/index'

class Category extends Component {

  state = {
    loading: false,
    categorys: [],
    subCategorys: [],
    parentId: '0',
    parentName: '',
    showStatus: 0, // 0：不显示 1：添加 2：更新
  }
  // 初始化Table所有列的数组
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        width: 300,
        render: (text, record) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(text)}>修改分类</LinkButton>
            {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(text)}>查看子分类</LinkButton> : null}
          </span>
        ),
      }
    ]
  }

  getCategorys = async (parentId) => {
    this.setState({ loading: true })
    parentId = parentId || this.state.parentId
    const result = await reqCategorys(parentId)
    this.setState({ loading: false })
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === '0') {
        this.setState({
          categorys
        })
      } else {
        console.log(111)
        this.setState({
          subCategorys: categorys
        })
      }

    } else {
      message.error('获取数据失败！')
    }
  }

  showSubCategorys = (category) => {
    console.log(category)
    const { _id, name } = category
    this.setState({ parentId: _id, parentName: name }, () => {
      this.getCategorys()
    })
  }

  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  showAdd = () => {
    this.setState({ showStatus: 1 })
  }

  showUpdate = (category) => {
    this.category = category
    console.log(this)
    this.setState({ showStatus: 2 })
  }

  handleCancel = () => {
    this.form.resetFields()
    this.setState({ showStatus: 0 })
  }

  addCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ showStatus: 0 })
        const { parentId, categoryName } = values
        this.form.resetFields()
        let result = await reqAddCategorys(categoryName, parentId)
        if (result.status === 0) {
          if (parentId === this.state.parentId) {
            this.getCategorys()
          } else if (parentId === '0') {
            this.getCategorys('0')
          }
        }
      }
    })

  }

  updateCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ showStatus: 0 })
        const categoryId = this.category._id
        const { categoryName } = values
        this.form.resetFields()
        let result = await reqUpdateCategorys(categoryId, categoryName)
        if (result.status === 0) {
          this.getCategorys()
        }
      }
    })

  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getCategorys()
  }
  render() {
    console.log('render()')
    const { categorys, subCategorys, parentId, parentName, loading, showStatus } = this.state
    const category = this.category || {} //防止第一次渲染报错
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type="arrow-right" style={{ marginRight: 5 }}></Icon>
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type="plus" />
        添加
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          dataSource={parentId === '0' ? categorys : subCategorys}
          columns={this.columns}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }} />
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm categorys={categorys} parentId={parentId} setForm={(form) => { this.form = form }} />
        </Modal>
        <Modal
          title="更新分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm categoryName={category.name} setForm={(form) => { this.form = form }} />
        </Modal>
      </Card>
    );
  }
}

export default Category;