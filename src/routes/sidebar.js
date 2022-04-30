import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiUser,
  FiCompass,
  FiGift,
  FiList,
  FiSettings,
} from 'react-icons/fi';
/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: '/dashboard', // the url
    icon: FiGrid, // icon
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/categories',
    icon: FiShoppingBag,
    name: 'Category Management',
  },
  {
    path: '/sub_categories',
    icon: FiList,
    name: 'Sub Category ',
  },
  {
    path: '/customers',
    icon: FiUsers,
    name: 'Customer Management',
  },
  {
    path: '/products',
    icon: FiCompass,
    name: 'Products Management',
  },
  {
    path: '/orders',
    icon: FiCompass,
    name: 'Orders',
  },

  {
    path: '/payments',
    icon: FiGift,
    name: 'Payments',
  },
  {
    path: '/our-teams',
    icon: FiUser,
    name: 'Team Management',
  },
  {
    path: '/roles',
    icon: FiUser,
    name: 'Roles Management',
  },
  {
    path: '/options',
    icon: FiUser,
    name: 'Options ',
  },
  {
    path: '/setting',
    icon: FiSettings,
    name: 'Setting',
  },
];

export default sidebar;
