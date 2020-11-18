import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
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
            {this.getMenuNodes_map(item.children)}
          </SubMenu>
        )
      }
    })
  }
  // reduce实现
  getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
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
        const cItem = item.children.find(cItem => cItem.key === this.path)
        if (cItem) {
          this.openKey = item.key
        }
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
  componentWillMount () {
    // 当前路径
    this.path = this.props.location.pathname

    this.menuNodes = this.getMenuNodes(menuList)
  }
  render() {
    const path = this.props.location.pathname
    console.log(path)
    const openKey = this.openKey
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={panda} alt="avatar" />
          <h1>Panda-admin</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

// withRouter: 包装非路由组件，返回一个新的组件，新的组件向非路由组件传递三个属性：history/location/match
export default withRouter(LeftNav);