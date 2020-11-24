import React, { Component } from 'react';
import {
  Card,
  Icon,
  List,
} from 'antd'

class ProductDetail extends Component {
  render() {
    const title = (
      <span>
        <Icon type='arrow-left' />
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className='product-detail'>
        <List>
          <List.Item>
            <span className='left'>商品名称:</span>
            <span></span>
          </List.Item>
          <List.Item>
            <span className='left'>商品描述:</span>
            <span></span>
          </List.Item>
          <List.Item>
            <span className='left'>商品价格:</span>
            <span></span>
          </List.Item>
          <List.Item>
            <span className='left'>所属分类:</span>
            <span></span>
          </List.Item>
          <List.Item>
            <span className='left'>商品图片:</span>
            <span>
              <img src="" style={} className="product-img"/>
              <img src="" style={} className="product-img"/>
            </span>
          </List.Item>
        </List>
      </Card>
    );
  }
}

export default ProductDetail;