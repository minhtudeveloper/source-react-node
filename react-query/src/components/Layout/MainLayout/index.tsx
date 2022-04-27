import { FC, ReactElement, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';
import React from 'react';
import './style.scss';
import { Footer } from 'antd/lib/layout/layout';
import SideBar from 'components/Layout/SideBar';

const { Header, Content } = Layout;

const MainLayout: FC<any> = ({ children }: any): ReactElement => {
  return (
    <div id="main-layout">
      <Layout>
        <SideBar />
        <Layout className="site-layout">
          <Header className="site-layout-background"></Header>
          <Content className="site-layout-background">{children}</Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
