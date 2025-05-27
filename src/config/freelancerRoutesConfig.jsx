import { FreelancerDashbaord } from "@/pages/dashboard/freelancer/FreelancerDashbaord";
import { Cast, FilePlus2, Home, LockKeyholeOpen, SquareChartGantt, Trash2, UserPen, VerifiedIcon, WalletCards, } from "lucide-react";
import FreelancerProfile from "@/pages/dashboard/freelancer/FreelancerProfile";


export const freelancerRoutesConfig = [
    {
        path: "/freelancer-dashboard",
        name: "Dashboard",
        icon: <Home className="mr-2 h-4 w-4" />,
        component: <FreelancerDashbaord />,
    },
    {
        path: "/freelancer-dashboard/edit-freelancer-profile",
        name: "Edit Profile",
        icon: <UserPen className="mr-2 h-4 w-4" />,
        component: <FreelancerProfile />,
    },
];
