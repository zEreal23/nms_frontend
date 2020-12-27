import React from 'react'
import {BrowserRouter , Switch , Route} from 'react-router-dom'

import Signup from './user/signup';
import Signin from './user/signin';
import Home from '../src/core/Home';
import Header from '../src/core/Header';
import AddCategort from '../src/admin/category/AddCategory';
import AddProduct from '../src/admin/Menu/AddProduct';
import UpdateProduct from '../src/admin/Menu/UpdateProduct';
import ManageProduct from './admin/Menu/ManageProduct';
import AdminDashboard from './admin/AdminDashboard'

import AdminRoute from './auth/AdminRoute'
import Cart from './core/Cart'
function Routes() {
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={Signin}/>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
                <AdminRoute path="/signup" exact component={Signup}/>
                <AdminRoute path="/create/category" exact component={AddCategort}/>
                <AdminRoute path="/create/product" exact component={AddProduct}/>
                <AdminRoute path="/admin/product" exact component={ManageProduct}/>
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
                <Route path="/cart" exact component={Cart}/>

            </Switch>
        </BrowserRouter>
    )
}

export default Routes
