import { FC, ReactElement } from "react";
import MainLayout from "components/Layout/MainLayout";
import MainHeader from "commons/MainHeader";

const Dashboard: FC = (): ReactElement => {
  return (
    <MainLayout>
      <MainHeader title='DashBorad' />
    </MainLayout>
  );
};

export default Dashboard;
