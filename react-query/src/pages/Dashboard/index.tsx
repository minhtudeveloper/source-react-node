import { FC, ReactElement } from "react";
import MainHeader from "commons/MainHeader";
import MainLayout from "Layout/MainLayout";

const Dashboard: FC = (): ReactElement => {
  return (
    <MainLayout>
      <MainHeader title='DashBorad' />
    </MainLayout>
  );
};

export default Dashboard;
