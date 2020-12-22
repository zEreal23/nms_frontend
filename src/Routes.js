import React from 'react'
import {BrowserRouter , Switch , Route} from 'react-router-dom'

import Signup from './user/signup';
import Signin from './user/signin';
import Home from '../src/core/Home';
import Menu from '../src/core/Menu';
import AddCategort from '../src/admin/AddCategory';
import AddProduct from '../src/admin/AddProduct';
import UpdateProduct from '../src/admin/UpdateProduct';
import ManageProduct from './admin/ManageProduct';

function Routes() {
    return (
        <BrowserRouter>
            <Menu/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/create/category" exact component={AddCategort}/>
                <Route path="/create/product" exact component={AddProduct}/>
                <Route path="/admin/product" exact component={ManageProduct}/>
                <Route path="/admin/product/update/:productId" exact component={UpdateProduct}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
