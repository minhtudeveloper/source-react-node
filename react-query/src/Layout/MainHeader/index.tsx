import { FC, ReactElement } from "react";
import { Button, Layout, Popconfirm } from "antd";
import "./style.scss";
import { useAppDispatch } from "hooks";
import { authActions } from "store/ducks/auth/slice";
import { useHistory } from "react-router-dom";

const { Header } = Layout;

const MainHeader: FC<any> = (): ReactElement => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onLogout = () => {
    dispatch(authActions.logout());
    history.push("/login");
  };

  return (
    <div id='header'>
      <Header className='site-layout-background'>
        <div className='header-wrap'>
          <div className='logout'>
            <Popconfirm
              placement='bottomRight'
              title={"Are you sure logout"}
              onConfirm={onLogout}
              okText='Yes'
              cancelText='No'
            >
              <Button>logout</Button>
            </Popconfirm>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default MainHeader;
