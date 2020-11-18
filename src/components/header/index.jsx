import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import { reqWeather } from '../../api/index'
import menuList from '../../config/menuConfig'
import './index.less'

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '',
    weather: ''
  }
  getTime = () => {
    setInterval(() => {
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
  // 第一次render之后执行一次，一般在这执行异步操作
  componentDidMount() {
    this.getTime()
    this.getWeather()
  }
  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    const username = memoryUtils.user.username
    const title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {username}</span>
          <a >退出</a>
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