import { FC, ReactElement } from "react";
import { PageHeader } from "antd";
import "./style.scss";

interface MainHeaderI {
  title: string | "";
}

const MainHeader: FC<any> = ({ title }: MainHeaderI): ReactElement => {
  return (
    <div id='main-header'>
      <PageHeader className='site-page-header ' title={title} />
    </div>
  );
};

export default MainHeader;
