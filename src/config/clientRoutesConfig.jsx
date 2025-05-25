import { ClientDashboard } from "@/pages/dashboard/client/ClientDashboard";
import ChangePassword from "@/pages/dashboard/client/ChangePassoword";
import EditProfileForm from "@/pages/dashboard/client/ClientProfile";
import VerifyClient from "@/pages/dashboard/client/VerifyClient";
import ClientProject from "@/pages/dashboard/client/ClientProject";
import AllProposals from "@/pages/dashboard/client/AllProposals";
import DeleteProfile from "@/pages/dashboard/client/DeleteProfile";
import CientMeetings from "@/pages/dashboard/client/CientMeetings";
import AllProjects from "@/pages/dashboard/client/AllProjects";
import ClientServices from "@/pages/dashboard/client/ClientServices";
import { Cast, FilePlus2, Home, LockKeyholeOpen, SquareChartGantt, Trash2, UserPen, VerifiedIcon, WalletCards, } from "lucide-react";
import ManageClientProjects from "../pages/dashboard/client/ManageClientProjects";


export const clientRoutesConfig = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <Home className="mr-2 h-4 w-4" />,
    component: <ClientDashboard />,
  },
  {
    path: "/dashboard/change-password",
    name: "Change Password",
    icon: <LockKeyholeOpen className="mr-2 h-4 w-4" />,
    component: <ChangePassword />,
  },
  {
    path: "/dashboard/edit-profile",
    name: "Edit Profile",
    icon: <UserPen className="mr-2 h-4 w-4" />,
    component: <EditProfileForm />,
  },
  {
    path: "/dashboard/verify-client",
    name: "Verify Client",
    icon: <VerifiedIcon className="mr-2 h-4 w-4" />,
    component: <VerifyClient />,
  },
  {
    path: "/dashboard/client-project",
    name: "Client Project",
    icon: <FilePlus2 className="mr-2 h-4 w-4" />,
    component: <ClientProject />,
  },
  {
    path: "/dashboard/manage-project",
    name: "Manage Project",
    icon: <FilePlus2 className="mr-2 h-4 w-4" />,
    component: <ManageClientProjects />,
  },
  {
    path: "/dashboard/all-proposals",
    name: "All Proposals",
    icon: <SquareChartGantt className="mr-2 h-4 w-4" />,
    component: <AllProposals />,
  },
  {
    path: "/dashboard/cient-meetings",
    name: "Cient Meetings",
    icon: <Cast className="mr-2 h-4 w-4" />,
    component: <CientMeetings />,
  },
  {
    path: "/dashboard/all-projects",
    name: "All Projects",
    icon: <SquareChartGantt className="mr-2 h-4 w-4" />,
    component: <AllProjects />,
  },
  {
    path: "/dashboard/services",
    name: "Services",
    icon: <WalletCards className="mr-2 h-4 w-4" />,
    component: <ClientServices />,
  },
  {
    path: "/dashboard/delete-profile",
    name: "Delete Profile",
    icon: <Trash2 className="mr-2 h-4 w-4" />,
    component: <DeleteProfile />,
  },
];
