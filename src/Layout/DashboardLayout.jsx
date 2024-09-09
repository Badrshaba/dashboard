import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import { genrateSidebarLinks } from '../utils/functions.jsx';
import { Header } from '../componants';
import img from '../../logo-removebg-preview.png';

const { Sider } = Layout;

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const [logoSize, setLogoSize] = useState(false);

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        theme='light'
        className='fixed'
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => {
          setCollapsed(value);
          setTimeout(
            () => {
              setLogoSize(!logoSize);
            },
            logoSize ? 0 : 500
          );
        }}
      >
        <div className='p-5 flex justify-center'>
          <Link to={'/'}>
            <img
              src={img}
              width={logoSize ? 120 : 60}
              alt='logo'
            />
          </Link>
        </div>
        <Menu
          theme='light'
          defaultSelectedKeys={['1']}
          mode='inline'
          items={genrateSidebarLinks(user?.user?.role)}
        />
      </Sider>
      <Layout>
        <Header />
        <Outlet />
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
