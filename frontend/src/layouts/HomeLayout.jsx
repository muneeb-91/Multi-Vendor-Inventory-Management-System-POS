import { Outlet } from "react-router-dom";
import HomeNavbar from "../components/home/HomeNavbar";
import HomeFooter from "../components/home/HomeFooter";

const HomeLayout = () => (
  <div className="min-h-screen flex flex-col bg-tertiary">
    <HomeNavbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <HomeFooter />
  </div>
);

export default HomeLayout;
