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
import paths from '../route/paths';
import { NavLink } from 'react-router-dom';

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
    <NavLink to={paths.dashbaord}>
      <PieChartOutlined />
    </NavLink>
  ),
  getItem(
    'Users',
    '2',
    <NavLink to={paths.users}>
      <UserOutlined />
    </NavLink>
  ),
  getItem(
    'Categories',
    '3',
    <NavLink to={paths.categories}>
      <GroupOutlined />
    </NavLink>
  ),
  getItem(
    'Sub Category',
    '4',
    <NavLink to={paths.subcategories}>
      <FileOutlined />
    </NavLink>
  ),
  getItem(
    'Appartments',
    '5',
    <NavLink to={paths.properites}>
      <HomeOutlined />
    </NavLink>
  ),
  getItem(
    'Compounds',
    '6',
    <NavLink to={paths.compounds}>
      <AppstoreOutlined />
    </NavLink>
  ),
  getItem(
    'Banners',
    '7',
    <NavLink to={paths.banners}>
      <FileJpgOutlined />
    </NavLink>
  ),
  getItem(
    'Featured',
    '8',
    <NavLink to={paths.features}>
      <StarOutlined />
    </NavLink>
  ),
];

const brokerItems = [
  getItem(
    'Broker',
    '1',
    <NavLink to={paths.brokers}>
      <PieChartOutlined />
    </NavLink>
  ),
  getItem(
    'Inbox',
    '2',
    <NavLink to={paths.inbox}>
      <UserOutlined />
    </NavLink>
  ),
];

export const genrateSidebarLinks = (role) => {
  switch (role) {
    case 'admin':
      return adminItems;
    case 'broker':
      return brokerItems;
    case 'user':
      return adminItems;
    default:
      break;
  }
};
