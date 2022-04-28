/* eslint-disable react-hooks/exhaustive-deps */
import { lazy } from "@loadable/component";
import { LoadingFullpage } from "components/Loading";
import routesEnum from "constants/routesEnum";
import { useAppSelector } from "hooks";
import { FC, ReactElement, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import { RootState } from "store";
import { getCookie } from "utils/cookies";

const Dashboard = lazy(() => import("pages/Dashboard"));
const Login = lazy(() => import("pages/Login"));

const User = lazy(() => import("pages/User"));

interface PrivateRouteProps extends RouteProps {
  isRule: boolean;
  isOnlyOpenSite?: boolean;
}

interface OpenRouteProps extends RouteProps {
  isRule?: boolean;
  isOnlyOpenSite: boolean;
}

function privateRoutes(permisson: any): PrivateRouteProps[] {
  return [
    {
      exact: true,
      path: routesEnum.user,
      component: User,
      isRule: true,
    },
    {
      path: routesEnum.dashboard,
      exact: true,
      component: Dashboard,
      isRule: true,
    },
  ];
}
const openRoutes: OpenRouteProps[] = [
  {
    exact: true,
    path: routesEnum.login,
    component: Login,
    isOnlyOpenSite: true,
  },
];

export const Routes: FC = (): ReactElement => {
  const isToggle = useAppSelector((state: RootState) => state.auth.isToggle);

  const tokenClient = getCookie("token");

  const [token, settoken] = useState(tokenClient);

  useEffect(() => {
    settoken(tokenClient);
  }, [isToggle]);

  const routes = [...openRoutes, ...privateRoutes(true)];

  return (
    <Router>
      <Suspense fallback={<LoadingFullpage />}>
        <Switch>
          {routes.map((route: any, key: number) => {
            const { path, isRule, isOnlyOpenSite } = route;

            let resultRender: any;

            if (token && isRule !== undefined) {
              if (isRule) {
                resultRender = (props: any) => (
                  <route.component {...props} routes={route.routes} key={key} />
                );
              } else {
                resultRender = (props: any) => (
                  <Redirect
                    key={key}
                    to={{
                      pathname: routesEnum.dashboard,
                      state: { from: props.location },
                    }}
                  />
                );
              }
            } else if (token && isOnlyOpenSite) {
              resultRender = (props: any) => (
                <Redirect
                  key={key}
                  to={{
                    pathname: routesEnum.dashboard,
                    state: { from: props.location },
                  }}
                />
              );
            } else if (!token && isRule !== undefined) {
              resultRender = (props: any) => (
                <Redirect
                  key={key}
                  to={{
                    pathname: routesEnum.login,
                    state: { from: props.location },
                  }}
                />
              );
            } else {
              resultRender = (props: any) => (
                <route.component {...props} routes={route.routes} key={key} />
              );
            }

            return <Route path={path} render={resultRender} key={key} />;
          })}

          <Redirect to='/login' />
        </Switch>
      </Suspense>
    </Router>
  );
};
