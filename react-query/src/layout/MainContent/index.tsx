import { FC, ReactElement } from 'react';
import { Layout } from 'antd';
import './style.scss';

const { Content } = Layout;

interface MainContentI {
  children: any;
}

const MainContent: FC<any> = ({ children }: MainContentI): ReactElement => {
  return (
    <div id="main-content">
      <Content>{children}</Content>
    </div>
  );
};

export default MainContent;
