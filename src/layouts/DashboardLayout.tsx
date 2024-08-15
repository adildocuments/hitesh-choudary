import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";
import Drawer from "./Drawer";

const DashboardLayout = () => {
  return (
    <>
      <div className="flex">
        <Drawer />
        <div className="flex-1 flex flex-col">
          <Appbar />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
