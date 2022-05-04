import React, { lazy, Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import Loading from "../common/Loading";
import MenuUser from "../components/user/MenuUser";

const UserInfo = lazy(() => import("../components/user/UserInfo"));
const UserPassword = lazy(() => import("../components/user/UserPassword"));
const BuyBidPackage = lazy(() => import("../components/user/BuyBidPackage"));
const UserAuctions = lazy(() => import("../components/user/UserAuctions"));


function UserRouter() {
  const { path } = useRouteMatch();
  console.log(path);

  return (
    <MenuUser>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route component={UserInfo} exact path={`${path}`} />
          <Route component={UserInfo} exact path={`${path}/info`} />
          <Route
            component={UserPassword}
            exact
            path={`${path}/change-pass`}
          />
          <Route
            component={BuyBidPackage}
            exact
            path={`${path}/buy-bid-package`}
          />
          <Route component={UserAuctions} exact path={`${path}/my-auctions`} />
        </Switch>
      </Suspense>
    </MenuUser>
  );
}

export default UserRouter;
