import React, { lazy, Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import Loading from "../common/Loading";
import MenuAdmin from "../components/manage/layout/MenuAdmin";

const AcceptAuction = lazy(() => import("../components/manage/auctions/AcceptAuction"));
const ManageAuction = lazy(() => import("../components/manage/auctions/ManageAuction"));
const ManageBids = lazy(() => import("../components/manage/bids/ManageBids"));
const ManageCategory = lazy(() => import("../components/manage/category/ManageCategory"));
const ManageUser = lazy(() => import("../components/manage/users/ManageUser"));


function AdminRouter() {
  const { path } = useRouteMatch();
  console.log(path);

  return (
    <MenuAdmin>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route component={AcceptAuction} exact path={`${path}`} />
          <Route component={AcceptAuction} exact path={`${path}/accept-auctions`} />
          <Route
            component={ManageAuction}
            exact
            path={`${path}/manage-auctions`}
          />
          <Route
            component={ManageUser}
            exact
            path={`${path}/users`}
          />
          <Route component={ManageCategory} exact path={`${path}/categories`} />
          <Route
            component={ManageBids}
            exact
            path={`${path}/bids`}
          />
        </Switch>
      </Suspense>
    </MenuAdmin>
  );
}

export default AdminRouter;
