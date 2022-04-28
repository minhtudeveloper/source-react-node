import { ReactElement, FC } from "react";
import { history, persistor } from "store";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Routes } from "pages/Routes";
import { QueryClient, QueryClientProvider } from "react-query";
import "antd/dist/antd.css";
import { LoadingFullpage } from "components/Loading";
import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/ja_JP";

const App: FC = (): ReactElement => {
  const queryClient = new QueryClient();

  return (
    <PersistGate loading={<LoadingFullpage />} persistor={persistor}>
      <ConfigProvider locale={locale} autoInsertSpaceInButton={false}>
        <QueryClientProvider client={queryClient}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </QueryClientProvider>
      </ConfigProvider>
    </PersistGate>
  );
};

export default App;
