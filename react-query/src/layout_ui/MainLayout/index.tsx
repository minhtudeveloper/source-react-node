import { Layout } from "antd";
import { Footer } from "antd/lib/layout/layout";
import SideBar from "layout/SideBar";
import { FC, ReactElement } from "react";
import MainHeader from "../MainHeader";
import "./style.scss";

const { Content } = Layout;

const MainLayout: FC<any> = ({ children }: any): ReactElement => {
  return (
    <div id='main-layout'>
      <Layout>
        <SideBar />
        <Layout className='site-layout'>
          <MainHeader />
          <Content className='site-layout-background'>{children}</Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
