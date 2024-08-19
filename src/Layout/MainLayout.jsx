import { Outlet } from "react-router-dom";
import Header from "../componants/Header";
import Sidebar from "../componants/Sidebar";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="row m-0">
        <div className=" col-2">
          <Sidebar />
        </div>
        <div className=" col-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
