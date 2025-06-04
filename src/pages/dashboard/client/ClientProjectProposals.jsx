import { useState, useEffect, useMemo } from "react";
import { Search, MapPin, Calendar, ChevronDown, Mail } from "lucide-react";
import { Button } from "@/components/SiteComponents/ui/button";
import { Input } from "@/components/SiteComponents/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/SiteComponents/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/SiteComponents/ui/dropdown-menu";
import { Badge } from "@/components/SiteComponents/ui/badge";
import { Card } from "@/components/SiteComponents/ui/card";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboaordLoading from "../../../components/DashboardComponents/DashboaordLoading";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/SiteComponents/ui/select";
import Dialog from "../../../components/DashboardComponents/Dialoge";
import { getAllProjectProposals } from "../../../actions/client/projectAction"
import { formatRelativeTime } from "../../../utils/formatRelativeTime";
import { updateProposalStatus } from "../../../actions/proposal/proposalAction";


const ClientProjectProposals = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const dispatch = useDispatch();
    const { id: projectId } = useParams();
    const { projectProposals, loading, error } = useSelector((state) => state.clientProjects);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMalls11ModalOpen, setIsMalls11ModalOpen] = useState(false);

    useEffect(() => {
        if (projectId) {
            dispatch(getAllProjectProposals(projectId));
        }
    }, [projectId]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openMalls11Modal = () => setIsMalls11ModalOpen(true);
    const closeMalls11Modal = () => setIsMalls11ModalOpen(false);

    const proceedToCheckout = () => {
        closeModal();
    };

    const handleStatusToggle = async (proposalId, currentStatus) => {
        const newStatus = currentStatus === "pending" ? "accepted" : "pending";
        try {
            await dispatch(updateProposalStatus(proposalId, newStatus));
            await dispatch(getAllProjectProposals(projectId));
            toast.success(`Proposal status updated to ${newStatus}`);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update status");
        }
    };

    const filteredProposals = useMemo(() => {
        if (!projectProposals) return [];

        let filtered = [...projectProposals];

        // Filter by search query
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter(proposal =>
                proposal.freelancer_id?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                proposal.cover_letter?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort proposals
        switch (sortBy) {
            case "newest":
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "oldest":
                filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case "cost-high":
                filtered.sort((a, b) => (b.hourly_rate || b.fixed_price || 0) - (a.hourly_rate || a.fixed_price || 0));
                break;
            case "cost-low":
                filtered.sort((a, b) => (a.hourly_rate || a.fixed_price || 0) - (b.hourly_rate || b.fixed_price || 0));
                break;
            default:
                break;
        }

        return filtered;
    }, [projectProposals, searchQuery, sortBy]);


    return (
        <div className="container mx-auto py-10 px-10 bg-[#F0EFEC] min-h-[100vh]">
            <ToastContainer />
            <h1 className="text-3xl font-semibold mb-8">Project Proposals</h1>

            <Card className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                            placeholder="Search proposals..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-muted-foreground">Sort by:</label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="oldest">Oldest</SelectItem>
                                <SelectItem value="cost-high">Highest Cost</SelectItem>
                                <SelectItem value="cost-low">Lowest Cost</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <DashboaordLoading />
                    </div>
                ) : projectProposals.length > 0 ? (
                    <>
                        <div className="mb-4 text-sm text-muted-foreground">
                            Showing {projectProposals.length} proposal{projectProposals.length !== 1 ? 's' : ''}
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[300px]">Title</TableHead>
                                    <TableHead>Cost/Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProposals.map((proposal) => (
                                    <TableRow key={proposal._id}>
                                        <TableCell>
                                            <div className="space-y-1 w-[27rem]">
                                                <p className="text-xl font-[500]">{proposal.project_id?.title || "No Title"}</p>
                                                <div className="flex gap-3 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-4 w-4" />
                                                        {proposal.freelancer_id?.country || "Unknown location"}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {proposal.createdAt
                                                            ? formatRelativeTime(proposal.createdAt)
                                                            : "Unknown date"}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="font-medium">
                                                    {proposal.hourly_rate != null
                                                        ? "Hourly Rate"
                                                        : proposal.fixed_price != null
                                                            ? "Fixed Rate"
                                                            : "Cost not available"}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {proposal.hourly_rate != null
                                                        ? `$${proposal.hourly_rate}`
                                                        : proposal.fixed_price != null
                                                            ? `$${proposal.fixed_price}`
                                                            : "N/A"}
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                variant={
                                                    proposal.status?.toLowerCase() === "pending" ? "warning" : "success"
                                                }
                                                className="rounded-full border-none"
                                            >
                                                {proposal.status || "Unknown"}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="text-right">
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

                                                <Link className="p-2 border rounded-md shadow-sm bg-gray-100 hover:bg-gray-200 transition" to={`/client-dashboard/all-proposals/view-proposal/${proposal._id}`}>
                                                    <Mail size={18} className="text-gray-700" />
                                                </Link>

                                                {/* Toggle Switch to change public status */}
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={proposal.status === "accepted"}
                                                        onChange={() => handleStatusToggle(proposal._id, proposal.status)}
                                                        disabled={proposal.status === "accepted"}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-500 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                                    <span className="ml-3 text-sm font-medium text-gray-900">
                                                        {proposal.status === "accepted" ? "Accepted" : "Pending"}
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
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Mail className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">No proposals yet</h3>
                        <p className="text-muted-foreground">
                            This project hasn't received any proposals yet. Check back later.
                        </p>
                    </div>
                )}

                {/* Modals */}
                <Dialog
                    isOpen={isModalOpen}
                    title="Disclaimer"
                    disclaimerType="danger"
                    onClose={closeModal}
                    onProceed={proceedToCheckout}
                >
                    By proceeding, you acknowledge that you are hiring on your own
                    behalf. Malls11 is not responsible for any payments or the
                    successful delivery of the project by the freelancer.
                </Dialog>

                <Dialog
                    isOpen={isMalls11ModalOpen}
                    title="Disclaimer"
                    disclaimerType="success"
                    onClose={closeMalls11Modal}
                    onProceed={proceedToCheckout}
                >
                    By proceeding, you acknowledge that you are hiring through Malls11.
                    Malls11 will assist in the successful delivery of the project and
                    manage payments.
                </Dialog>
            </Card>
        </div>
    );
};

export default ClientProjectProposals;