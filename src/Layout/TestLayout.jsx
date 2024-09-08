import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
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
 
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import img from '../../logo-removebg-preview.png'

const { Sider } = Layout;
function getItem(label, key, icon, children) {
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
    <NavLink to={'/'}>
      <PieChartOutlined />
    </NavLink>
  ),
  getItem(
    'Users',
    '2',
    <NavLink to={'/users'}>
      <UserOutlined />
    </NavLink>
  ),
  getItem(
    'Categories',
    '3',
    <NavLink to={'/categories'}>
      <GroupOutlined />
    </NavLink>
  ),
  getItem(
    'Sub Category',
    '4',
    <NavLink to={'/sub-categories'}>
      <FileOutlined />
    </NavLink>
  ),
  getItem(
    'Appartments',
    '5',
    <NavLink to={'/properites'}>
      <HomeOutlined />
    </NavLink>
  ),
  getItem(
    'Compounds',
    '6',
    <NavLink to={'/compounds'}>
      <AppstoreOutlined />
    </NavLink>
  ),
  getItem(
    'Banners',
    '7',
    <NavLink to={'/banners'}>
      <FileJpgOutlined />
    </NavLink>
  ),
  getItem(
    'Featured',
    '8',
    <NavLink to={'/features'}>
      <StarOutlined />
    </NavLink>
  ),


];

const TestLayout = () => {
  // const { user } = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const [logoSize,setLogoSize] = useState(false)
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
        onCollapse={(value) => {
          setCollapsed(value)
          setTimeout(()=>{
            setLogoSize(!logoSize)
          },logoSize?0:500)
        }}
      >
        <div className='p-5 flex justify-center'>
          <Link to={'/'}>
            <img
              src={img}
              width={logoSize? 120:60}
              alt='logo'
            />
          </Link>
        </div>
        <Menu
          theme='light'
          defaultSelectedKeys={['1']}
          mode='inline'
          items={
           adminItems
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
