import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { Route } from 'react-router-dom';
import {Switch} from 'react-router-dom';
import HomePage from '../components/home/HomePage';
import LoginPage from '../components/login/LoginPage';
import ResignPage from '../components/login/ResignPage';

import 'antd/dist/antd.css';

function AppRoute() {
    return(

        <Switch>
            <Route path={"/login"}>
                <LoginPage />
            </Route>
            <Route path={"/register"}>
                <ResignPage />
            </Route>
            <Route path={""}>
                <HomePage />
            </Route>
        </Switch>

    );
}
export default AppRoute;
