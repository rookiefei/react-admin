import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import ProductHome from './home'
import ProductDetail from './detail'
import ProductAddUpdate from './add-update'
class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" exact component={ProductHome} /> {/*exact: 完全匹配*/}
        <Route path="/product/add-update" component={ProductAddUpdate} />
        <Route path="/product/detail" component={ProductDetail} />
        <Redirect to='/product' />
      </Switch>
    );
  }
}

export default Product;