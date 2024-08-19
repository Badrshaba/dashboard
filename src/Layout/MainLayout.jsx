import { Outlet } from "react-router-dom";
import Header from "../componants/Header";
import Sidebar from "../componants/SideBar/Sidebar";

const MainLayout = () => {
  return (
    <div>
      <div className="grid grid-cols-10">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-8">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
