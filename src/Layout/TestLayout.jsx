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
  StarOutlined,
  MessageOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useSelector } from 'react-redux';

const { Sider } = Layout;
function getItem(label, key, icon, children, role) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const adminItems = [
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
const brookersItems = [
  getItem(
    'E-Brooker',
    '1',
    <Link to={'/brooker'}>
      <PieChartOutlined />
    </Link>
  ),
  getItem(
    'Inbox',
    '2',
    <Link to={'/brooker/inbox'}>
      <MessageOutlined />
    </Link>
  ),
  getItem(
    'Settings',
    '3',
    <Link to={'/brooker/settings'}>
      <SettingOutlined />
    </Link>
  ),
];
const TestLayout = () => {
  const { user } = useSelector((state) => state.user);
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
        theme='light'
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
          theme='light'
          defaultSelectedKeys={['1']}
          mode='inline'
          items={
            user?.user.role == 'user'
              ? adminItems
              : user?.user?.role == 'broker'
              ? brookersItems
              : null
          }
        />
      </Sider>
      <Layout>
        <CHeader />
        <Outlet />
      </Layout>
    </Layout>
  );
};
export default TestLayout;
