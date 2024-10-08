import {
  FileOutlined,
  PieChartOutlined,
  FileJpgOutlined,
  UserOutlined,
  GroupOutlined,
  HomeOutlined,
  AppstoreOutlined,
  StarOutlined,
  AlignCenterOutlined,
} from '@ant-design/icons';
import paths from '../route/paths';
import { NavLink } from 'react-router-dom';
import {Sparkle, BriefcaseBusiness, WalletMinimal, Headset } from 'lucide-react';

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
    <NavLink end to={paths.dashbaord}>
      <PieChartOutlined />
    </NavLink>
  ),
  getItem(
    'Users',
    '2',
    <NavLink end to={paths.users}>
      <UserOutlined />
    </NavLink>
  ),
  getItem(
    'Categories',
    '3',
    <NavLink end to={paths.categories}>
      <GroupOutlined />
    </NavLink>
  ),
  getItem(
    'Sub Category',
    '4',
    <NavLink end to={paths.subcategories}>
      <FileOutlined />
    </NavLink>
  ),
  getItem(
    'Appartments',
    '5',
    <NavLink end to={paths.properites}>
      <HomeOutlined />
    </NavLink>
  ),
  getItem(
    'Compounds',
    '6',
    <NavLink end to={paths.compounds}>
      <AppstoreOutlined />
    </NavLink>
  ),
  getItem(
    'Banners',
    '7',
    <NavLink end to={paths.banners}>
      <FileJpgOutlined />
    </NavLink>
  ),
  getItem(
    'Featured',
    '8',
    <NavLink end to={paths.features}>
      <StarOutlined />
    </NavLink>
  ),
  getItem(
    'Other',
    '9',
    <NavLink end to={paths.other}>
      <AlignCenterOutlined />
    </NavLink>
  ),
  getItem(
    'requestEbrooker',
    '10',
    <NavLink end to={paths.requestEbrooker}>
      <StarOutlined />
    </NavLink>
  ),
  getItem(
    'Package',
    '11',
    <NavLink end to={paths.package}>
     <BriefcaseBusiness size={16} />
    </NavLink>
  ),
  getItem(
    'requestSales',
    '12',
    <NavLink end to={paths.requestSales}>
     <Sparkle size={16} />
    </NavLink>
  ),
  getItem(
    'contentUs',
    '13',
    <NavLink end to={paths.contentUs}>
     <Headset size={16} />
    </NavLink>
  ),
];
const salesItems = [
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
  getItem(
    'myWallet',
    '13',
    <NavLink to={paths.myWallet}>
      <WalletMinimal size={16}  />
    </NavLink>
  ),

];
const developerItems = [
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
    case 1:
      return adminItems;
    case 2:
      return salesItems;
    case 3:
      return adminItems; // Marketer
    case 4:
      return salesItems; // Sales
    case 5:
      return developerItems; // Developer
    default:
      break;
  }
};
