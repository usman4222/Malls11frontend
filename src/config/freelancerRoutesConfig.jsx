import { FreelancerDashbaord } from "@/pages/dashboard/freelancer/FreelancerDashbaord";
import { Cast, FilePlus2, Home, LockKeyholeOpen, SquareChartGantt, Trash2, UserPen, VerifiedIcon, WalletCards, } from "lucide-react";
import FreelancerProfile from "@/pages/dashboard/freelancer/FreelancerProfile";
import ChangePassword from "@/pages/dashboard/client/ChangePassoword";
import DeleteProfile from "@/pages/dashboard/client/DeleteProfile";
import VerifyClient from "@/pages/dashboard/client/VerifyClient";
// import ManageClientProjects from "../pages/dashboard/client/ManageClientProjects";
import FavouriteProjects from "../pages/dashboard/freelancer/FavouriteProjects";
import FreelancerProposal from "../pages/dashboard/freelancer/FreelancerProposal";
import CreateGig from "../pages/dashboard/freelancer/CreateGig";
import EditProposalForm from "../pages/dashboard/freelancer/EditProposalForm";
import ManageGigs from "../pages/dashboard/freelancer/ManageGigs";
import GigPreview from "../pages/dashboard/freelancer/GigPreview";


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
    {
        path: "/freelancer-dashboard/manage-gigs",
        name: "Manage Gigs",
        icon: <FilePlus2 className="mr-2 h-4 w-4" />,
        component: <ManageGigs />,
    },
    {
        path: "/freelancer-dashboard/preview-gigs/:id",
        name: "Gig Preview",
        icon: <FilePlus2 className="mr-2 h-4 w-4" />,
        component: <GigPreview />,
    },
    {
        path: "/freelancer-dashboard/verify-freelancer",
        name: "Verify Client",
        icon: <VerifiedIcon className="mr-2 h-4 w-4" />,
        component: <VerifyClient />,
    },
    {
        path: "/freelancer-dashboard/create-gig",
        name: "Create Gig",
        icon: <VerifiedIcon className="mr-2 h-4 w-4" />,
        component: <CreateGig />,
    },
    {
        path: "/freelancer-dashboard/freelancer-proposal",
        name: "Proposals",
        icon: <VerifiedIcon className="mr-2 h-4 w-4" />,
        component: <FreelancerProposal />,
    },
    {
        path: "/freelancer-dashboard/change-password",
        name: "Change Password",
        icon: <UserPen className="mr-2 h-4 w-4" />,
        component: <ChangePassword />,
    },
    {
        path: "/freelancer-dashboard/favourite",
        name: "Favourite",
        icon: <VerifiedIcon className="mr-2 h-4 w-4" />,
        component: <FavouriteProjects />,
    },
    {
        path: "/freelancer-dashboard/delete-profile",
        name: "Delete Profile",
        icon: <UserPen className="mr-2 h-4 w-4" />,
        component: <DeleteProfile />,
    },
    {
        path: "/freelancer-dashboard/freelancer-proposal/editproposal/:id",
        component: <EditProposalForm />,
    },
];
