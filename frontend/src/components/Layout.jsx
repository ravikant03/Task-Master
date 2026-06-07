import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Sidebar/>
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
