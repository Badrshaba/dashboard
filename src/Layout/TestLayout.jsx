import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Header as CHeader } from '../componants';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    'Dashboard',
    '1',
    <Link to={'/'}>
      <PieChartOutlined />
    </Link>
  ),
  getItem(
    'Users',
    '2',
    <Link to={'/users'}>
      <UserOutlined />
    </Link>
  ),
];
const TestLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          defaultSelectedKeys={['1']}
          mode='inline'
          items={items}
        />
      </Sider>
      <Layout>
        <Header theme='dark'>
          <CHeader />
        </Header>
        <Content>
          {/* <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          > */}
          <Outlet />
          {/* </div> */}
        </Content>
      </Layout>
    </Layout>
  );
};
export default TestLayout;
