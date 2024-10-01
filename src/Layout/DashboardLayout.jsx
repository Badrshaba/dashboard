import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import { genrateSidebarLinks } from '../utils/functions.jsx';
import { Header } from '../componants';
import img from '../assets/SVG/logo-icon-white.svg';
import "./style.css"
import useCheckConnection from '../hooks/useCheckConnection.jsx';
const { Sider } = Layout;

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const [logoSize, setLogoSize] = useState(false);
  const isOnline = useCheckConnection()
  const path = {
    '/':"1",
    '/users':"2",
    '/categories':"3",
    '/sub-categories':"4",
    '/properites':"5",
    '/compounds':"6",
    '/banners':"7",
    '/features':"8",
    '/other':"9",
    '/request-ebrooker':'10',
    '/package':"11",
    '/request-sales':"12",
    '/my-wallet':"13",
    '/content-us':"13",
    
  }
  const location = ()=>{
    let local = window.location.pathname.split("/")
    local.pop()
     return path[window.location.pathname] || path[local.join("/")]
  }
  
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
          // setTimeout(
          //   () => {
          //     setLogoSize(!logoSize);
          //   },
          //   logoSize ? 0 : 500
          // );
        }}
      >
        <div className={collapsed?'p-5 fixed flex justify-center':'p-5 fixed left-12 flex justify-center'}>     
            <img
              src={img}
              width={50}
              alt='logo'
            />
        </div>
        <Menu
          theme='light'
          defaultSelectedKeys={[location() || '1']}
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
