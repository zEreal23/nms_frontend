import React from 'react'
import {BrowserRouter , Switch , Route} from 'react-router-dom'

import Signup from './user/signup';
import Signin from './user/signin';

import Menu from './core/Menu';
import Header from '../src/core/Header'; 
import Cart from './core/Cart'

import AdminPage from './admin/AdminPage';
import AddCategort from '../src/admin/category/AddCategory';
import UpdateCategory from '../src/admin/category/UpdateCategory';
import AddProduct from '../src/admin/Menu/AddProduct';
import UpdateProduct from '../src/admin/Menu/UpdateProduct';
import adminCategoryAndMenu from './admin/adminCategoryandMenu';
import ManageUsers from './admin/user/ManageUser.'

import UpdateUser from './admin/user/UpdateUser';

import AdminRoute from './auth/AdminRoute'

function Routes() {
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path="/Menu" exact component={Menu}/>
                <Route path="/signin" exact component={Signin}/>
                <AdminRoute path="/admin/home" exact component={AdminPage}/>
                <AdminRoute path="/users" exact component={ManageUsers}/>
                <AdminRoute path="/create/category" exact component={AddCategort}/>
                <AdminRoute path="/create/product" exact component={AddProduct}/>
                <AdminRoute path="/admin/product" exact component={adminCategoryAndMenu}/>
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
                <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory}/>
                <AdminRoute path="/admin/user/update/:userEidtId" exact component={UpdateUser}/>
                <Route path="/cart" exact component={Cart}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
