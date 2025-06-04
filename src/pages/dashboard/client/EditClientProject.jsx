import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/SiteComponents/ui/card";
import { Separator } from "@/components/SiteComponents/ui/separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/SiteComponents/ui/form";
import { Button } from "@/components/SiteComponents/ui/button";
import { Input } from "@/components/SiteComponents/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/SiteComponents/ui/select";
import { Textarea } from "@/components/SiteComponents/ui/textarea";
import { SkillsSearch } from "@/components/DashboardComponents/ClientDashboardCompoents/SkillSearch";
// import { updateProject } from "../../../actions/client/projectAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/useAuth";
import { uploadFileToCloudinary } from "@/utils/uploadFileToCloudinary";
import { CategoriesSelectContent } from "../../../components/DashboardComponents/ClientDashboardCompoents/JobsCategories";
import ClientProjectSchema from "../../../schemas/ClientProjectSchema";
import { getAllCountries } from "../../../utils/geoData";
import languages from "../../../data/languages.json";
import { getSingleProject } from "../../../actions/projects/projectAction";

function EditClientProject() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [projectLoading, setProjectLoading] = useState(true);
    const [selectedProjectType, setSelectedProjectType] = useState("");
    const [countries, setCountries] = useState([]);
    const { user, token } = useAuth();
    const dispatch = useDispatch();
    const { id: projectId } = useParams();
    const { singleProject, loadingSingleProject } = useSelector((state) => state.clientProjects);

    console.log("singleProject", singleProject);



    const form = useForm({
        resolver: zodResolver(ClientProjectSchema),
        defaultValues: {
            title: "",
            category: "",
            project_type: "",
            management_type: "",
            duration: "",
            experience: "",
            location: "",
            language: "",
            project_doc: null,
            skills: [],
            project_des: "",
            fixed_price: null,
            min_hourly_rate: null,
            max_hourly_rate: null,
        },
    });

    useEffect(() => {
        setCountries(getAllCountries());
        fetchProjectData();
        dispatch(getSingleProject(projectId));
    }, [projectId]);


    const fetchProjectData = async () => {
        try {
            setProjectLoading(true);
            const project = await dispatch(getProjectById(projectId));

            if (project) {
                setSelectedProjectType(project.project_type);

                form.reset({
                    title: project.title,
                    category: project.category,
                    project_type: project.project_type,
                    management_type: project.management_type,
                    duration: project.duration,
                    experience: project.experience,
                    location: project.location,
                    language: project.language,
                    project_des: project.project_des,
                    skills: project.skills || [],
                    fixed_price: project.fixed_price || null,
                    min_hourly_rate: project.hourly_rate?.min || null,
                    max_hourly_rate: project.hourly_rate?.max || null,
                    // Note: project_doc would need special handling for file inputs
                });
            }
        } catch (error) {
            //   console.error("Error fetching project:", error);
            toast.error("Failed to load project data");
            navigate(-1); // Go back if error occurs
        } finally {
            setProjectLoading(false);
        }
    };

    const onSubmit = async (formData) => {
        try {
            setLoading(true);

            let documentUrl = formData.project_doc;
            // If a new file was uploaded
            if (formData.project_doc instanceof File) {
                documentUrl = await uploadFileToCloudinary(formData.project_doc);
            }

            const payload = {
                ...formData,
                id: projectId,
                fixed_price: selectedProjectType === "fixed" ? formData.fixed_price : null,
                hourly_rate: selectedProjectType === "hourly"
                    ? {
                        min: formData.min_hourly_rate,
                        max: formData.max_hourly_rate,
                    }
                    : null,
                userId: user?.currentUser?.id,
                project_doc: documentUrl,
                skills: formData.skills,
            };

            //   await dispatch(updateProject(payload));
            toast.success("Project updated successfully!");
            navigate("/client/projects"); // Redirect after successful update
        } catch (error) {
            console.log("error", error);
            toast.error("Failed to update project");
        } finally {
            setLoading(false);
        }
    };

    if (projectLoading) {
        return <div className="p-10">Loading project data...</div>;
    }

    return (
        <div className="p-10 bg-[#F0EFEC]">
            <ToastContainer />
            <h1 className="text-2xl font-semibold">Edit Project</h1>

            <Card className="mt-4">
                <CardHeader>
                    <h2 className="text-sm font-semibold">General</h2>
                </CardHeader>
                <Separator />
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title *</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Enter title" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Categories *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <CategoriesSelectContent />
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="project_type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Type *</FormLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    setSelectedProjectType(value);
                                                }}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select project type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="fixed">Fixed Project</SelectItem>
                                                    <SelectItem value="hourly">Hourly Project</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {selectedProjectType === "fixed" && (
                                    <div className="md:col-span-2">
                                        <FormField
                                            control={form.control}
                                            name="fixed_price"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Fixed Price *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Enter fixed price"
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    e.target.value === ""
                                                                        ? undefined
                                                                        : Number(e.target.value)
                                                                )
                                                            }
                                                            value={field.value ?? ""}
                                                            min={0}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}

                                {selectedProjectType === "hourly" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="min_hourly_rate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Min Hourly Rate *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Minimum hourly rate"
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    e.target.value === ""
                                                                        ? undefined
                                                                        : Number(e.target.value)
                                                                )
                                                            }
                                                            value={field.value ?? ""}
                                                            min={0}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="max_hourly_rate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Max Hourly Rate *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Maximum hourly rate"
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    e.target.value === ""
                                                                        ? undefined
                                                                        : Number(e.target.value)
                                                                )
                                                            }
                                                            value={field.value ?? ""}
                                                            min={0}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}

                                <FormField
                                    control={form.control}
                                    name="management_type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Management Type *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="self">Self</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Duration *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select duration" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="oneday">1 Day</SelectItem>
                                                    <SelectItem value="twoday">2 Days</SelectItem>
                                                    <SelectItem value="oneweek">1 Week</SelectItem>
                                                    <SelectItem value="2-3days">2-3 Days</SelectItem>
                                                    <SelectItem value="2-3hours">2-3 Hours</SelectItem>
                                                    <SelectItem value="2-3week">2-3 Weeks</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="experience"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Experience *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select experience" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="beginner">Beginner</SelectItem>
                                                    <SelectItem value="intermediate">
                                                        Intermediate
                                                    </SelectItem>
                                                    <SelectItem value="expert">Expert</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select location" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {countries.map((country) => (
                                                        <SelectItem key={country} value={country}>
                                                            {country}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="language"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Language *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select language" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {languages.map((lang) => (
                                                        <SelectItem key={lang} value={lang}>
                                                            {lang}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="project_des"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description *</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Enter description"
                                                className="min-h-[200px]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="mt-4">
                <CardHeader>
                    <h2 className="text-sm font-semibold">Attachment *</h2>
                </CardHeader>
                <Separator />
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="project_doc"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Attach Project Document / Image</FormLabel>
                                            <FormControl>
                                                <div className="flex flex-col gap-2">
                                                    <Input
                                                        type="file"
                                                        accept="image/*,.pdf,.doc,.docx"
                                                        onChange={(e) =>
                                                            field.onChange(e.target.files?.[0] || null)
                                                        }
                                                    />
                                                    {typeof field.value === 'string' && (
                                                        <div className="text-sm text-gray-500">
                                                            Current file: {field.value}
                                                        </div>
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="mt-4">
                <CardHeader>
                    <h2 className="text-sm font-semibold">Skills</h2>
                </CardHeader>
                <Separator />
                <CardContent className="mt-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                name="skills"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Skills *</FormLabel>
                                        <FormControl>
                                            <SkillsSearch
                                                selectedSkills={field.value || []}
                                                onSkillsChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    className="mt-4 cursor-pointer"
                                    disabled={loading}
                                >
                                    {loading ? "Updating..." : "Update Project"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="mt-4"
                                    onClick={() => navigate(-1)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default EditClientProject;