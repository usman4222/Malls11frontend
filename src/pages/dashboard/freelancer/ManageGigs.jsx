import { useState, useEffect } from "react";
import { Search, Pencil, Trash2, MapPin, Grid, Calendar } from "lucide-react";
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
import { Badge } from "@/components/SiteComponents/ui/badge";
import { Card } from "@/components/SiteComponents/ui/card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboaordLoading from "../../../components/DashboardComponents/DashboaordLoading";
import { deleteGig, getAllFreelancerGigs } from "../../../actions/gig/gigAction";

function ManageGigs({ type, project }) {
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const { gigs } = useSelector((state) => state.gigs || {});
    const [loading, setLoading] = useState(false);


    // const handleVisibilityToggle = (projectId, currentVisibility) => {
    //     const newVisibility = currentVisibility === "public" ? "private" : "public";

    //     setProjects(prev =>
    //         prev.map(proj =>
    //             proj._id === projectId ? { ...proj, visibility: newVisibility } : proj
    //         )
    //     );

    //     dispatch(updateClientProjectVisibility(projectId, newVisibility));
    //     dispatch(getAllGigs());
    //     toast.success(`Project visibility updated to ${newVisibility}`);
    // };

    const handleDelete = async (gigId) => {
        if (window.confirm("Are you sure you want to delete this Gig?")) {
            dispatch(deleteGig(gigId))
                .then(() => {
                    toast.success("Gig deleted successfully!");
                    dispatch(getAllFreelancerGigs());
                })
                .catch((error) => {
                    toast.error("Failed to delete the gig");
                    console.error("Delete error:", error);
                });
        }
    };

    useEffect(() => {
        dispatch(getAllFreelancerGigs());
    }, []);

    return (
        <div className="container mx-auto py-10 px-10 bg-[#F0EFEC]">
            <h1 className="text-3xl font-semibold mb-8">My Gigs</h1>
            <ToastContainer />
            <Card className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                            placeholder="Search..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                </div>

                {loading ? (
                    <DashboaordLoading />
                ) : gigs.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {gigs.map((gig) => (
                                <TableRow key={gig.id}>
                                    <TableCell>
                                        <div className="space-y-1 w-[27rem]">
                                            <div className="font-medium">{gig.title}</div>
                                            <div className="flex gap-3 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <span>
                                                        <Grid className="h-4 w-4" />
                                                    </span>
                                                    {gig.category}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span>
                                                        <MapPin className="h-4 w-4" />
                                                    </span>
                                                    {gig.location}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span>
                                                        <Calendar className="h-4 w-4" />
                                                    </span>
                                                    Posted on {new Date(gig.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                gig.status === "Pending" ? "warning" : "success"
                                            }
                                            className="rounded-full"
                                        >
                                            {gig.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link to={`/freelancer-dashboard/preview-gigs/${gig._id}`}>
                                                <Button variant="default" className="bg-emerald-500 hover:bg-emerald-600">
                                                    View
                                                </Button>
                                            </Link>
                                            <Link to={`/client-dashboard/manage-project/edit-project/${gig._id}`} >
                                                <Button variant="outline">
                                                    <Pencil />
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={() => handleDelete(gig._id)}
                                                variant="outline" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-10 text-muted-foreground">
                        You don't have any {type} yet
                    </div>
                )}
            </Card>
        </div >
    );
}

export default ManageGigs;
