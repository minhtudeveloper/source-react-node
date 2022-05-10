import { FC, ReactElement, ReactNode, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import React from 'react';
import './style.scss';
import routesEnum from 'enum/routes.enum';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

interface SubMenuItem {
  path: string;
  title: string;
  icon?: ReactNode;
  isShow: boolean;
}

interface MenuItem {
  path: string;
  title: string;
  icon: ReactNode;
  isShow: boolean;
  subMenu?: SubMenuItem[];
}

const SideBar: FC<any> = (): ReactElement => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const menu: MenuItem[] = [
    {
      path: `${routesEnum.dashboard}`,
      title: 'Dash Board',
      isShow: true,
      icon: <DashboardOutlined />
    },
    {
      path: '',
      icon: <UserOutlined />,
      title: 'nav 2',
      isShow: true,
      subMenu: [
        {
          path: '#',
          icon: <VideoCameraOutlined />,
          title: 'nav 2-1',
          isShow: true
        }
        // {
        //   path: '',
        //   icon: <VideoCameraOutlined />,
        //   title: 'nav 2-1',
        //   isShow: true
        // }
      ]
    },
    {
      path: `${routesEnum.user}`,
      title: 'User',
      isShow: true,
      icon: <UserOutlined />
    }
  ];

  return (
    <div id="sidebar">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="trigger-sidebar" onClick={toggle}>
          <MenuFoldOutlined />
        </div>
        <div className="wrap-logo">
          <div className="logo"></div>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {menu.map(
            (menuItem, key) =>
              menuItem.isShow &&
              (Array.isArray(menuItem.subMenu) ? (
                menuItem.subMenu.length && (
                  <SubMenu
                    key={key}
                    icon={menuItem.icon}
                    title={menuItem.title}
                  >
                    {menuItem.subMenu.map(
                      (subMenuItem) =>
                        subMenuItem.isShow && (
                          <Menu.Item
                            key={subMenuItem.path}
                            icon={subMenuItem.icon}
                          >
                            <Link to={subMenuItem.path}>
                              {subMenuItem.title}
                            </Link>
                          </Menu.Item>
                        )
                    )}
                  </SubMenu>
                )
              ) : (
                <Menu.Item key={menuItem.path} icon={menuItem.icon}>
                  <Link to={menuItem.path}>{menuItem.title}</Link>
                </Menu.Item>
              ))
          )}
        </Menu>
      </Sider>
    </div>
  );
};

export default SideBar;
