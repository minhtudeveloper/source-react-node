import { Button, Form, Input, notification } from "antd";
import { login } from "api/auth";
import routesEnum from "constants/routesEnum";
import { useAppDispatch } from "hooks";
import { loginI } from "interfaces/auth";
import { FC, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { authActions } from "store/ducks/auth/slice";
import "./style.scss";

const Login: FC = (): ReactElement => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const onFinish = async (values: loginI) => {
    const { username, password } = values;
    await login(username, password)
      .then((rs: any) => {
        dispatch(authActions.loginSuccess(rs.data.data));
        history.replace(routesEnum.dashboard);
      })
      .catch((err) => {
        notification.error({
          message: "Wrong",
          description: "Email or pass word is wrong! ",
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div id='login'>
      <div className='wrap-login'>
        <div className='form'>
          <Form
            name='basic'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item
              label='Username'
              name='username'
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className='group-button'>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
