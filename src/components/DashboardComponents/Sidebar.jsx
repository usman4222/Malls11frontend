import { clientRoutesConfig } from "@/config/clientRoutesConfig";
import { cn } from "@/lib/utils";
import { Button } from "../SiteComponents/ui/button";
import { LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { handleLogout } from "@/utils/logoutHelper";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Sidebar({ className }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user || null);
  const token = user?.token

  const onLogoutClick = () => {
    handleLogout(dispatch, token);
  }

  return (
    <div className={cn("flex flex-col h-full bg-white border-r", className)}>
      <ToastContainer />
      <div className="flex items-center justify-center p-4 border-b">
        <img src="/path-to-your-logo.png" alt="Logo" className="h-10 w-auto" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        {clientRoutesConfig.map(({ path, name, icon }) => (
          <NavItem key={path} to={path} icon={icon} activePath={location.pathname}>
            {name}
          </NavItem>
        ))}
      </div>
      <div className="mt-auto p-4">
        <Button onClick={onLogoutClick} className="w-full bg-red-400 cursor-pointer" variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}

function NavItem({ to, icon, children, activePath }) {
  const isActive = activePath === to || activePath.startsWith(to + "/");

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 transition-all",
        isActive ? "bg-gray-200 font-semibold text-black" : "text-gray-700 hover:bg-gray-100"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
