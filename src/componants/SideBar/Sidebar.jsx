import { Apple, Headset, House, Store, User } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import './sidebar.css';

const DATA = [
  {
    title: 'Dashboard',
    icon: <House size={18} />,
    route: '/',
  },

  {
    title: 'Bunners',
    icon: <Store size={18} />,
    route: '/bunners',
  },
  {
    title: 'Users',
    icon: <User size={18} />,
    route: '/users',
  },
  {
    title: 'Brookers',
    icon: <Headset size={18} />,
    route: '/brookers',
  },
  {
    title: 'Developers',
    icon: <Apple size={18} />,
    route: '/developers',
  },
  {
    title: 'Categories',
    icon: <Store size={18} />,
    route: '/categories',
  },
  {
    title: 'Customers',
    icon: <Headset size={18} />,
    route: '/customers',
  },
  {
    title: 'Compounds',
    icon: <Apple size={18} />,
    route: '/compounds',
  },
  {
    title: 'Sub Categories',
    icon: <Store size={18} />,
    route: '/sub-categories',
  },

  {
    title: 'Features',
    icon: <Apple size={18} />,
    route: '/features',
  },
];
const Sidebar = () => {
  // const [open, setOpen] = useState("");
  return (
    <div className='flex justify-start flex-col items-start'>
      {/* <div className="flex mx-auto pt-10 space-x- 1 items-center">
  <img src={img} width={45} alt="logo" />
  <h2 className="text-black font-bold text-3xl">Rizz</h2>
</div>
  <li className="uppercase text-gray-600 text-xs pt-8 text-center pl-6">Main Menu</li> */}
      <div className=' mx-auto pt-8 '>
        <Link to={'/'}>
          <img
            src='https://resido.w-manage.org/assets/images/logo/logo.png'
            width={150}
            alt='logo'
          />
        </Link>
      </div>
      <ul className=' flex justify-center flex-col w-full px-2 mt-7 space-y-2'>
        {/* {Data?.map((ele,index)=>(
  <Select title={ele.title} open={open} setOpen={setOpen} icon={<House size={13} color="#696363" />} children={ele.listItems} key={index}/>
))} */}
        <div className=' flex flex-col space-y-2 mt-3'>
          {DATA.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.route}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center space-x-2 py-4 px-6 mx-auto w-11/12 text-base text-white font-semibold bg-[#087c7c] rounded hover:bg-[#a6b2b2d1]'
                  : 'flex items-center space-x-2 py-4 px-6 mx-auto w-11/12 text-base hover:text-white font-semibold  rounded hover:bg-[#a6b2b2d1]'
              }
              //  className="flex items-center space-x-2 py-3 px-4 mx-auto text-base hover:text-white font-semibold  active:bg-[#087c7c] "
            >
              {' '}
              <span> {item.icon}</span> <span>{item.title}</span>
            </NavLink>
          ))}
          {/* <div className=" rounded px-3  hover:bg-[#087c7c] ">
          <Link
            to={"/"}
            className="flex items-center space-x-2 py-3 px-4 mx-auto text-base hover:text-white font-semibold"
          >
            {" "}
            <span>
              {" "}
              <House size={18} />
            </span>{" "}
            <span>Dashboard</span>
          </Link>
        </div>
        <div className=" rounded px-3  hover:bg-[#087c7c] ">
          <Link
            to={"/about"}
            className="flex items-center space-x-2 py-3 px-4  text-base hover:text-white font-semibold"
          >
            {" "}
            <span>
              {" "}
              <Store size={15} />
            </span>{" "}
            <span>About</span>
          </Link>
        </div>
        <div className=" rounded px-3  hover:bg-[#087c7c] ">
          <Link
            to={"/contact"}
            className="flex items-center space-x-2 py-3 px-4 text-base hover:text-white font-semibold"
          >
            {" "}
            <span>
              {" "}
              <Headset size={15} />
            </span>{" "}
            <span>Contact</span>
          </Link>
        </div>*/}
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
