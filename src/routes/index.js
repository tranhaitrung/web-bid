import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { Route, useParams } from 'react-router-dom';
import {Switch} from 'react-router-dom';
import HomePage from '../components/home/HomePage';
import LoginPage from '../components/login/LoginPage';
import ResignPage from '../components/login/ResignPage';
import HomeManage from '../components/manage/HomeManage';
import UserRouter from './UserRouter';
import AdminRouter from './AdminRouter';
import ListAuction from '../components/auctions/ListAuction';
import AuctionDetail from '../components/auctions/AuctionDetail';
import UserAuction from '../components/auctions/UserAuction';
import CreateItem from '../components/auctions/CreateItem';

import 'antd/dist/antd.css';

function AppRoute() {
    return(

        <Switch>
            <Route path={"/bo"} component={HomeManage}>
                <HomeManage />
            </Route>
            <Route path={"/account"}>
                <UserRouter />
            </Route>
            <Route path={"/login"} >
                <LoginPage />
            </Route>
            <Route path={"/register"}>
                <ResignPage />
            </Route>
            <Route path={"/admin"}>
                <AdminRouter />
            </Route>
            <Route path={"/auction/:auctionId/create-item"}>
                <CreateItem />
            </Route>
            <Route path={"/auctions/detail/:auctionId"}>
                <AuctionDetail />
            </Route>
            <Route path={"/auctions"}>
                <ListAuction />
            </Route>
            <Route path={"/my-auctions"}>
                <UserAuction/>
            </Route>
            <Route path={""}>
                <HomePage />
            </Route>
        </Switch>

    );
}
export default AppRoute;
