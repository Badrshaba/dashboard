import { Outlet } from "react-router-dom";
import Header from "../componants/Header";
import Sidebar from "../componants/SideBar/Sidebar";

const MainLayout = () => {
  return (
    <div>
      <div className="grid">
        <div className=" grid-cols-3">
          <Sidebar />
        </div>
        <div className=" col-9">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
