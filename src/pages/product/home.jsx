import React, { Component } from 'react';
import { 
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table
} from 'antd'
import LinkButton from '../../components/link-button'
import {reqProducts} from '../../api/index.js'

class ProductHome extends Component {
  state = {
    products: []
  }
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '商品价格',
        dataIndex: 'price',
        render: (price) => '￥' + price
      },
      {
        width: 100,
        title: '状态',
        dataIndex: 'status',
        render: (status) => {
          return (
            <span>
              <Button type>{status === 0 ? '下架': '上架'}</Button>
              <span>在售</span>
            </span>
          )
        }
      },
      {
        width: 100,
        title: '操作',
        render: (product) => {
          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          )
        }
      }
    ];
  }
  componentWillMount () {
    this.initColumns()
  }
  render() {
    const { products } = this.state
    
    
    
    const title = (
      <span>
        <Select value='1' style={{width: 150}}>
          <Select.Option value="1">按名称搜索</Select.Option>
          <Select.Option value="2">按名称搜索</Select.Option>
        </Select>
        <Input placeholder="关键字" style={{width: 150, margin: '0 15px'}}></Input>
        <Button type="primary">搜索</Button>
      </span>
    )
    const extra = (
      <Button type='primary'>
        <Icon type='plus' />
        添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          dataSource={products}
          columns={this.columns}
        />
      </Card>
    );
  }
}

export default ProductHome;