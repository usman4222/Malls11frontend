import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@/components/SiteComponents/ui/skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { Star, MapPin, Calendar, CheckCircle } from "lucide-react"
import { formatRelativeTime } from '../../../utils/formatRelativeTime';
import { getSingleProject } from '../../../actions/projects/projectAction';

const ViewProject = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { singleProject, loadingSingleProject } = useSelector((state) => state.allProjects);
    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
    const status = singleProject?.status || "Open";
    const [selectedStatus, setSelectedStatus] = useState(status);

    const handleStatusUpdate = (newStatus) => {
        setSelectedStatus(newStatus);
        setStatusDropdownOpen(false);

        // TODO: Dispatch your API update call here
        console.log("Updating status to:", newStatus);

        // Example toast
        toast.success(`Status updated to ${newStatus}`);
    };

    useEffect(() => {
        if (id) {
            dispatch(getSingleProject(id));
        }
    }, [dispatch, id]);


    if (loadingSingleProject || !singleProject) {
        return (
            <div className="p-10">
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-10 w-1/2" />
            </div>
        );
    }

    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{singleProject.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{singleProject.category}</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{singleProject.project_type}</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">{singleProject.duration}</span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">{singleProject.experience}</span>
                    <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full">{singleProject.language}</span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">{singleProject.location}</span>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Project Description</h2>
                    <p className="text-gray-700">{singleProject.project_des}</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Required Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {singleProject.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                    <div>
                        <p><span className="font-semibold">Project Type:</span> {singleProject.project_type}</p>
                        <p><span className="font-semibold">Management:</span> {singleProject.management_type}</p>
                        <p><span className="font-semibold">Experience Level:</span> {singleProject.experience}</p>
                        <p><span className="font-semibold">Visibility:</span> {singleProject.visibility}</p>
                    </div>
                    <div>
                        <p><span className="font-semibold">Fixed Price:</span> ${singleProject.fixed_price || 'N/A'}</p>
                        <p><span className="font-semibold">Hourly Rate:</span> {singleProject.hourly_rate ? `$${project.hourly_rate.min} - $${project.hourly_rate.max}` : 'N/A'}</p>
                        <p><span className="font-semibold">Status:</span> {singleProject.status}</p>
                        <p><span className="font-semibold">Posted:</span> {new Date(singleProject.created_at).toLocaleDateString()}</p>
                    </div>
                </div>

                {singleProject.project_doc && (
                    <div className="mt-6">
                        <a
                            href={singleProject.project_doc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            View Attached Document
                        </a>
                    </div>
                )}
                <div className="max-w-4xl mx-auto mt-6">
                    <div className="relative inline-block text-left">
                        <button
                            onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Update Status:    {selectedStatus}
                            <svg
                                className="-mr-1 ml-2 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {statusDropdownOpen && (
                            <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                <div className="py-1">
                                    {["Published", "In_progress", "Completed", "Cancelled", "Draft"]
                                        .filter((status) => status !== singleProject.status) // Exclude current status
                                        .map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusUpdate(status)}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                {status}
                                            </button>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
};

export default ViewProject;
