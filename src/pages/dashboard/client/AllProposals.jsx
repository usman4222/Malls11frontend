import { useState } from "react";
import DataTable from "@/components/DashboardComponents/ClientDashboardCompoents/Datatable";
import { ChevronDown, Mail, Grid, MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/SiteComponents/ui/badge";
import { Button } from "@/components/SiteComponents/ui/button";
import { Card } from "@/components/SiteComponents/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/SiteComponents/ui/dropdown-menu";
import Dialog from "@/components/DashboardComponents/ClientDashboardCompoents/Dialog";
// import { URLS } from "@/config/config";

//This component renders a table of project proposals with actions for hiring, status toggling, and disclaimers.

// Dummy proposals data, to be replaced with real data from backend or API
const proposals = [
  {
    id: 1,
    title: "Frontend",
    category: "Design & Creative",
    location: "Pakistan",
    postedAt: new Date(),
    costMin: 1500,
    costMax: 3000,
    rateType: "Fixed price",
    status: "Pending",
    isPublic: true,
  },
  {
    id: 2,
    title: "Backend Development",
    category: "Software Engineering",
    location: "United States",
    postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    costMin: 1000,
    costMax: 2500,
    rateType: "Hourly rate",
    status: "Approved",
    isPublic: false,
  },
];

// Function to toggle the visibility (public/private) status of a project
const togglePublicStatus = (id) => {
  console.log(`Toggled Public Status for Project ID: ${id}`);
};

// Columns configuration for DataTable
const columns = [
  {
    key: "title", // Column name
    label: "Title", // Column header text
    className: "w-[60%]",
    render: (row) => (
      <div>
        <div className="font-bold">{row.title}</div>
        <div className="flex items-center text-gray-500 gap-2 mt-1 text-sm">
          <Grid size={14} /> <span>{row.category}</span>
          <MapPin size={14} /> <span>{row.location}</span>
          <Calendar size={14} /> <span>{row.postedAt.toDateString()}</span>
        </div>
      </div>
    ),
  },
  {
    key: "cost", // Column name
    label: "Cost/Type", // Column header text
    className: "w-[15%]",
    render: (row) => (
      <div>
        <div className="font-medium">
          ${row.costMin.toLocaleString()} - ${row.costMax.toLocaleString()}
        </div>
        <div className="text-sm text-muted-foreground">{row.rateType}</div>
      </div>
    ),
  },
  {
    key: "status", // Column name
    label: "Status", // Column header text
    className: "w-[10%]",
    render: (row) => (
      <Badge
        variant={row.status === "Pending" ? "warning" : "success"}
        className="rounded-full"
      >
        {row.status}
      </Badge>
    ),
  },
  {
    key: "actions", // Column name
    label: "Actions", // Column header text
    className: "w-[30%]",
    render: (row) => {
      // State to control modal visibility for "Hire Now" and "Hire with Malls11"
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isMalls11ModalOpen, setIsMalls11ModalOpen] = useState(false);

      // Open and close handlers for modals
      const openModal = () => setIsModalOpen(true);
      const closeModal = () => setIsModalOpen(false);

      const openMalls11Modal = () => setIsMalls11ModalOpen(true);
      const closeMalls11Modal = () => setIsMalls11ModalOpen(false);

      // Handle navigation to Checkout page
      // Update your render function for the Actions column

      const proceedToCheckout = () => {
        console.log("Proceeding to Checkout");
        closeModal(); // Close the modal after proceeding
      };
    
      return (
        <div className="flex items-center gap-3">
          {/* Dropdown menu for hiring options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                className="bg-emerald-500 hover:bg-emerald-600 flex items-center gap-1"
              >
                Hire <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={openModal}>Hire Now</DropdownMenuItem>
              <DropdownMenuItem onClick={openMalls11Modal}>
                Hire with Malls11
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
    
          {/* Envelope Button to send an email */}
          <button className="p-2 border rounded-md shadow-sm bg-gray-100 hover:bg-gray-200 transition">
            <Mail size={18} className="text-gray-700" />
          </button>
    
          {/* Toggle Switch to change public status */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={row.isPublic} // Bind checkbox state to `isPublic` status
              onChange={() => togglePublicStatus(row.id)} // Toggle public status
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-500 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              {row.isPublic ? "Completed" : "InProgress"}{" "}
              {/* Display Public/Private status */}
            </span>
          </label>
    
          {/* Modal for "Hire Now" with disclaimer */}
          <Dialog
            isOpen={isModalOpen}
            title="Disclaimer"
            disclaimerType="danger" // Set disclaimer type to danger
            onClose={closeModal} // Pass closeModal function to close dialog
            onProceed={proceedToCheckout} // Pass proceedToCheckout function to navigate to checkout
          >
            By proceeding, you acknowledge that you are hiring on your own
            behalf. Malls11 is not responsible for any payments or the
            successful delivery of the project by the freelancer. It is your
            sole responsibility to ensure the terms of the agreement with the
            freelancer are met.
          </Dialog>
    
          {/* Modal for "Hire with Malls11" with disclaimer */}
          <Dialog
            isOpen={isMalls11ModalOpen}
            title="Disclaimer"
            disclaimerType="success"
            onClose={closeMalls11Modal}
            onProceed={proceedToCheckout}
            // navigateTo={URLS.CLIENT.CHECKOUT}
          >
            By proceeding, you acknowledge that you are hiring through Malls11.
            Malls11 will assist in the successful delivery of the project and
            manage payments.
          </Dialog>
        </div>
      );
    },
  },
];

// Main component for displaying proposals
const AllProposals = () => {
  return (
    <div className="container mx-auto py-10 px-10 bg-[#F0EFEC] h-[100vh]">
      <h1 className="text-3xl font-semibold mb-8">Manage Proposals</h1>
      <Card className="p-6">
        {/* DataTable component displaying proposals data */}
        <DataTable data={proposals} columns={columns} />
      </Card>
    </div>
  );
};

export default AllProposals;
