import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import { genrateSidebarLinks } from '../utils/functions.jsx';
import { Header } from '../componants';
import img from '../../logo-removebg-preview.png';
import "./style.css"
import useCheckConnection from '../hooks/useCheckConnection.jsx';
const { Sider } = Layout;

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const [logoSize, setLogoSize] = useState(false);
  const isOnline = useCheckConnection()

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
        {isOnline?<Outlet />:<h1>Offline</h1>}
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
