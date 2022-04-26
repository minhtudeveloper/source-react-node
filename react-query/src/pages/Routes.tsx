import { FC, ReactElement } from 'react';
import { lazy } from '@loadable/component';
import routesEnum from 'constants/routesEnum';
import {
  RouteProps,
  useRoutes,
  Navigate
} from 'react-router-dom';

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
    }
  ];
}

export const Routes: FC = (): ReactElement => {
  const routes = [...openRoutes, ...privateRoutes(true)].map((item) => {
    let element: React.ReactNode | null;

    // check router
    if (item.isRule === false) {
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

  return <>{routing}</>;
};
