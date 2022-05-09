import { FC, ReactElement } from "react";
import MainLayout from "layout/MainLayout";
import MainHeader from "components/MainHeader";

const Dashboard: FC = (): ReactElement => {
  return (
    <MainLayout>
      <MainHeader title='Dashboard' />
    </MainLayout>
  );
};

export default Dashboard;
