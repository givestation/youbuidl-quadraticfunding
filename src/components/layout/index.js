import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ContextProvider from "../../utils/ContextProvider";

const Layout = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <ContextProvider>
      <div className="min-h-screen bg-Ghost-White font-Poppins md:py-4 md:px-6 flex flex-col">
        <div className="sticky top-0 left-0 right-0 z-40">
          <Header setShowSideBar={setShowSideBar} />
        </div>
        <div className="flex-1 relative duration-300 ml-0 md:ml-66 flex justify-center md:py-4">
          <Sidebar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
          <div className="w-full px-4 sm:px-6 my-4 md:p-0">
            <Outlet />
          </div>
        </div>
      </div>
    </ContextProvider>
  );
};

export default Layout;
