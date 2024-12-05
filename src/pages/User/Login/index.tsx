import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import { useState } from 'react';

const LoginPage = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      // TODO: 实现实际的登录逻辑
      await setInitialState({
        ...initialState,
        name: values.username,
      });
      message.success('登录成功');
      // 登录成功后跳转到首页
      window.location.href = '/home';
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        height: '100vh',
        background: '#f0f2f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoginForm
        title="游戏管理后台"
        subTitle="战略游戏管理系统"
        loading={loading}
        onFinish={async (values) => {
          await handleSubmit(values as { username: string; password: string });
        }}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
          }}
          placeholder="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
          }}
          placeholder="密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
      </LoginForm>
    </div>
  );
};

export default LoginPage;
