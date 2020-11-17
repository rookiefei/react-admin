import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Category from '../category/category'
import Home from '../home/home'
import Bar from '../charts/bar'
import Pie from '../charts/pie'
import Line from '../charts/line'
import Role from '../role/role'
import User from '../user/user'
import Product from '../product/product'

const { Footer, Sider, Content } = Layout;
class Admin extends Component {
  constructor() {
    super()
    this.state = {
      nowYear: new Date().getFullYear()
    }
  }
  render() {
    const user = memoryUtils.user
    if (!user || !user._id) {
      return <Redirect to="/login" />
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ backgroundColor: '#fff' }}>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/product' component={Product} />
              <Route path='/role' component={Role} />
              <Route path='/user' component={User} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#cccccc' }}>{`Copyright©2020-${this.state.nowYear} RookieFei All Rights Reserved.`}</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;