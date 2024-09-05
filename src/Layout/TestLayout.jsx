import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Header as CHeader } from '../componants';
import {
  FileOutlined,
  PieChartOutlined,
  FileJpgOutlined,
  UserOutlined,
  GroupOutlined,
  HomeOutlined,
  AppstoreOutlined,
  FireOutlined,
  StarOutlined,
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
  getItem(
    'Categories',
    '3',
    <Link to={'/categories'}>
      <GroupOutlined />
    </Link>
  ),
  getItem(
    'Sub Category',
    '4',
    <Link to={'/sub-categories'}>
      <FileOutlined />
    </Link>
  ),
  getItem(
    'Appartments',
    '5',
    <Link to={'/properites'}>
      <HomeOutlined />
    </Link>
  ),
  getItem(
    'Compounds',
    '6',
    <Link to={'/compounds'}>
      <AppstoreOutlined />
    </Link>
  ),
  getItem(
    'Banners',
    '7',
    <Link to={'/banners'}>
      <FileJpgOutlined />
    </Link>
  ),
  getItem(
    'Featured',
    '8',
    <Link to={'/features'}>
      <StarOutlined />
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
        theme='dark'
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className='p-5 flex justify-center'>
          <Link to={'/'}>
            <img
              src='https://resido.w-manage.org/assets/images/logo/logo.png'
              width={120}
              alt='logo'
            />
          </Link>
        </div>
        <Menu
          theme='dark'
          defaultSelectedKeys={['1']}
          mode='inline'
          items={items}
          className=''
        />
      </Sider>
      <Layout>
        <Header theme='light'>
          <CHeader />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default TestLayout;
