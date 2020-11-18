import React, { Component } from 'react';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom'
import LinkButton from '../link-button'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import { reqWeather } from '../../api/index'
import menuList from '../../config/menuConfig'
import './index.less'
import storageUtils from '../../utils/storageUtils';

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '',
    weather: ''
  }
  getTime = () => {
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: formateDate(Date.now())
      })
    }, 1000)
  }
  getWeather = async () => {
    /* reqWeather('成都').then(res => {
      this.setState({
        dayPictureUrl: res.dayPictureUrl,
        weather: res.weather
      })
    }) */
    const { dayPictureUrl, weather } = await reqWeather('成都')
    this.setState({ dayPictureUrl, weather })
  }
  getTitle = () => {
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        let cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }

  logout = () => {
    Modal.confirm({
      content: '再见？Are You Sure?',
      okText: 'Ofcourse',
      cancelText: 'Hmm...',
      onOk: () => {
        storageUtils.removeUser()
        memoryUtils.user = {}
        this.props.history.replace('/login')
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  }
  // 第一次render之后执行一次，一般在这执行异步操作
  componentDidMount() {
    this.getTime()
    this.getWeather()
  }

  componentWillUnmount () {
    clearInterval(this.intervalId)
  }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    const username = memoryUtils.user.username
    const title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);