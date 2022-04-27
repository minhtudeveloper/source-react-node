import { FC, ReactElement } from 'react';
import { Form, Input, Button } from 'antd';
import { login } from 'api/auth';
import { loginI } from 'interfaces/auth';
import { setCookie, removeCookie } from 'utils/cookies';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const Login: FC = (): ReactElement => {
  const navigate = useNavigate();

  const onFinish = async (values: loginI) => {
    const { username, password } = values;
    await login(username, password)
      .then((rs: any) => {
        if (rs) {
          setCookie('token', rs.data.data, { expires: 1 });
          navigate('/');
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div id="login">
      <div className="wrap-login">
        <div className="form">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' }
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className="group-button">
              <Button type="primary" htmlType="submit">
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
