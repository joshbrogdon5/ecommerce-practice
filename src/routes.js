import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Storefront from './components/Storefront';
import Cart from './components/Cart';



export default (
    <Switch>
        <Route exact path='/' component={Storefront} /> 
        <Route exact path='/cart' component={Cart} /> 
    </Switch>
)