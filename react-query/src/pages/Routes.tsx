/* eslint-disable react-hooks/exhaustive-deps */
import { lazy } from "@loadable/component";
import { LoadingFullpage } from "components/Loading";
import routesEnum from "enum/routes.enum";
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
  isRole: boolean;
  isOnlyOpenSite?: boolean;
}

interface OpenRouteProps extends RouteProps {
  isRole?: boolean;
  isOnlyOpenSite: boolean;
}

function privateRoutes(permisson: any): PrivateRouteProps[] {
  return [
    {
      exact: true,
      path: routesEnum.user,
      component: User,
      isRole: true,
    },
    {
      path: routesEnum.dashboard,
      exact: true,
      component: Dashboard,
      isRole: true,
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
  const isToggleToken = useAppSelector(
    (state: RootState) => state.auth.isToggleToken,
  );

  const tokenClient = getCookie("token");

  const [token, settoken] = useState(tokenClient);

  useEffect(() => {
    settoken(tokenClient);
  }, [isToggleToken]);

  return (
    <Router>
      <Suspense fallback={<LoadingFullpage />}>
        <Switch>
          {openRoutes.map((route: any, key: number) => {
            let resultRender: any;
            const { path, isOnlyOpenSite } = route;
            if (token && isOnlyOpenSite) {
              resultRender = (props: any) => (
                <Redirect
                  key={key}
                  to={{
                    pathname: routesEnum.dashboard,
                    state: { from: props.location },
                  }}
                />
              );
            } else {
              resultRender = (props: any) => (
                <route.component {...props} key={key} />
              );
            }
            return <Route path={path} render={resultRender} key={key} />;
          })}

          {privateRoutes(true).map((route: any, key: number) => {
            let resultRender: any;
            const { path, isRole } = route;

            if (token) {
              if (!isRole) {
                resultRender = (props: any) => (
                  <Redirect
                    key={key}
                    to={{
                      pathname: routesEnum.dashboard,
                      state: { from: props.location },
                    }}
                  />
                );
              } else {
                resultRender = (props: any) => (
                  <route.component {...props} key={key} />
                );
              }
            } else {
              resultRender = (props: any) => (
                <Redirect
                  key={key}
                  to={{
                    pathname: routesEnum.login,
                    state: { from: props.location },
                  }}
                />
              );
            }
            return <Route path={path} render={resultRender} key={key} />;
          })}

          {token ? (
            <Redirect to={routesEnum.dashboard} />
          ) : (
            <Redirect to={routesEnum.login} />
          )}
        </Switch>
      </Suspense>
    </Router>
  );
};
