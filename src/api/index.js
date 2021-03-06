import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

/* export function reqLogin (user) {
  ajax('/login', {username, password}, 'POST')
}
 */
//登录
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

// category
export const reqCategorys = (parentId) => ajax('/manage/category/list', {parentId})
export const reqAddCategorys = (categoryName, parentId) => ajax('/manage/category/add', {categoryName, parentId}, 'POST')
export const reqUpdateCategorys = (categoryId, categoryName) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST')

// product
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize})
export const reqSearchProducts = (pageNum, pageSize, searchName, searchType) => ajax('/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName
})




// jsonp请求的接口请求函数
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === 'success') {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0]
        resolve({ dayPictureUrl, weather })
      } else {
        message.error('获取天气信息失败！')
      }
    })
  })
}