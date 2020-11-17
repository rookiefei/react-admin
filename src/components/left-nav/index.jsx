import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import './index.less'
import panda from '../../assets/images/panda.jpg'
import menuList from '../../config/menuConfig';
const { SubMenu } = Menu;
/*
左侧导航
*/
class LeftNav extends Component {
  // map实现
  getMenuNodes_map = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
  // reduce实现
  getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      console.log(pre)
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {
        pre.push((
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        ))
      }
      return pre
    }, [])
  }
  render() {
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={panda} alt="avatar" />
          <h1>Panda-admin</h1>
        </Link>
        <Menu
          defaultSelectedKeys={['/home']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          {/* <Menu.Item key="/home">
            <Link to='/home'>
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="/category">
              <Link to='/category'>
                <Icon type="home" />
                <span>品类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/product">
              <Link to='/product'>
                <Icon type="home" />
                <span>商品管理</span>
              </Link>
            </Menu.Item>
          </SubMenu> */}
          {this.getMenuNodes(menuList)}

        </Menu>
      </div>
    );
  }
}

export default LeftNav;