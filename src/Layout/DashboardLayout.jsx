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
  const location=useLocation()
  const { user } = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const [logoSize, setLogoSize] = useState(false);
  const [cur,setCur]=useState(location.pathname)
  const isOnline = useCheckConnection()
  useEffect(()=>{
    const testtt=genrateSidebarLinks(user?.user?.role)?.map(ele=>ele.label.toLowerCase());
  const pathname=location.pathname.split('/')[1]
  console.log(pathname)
  setCur(testtt?.indexOf(pathname))
  },[location.pathname])
console.log(cur)
// console.log(testtt)
// console.log(pathname  )
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
              width={ 50}
              alt='logo'
            />
          </Link>
        </div>
        <Menu
          theme='light'
selectedKeys={[cur?.toString()]}
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
