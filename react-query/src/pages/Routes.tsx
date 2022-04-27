import { FC, ReactElement, useMemo, useCallback } from 'react';
import { lazy } from '@loadable/component';
import routesEnum from 'constants/routesEnum';
import { RouteProps, useRoutes, Navigate } from 'react-router-dom';
import { getCookie } from 'utils/cookies';
import User from './User';

const Dashboard = lazy(() => import('./Dashboard'));
const Login = lazy(() => import('./Login'));

interface PrivateRouteProps extends RouteProps {
  isRule: boolean;
  isOnlyOpenSite?: boolean;
}

interface OpenRouteProps extends RouteProps {
  isRule?: boolean;
  isOnlyOpenSite: boolean;
}

const openRoutes: OpenRouteProps[] = [
  {
    path: routesEnum.login,
    element: <Login />,
    isOnlyOpenSite: true
  }
];

function privateRoutes(permisson: any): PrivateRouteProps[] {
  return [
    {
      path: routesEnum.dashboard,
      element: <Dashboard />,
      isRule: true || permisson
    },
    {
      path: routesEnum.user,
      element: <User />,
      isRule: true || permisson
    }
  ];
}

export const Routes: FC = (): ReactElement => {
  const token = getCookie('token');
  // const role = roleClient # check permisson router pravite

  const routes = [...openRoutes, ...privateRoutes(true)].map((item) => {
    let element: React.ReactNode | null;
    const { isOnlyOpenSite, isRule } = item;

    // check rule router
    if ((token && isOnlyOpenSite) || (token && isRule === false)) {
      element = <Navigate to="/" replace />;
    } else if (!token && isRule !== undefined) {
      element = <Navigate to="/login" replace />;
    } else {
      element = item.element;
    }

    return {
      path: item.path,
      element: element
    };
  });

  const routing = useRoutes([
    ...routes,
    {
      path: '*',
      element: <Navigate to="/login" replace />
    }
  ]);

  return  <>{routing}</>
};
