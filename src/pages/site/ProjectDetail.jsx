import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ExploreCard from '../../components/SiteComponents/exploreCard';
import SectionWrapper from '../../components/SiteComponents/SectionWrapper';
import BreadCrumb2 from '../site/explor/BreadCrumb2';
import { getSingleProject } from '../../actions/projects/projectAction';
import SpinnerSquare from '../../components/SiteComponents/LoadingComponent/SpinnerSquare';
import { BarChart3, Clock, DollarSign, ExternalLink, Languages, MapPin, ThumbsUp, User } from 'lucide-react';
import { Button } from '../../components/SiteComponents/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../components/SiteComponents/ui/card";
import SendProposalForm from './SendProposalForm';

const ProjectDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { project, loading } = useSelector((state) => state.singleProject);

    console.log("project details", project);


    useEffect(() => {
        dispatch(getSingleProject(id));
    }, [dispatch, id]);

    return (
        <div className="mt-16 flex gap-5 flex-col">
            <div className="py-6 bg-[#F1FCFA]">
                <SectionWrapper className="sm:px-20 px-10">
                    <BreadCrumb2
                        startRoute={"/"}
                        startRoutesName={"Home"}
                        pages={["Projects", "Projects Details"]}
                    />
                </SectionWrapper>
            </div>
            <ExploreCard />
            {loading ? (
                <SpinnerSquare />
            ) : (
                <>
                    <div className="flex flex-col lg:flex-row px-4 sm:px-6 lg:px-20 overflow-x-hidden w-full">
                        <div className="min-h-screen w-full">
                            {/* Header Section */}
                            <div>
                                <div className="flex flex-col lg:flex-row gap-8">
                                    {/* Left Content */}
                                    <div className=" w-full px-4">
                                        {/* Project Details Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                            {project && [
                                                {
                                                    icon: MapPin,
                                                    label: "Freelancer location",
                                                    value: project.location || "N/A",
                                                },
                                                {
                                                    icon: DollarSign,
                                                    label: "Project Type",
                                                    value: project.project_type || "N/A",
                                                },
                                                {
                                                    icon: Clock,
                                                    label: "Duration",
                                                    value: project.duration || "N/A",
                                                },
                                                {
                                                    icon: ThumbsUp,
                                                    label: "Experience",
                                                    value: project.experience || "N/A",
                                                },
                                                {
                                                    icon: Languages,
                                                    label: "Languages",
                                                    value: project.language || "N/A",
                                                }
                                            ].map((item, index) => {
                                                const IconComponent = item.icon;
                                                return (
                                                    <div key={index} className="flex items-start gap-3">
                                                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                                                            <IconComponent className="w-6 h-6 text-gray-600" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-sm font-medium text-gray-900 mb-1">{item.label}</h3>
                                                            <p className="text-sm text-gray-600">{item.value}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="max-w-7xl mx-auto px-4 py-8">
                                <div className="flex flex-col lg:flex-row gap-8">
                                    {/* Project Description */}
                                    <div className="flex-1">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Description</h2>
                                            <p className="text-black pt-5 px-4 sm:px-0 text-sm md:text-[16px]">
                                                {project.project_des || "No description available."}
                                            </p>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-gray-300 my-6"></div>

                                        {/* Project Attachment */}
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Attachment</h2>
                                            <div className="pt-5 px-4 sm:px-0 text-sm md:text-[16px] text-black">
                                                {project.project_doc ? (
                                                    <a
                                                        href={project.project_doc}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        Download Document
                                                    </a>
                                                ) : (
                                                    "No Attachment available."
                                                )}
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-gray-300 my-6"></div>

                                        {/* Skills Required */}
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills Required</h2>
                                            <div className="flex gap-2 flex-wrap">
                                                {Array.isArray(project.skills)
                                                    ? project.skills.map((skill, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="bg-[#E9E9E9] text-gray-500 cursor-pointer mt-3 transition-all ease-in-out hover:text-black w-fit text-sm hover:scale-120 font-medium px-6 py-2 rounded-full"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))
                                                    : project.category && (
                                                        <span className="bg-primary-custom text-white cursor-pointer mt-3 transition-all ease-in-out hover:text-white w-fit text-sm hover:scale-120 font-medium px-6 py-2 rounded-full">
                                                            {project.category}
                                                        </span>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-gray-300 my-6"></div>
                            <SendProposalForm project={project} />
                        </div>
                        {/* Right Sidebar */}
                        <div className="w-full lg:w-80">

                            <div className="w-full lg:w-80 mb-20">
                                <Card className="bg-white ">
                                    <CardContent className="p-6">
                                        {/* Price Section */}
                                        <div className="text-right mb-6">
                                            {project.fixed_price ? (
                                                <>
                                                    <div className="text-2xl font-bold text-gray-900 mb-1">
                                                        ${project.fixed_price}
                                                    </div>
                                                    <div className="text-sm text-gray-600">Fixed</div>
                                                </>
                                            ) : project.hourly_rate ? (
                                                <>
                                                    <div className="text-2xl font-bold text-gray-900 mb-1">
                                                        ${project.hourly_rate.min} - ${project.hourly_rate.max}
                                                    </div>
                                                    <div className="text-sm text-gray-600">Hourly</div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="text-2xl font-bold text-gray-900 mb-1">N/A</div>
                                                    <div className="text-sm text-gray-600">No payment info</div>
                                                </>
                                            )}
                                        </div>

                                        {/* Submit Proposal Button */}
                                        <div className="space-y-3 mb-6 ">
                                            <Button className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold tracking-wider">
                                                SEND MESSAGE
                                            </Button>
                                        </div>

                                        {/* About Seller Section */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Seller</h3>
                                            <div className="flex items-center gap-3 mb-5">
                                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                                    <img
                                                        src={project?.client_id?.profile_image}
                                                        alt="DonStar Group profile"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{project?.client_id?.username}</div>
                                                </div>
                                            </div>

                                            {/* Seller Details */}
                                            <div className="grid grid-cols-3 gap-2 text-sm mb-5">
                                                <div>
                                                    <div className="text-gray-500 mb-1">Location</div>
                                                    <div className="font-medium">{project?.client_id?.country}</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-500 mb-1">Employees</div>
                                                    <div className="font-medium">10-20</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-500 mb-1">Categories</div>
                                                    <div className="font-medium">{project?.client_id?.category}</div>
                                                </div>
                                            </div>

                                            {/* Contact Info */}
                                            <div className="grid grid-cols-3 gap-2 text-sm mb-5">
                                                <div>
                                                    <div className="text-gray-500 mb-1">Whatsapp No.</div>
                                                    <div className="font-medium">{project?.client_id?.whatsapp_no}</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-500 mb-1">Email</div>
                                                    <div className="font-medium">{project?.client_id?.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                </>
            )
            }
        </div >
    );
};

export default ProjectDetail;
