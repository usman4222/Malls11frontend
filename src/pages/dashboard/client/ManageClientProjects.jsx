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
import { Label } from "@/components/SiteComponents/ui/label";
import { deleteClientProject, getAllClientProjects, updateClientProjectVisibility } from "../../../actions/client/projectAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboaordLoading from "../../../components/DashboardComponents/DashboaordLoading";

function ManageClientProjects({ type, project }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [formData, setFormData] = useState(project);
    const dispatch = useDispatch();
    const { clientProjects } = useSelector((state) => state.clientProjects || {});
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleVisibilityToggle = (projectId, currentVisibility) => {
        const newVisibility = currentVisibility === "public" ? "private" : "public";

        setProjects(prev =>
            prev.map(proj =>
                proj._id === projectId ? { ...proj, visibility: newVisibility } : proj
            )
        );

        dispatch(updateClientProjectVisibility(projectId, newVisibility));
        dispatch(getAllClientProjects());
        toast.success(`Project visibility updated to ${newVisibility}`);
    };


    const handleDelete = async (projectId) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            dispatch(deleteClientProject(projectId))
                .then(() => {
                    setProjects(prevProjects => prevProjects.filter(p => p._id !== projectId));
                    toast.success("Project deleted successfully!");
                })
                .catch((error) => {
                    toast.error("Failed to delete the project");
                    console.error("Delete error:", error);
                });
        }
    };

    useEffect(() => {
        setFormData(project);
        const fetchProjects = async () => {
            try {
                setLoading(true);
                await dispatch(getAllClientProjects());
            } catch (error) {
                toast.error("Failed to fetch projects");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [project, dispatch]);

    return (
        <div className="container mx-auto py-10 px-10 bg-[#F0EFEC]">
            <h1 className="text-3xl font-semibold mb-8">Manage {type}</h1>
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
                ) : clientProjects.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Title</TableHead>
                                <TableHead>Cost/Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Visibility</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clientProjects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                        <div className="space-y-1 w-[27rem]">
                                            <div className="font-medium">{project.title}</div>
                                            <div className="flex gap-3 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <span>
                                                        <Grid className="h-4 w-4" />
                                                    </span>
                                                    {project.category}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span>
                                                        <MapPin className="h-4 w-4" />
                                                    </span>
                                                    {project.location}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span>
                                                        <Calendar className="h-4 w-4" />
                                                    </span>
                                                    Posted on {new Date(project.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell >
                                        <div className="font-medium">
                                            {project.fixed_price !== null && project.fixed_price !== undefined ? (
                                                `$${project.fixed_price.toLocaleString()}`
                                            ) : project.hourly_rate ? (
                                                `$${project.hourly_rate.min.toLocaleString()} - $${project.hourly_rate.max.toLocaleString()}`
                                            ) : (
                                                "N/A"
                                            )}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {project.fixed_price !== null && project.fixed_price !== undefined
                                                ? "Fixed price"
                                                : project.project_type === "hourly"
                                                    ? "Hourly rate"
                                                    : ""}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                project.status === "Pending" ? "warning" : "success"
                                            }
                                            className="rounded-full"
                                        >
                                            {project.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={project.visibility === "public"}
                                                    onChange={() => handleVisibilityToggle(project._id, project.visibility)}
                                                />

                                                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-500 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                                <span className="ml-3 text-sm font-medium text-gray-900">
                                                    {project.visibility === "public" ? "public" : "private"}
                                                </span>
                                            </Label>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link to={`/client-dashboard/manage-project/project-proposals/${project._id}`}>
                                                <Button variant="default" className="bg-emerald-500 hover:bg-emerald-600">
                                                    View
                                                </Button>
                                            </Link>
                                            <Link to={`/client-dashboard/manage-project/edit-project/${project._id}`} >
                                                <Button variant="outline">
                                                    <Pencil />
                                                </Button>
                                            </Link>
                                            <Button onClick={() => handleDelete(project._id)} variant="outline" size="icon">
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

export default ManageClientProjects;
