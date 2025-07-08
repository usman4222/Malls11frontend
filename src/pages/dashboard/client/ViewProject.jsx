import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@/components/SiteComponents/ui/skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { Star } from "lucide-react"
import { getSingleProject } from '../../../actions/projects/projectAction';
import { updateClientProjectStatus } from '../../../actions/client/projectAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createReview } from '../../../actions/reviews/reviewAction';


const ViewProject = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const { singleProject, loadingSingleProject } = useSelector((state) => state.allProjects);
    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
    const status = singleProject?.status || "Open";
    const [selectedStatus, setSelectedStatus] = useState(status);

    const handleStatusUpdate = async (newStatus) => {
        const prevStatus = selectedStatus;
        setSelectedStatus(newStatus);
        setStatusDropdownOpen(false);

        try {
            await dispatch(updateClientProjectStatus(singleProject._id, newStatus));
            toast.success(`Project status updated to ${newStatus}`);
            dispatch(getSingleProject(singleProject._id));

            if (newStatus === 'Completed') {
                setShowReviewModal(true);
            }
        } catch (error) {
            setSelectedStatus(prevStatus);
            toast.error("Failed to update project status.");
        }
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
            <ToastContainer />
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
                        <p><span className="font-semibold">Hourly Rate:</span> {singleProject.hourly_rate ? `$${singleProject.hourly_rate.min} - $${singleProject.hourly_rate.max}` : 'N/A'}</p>
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
                            onClick={() => {
                                if (singleProject.status !== 'Completed') {
                                    setStatusDropdownOpen(!statusDropdownOpen);
                                }
                            }}
                            className={`inline-flex justify-center w-full rounded-md border px-4 py-2 text-sm font-medium
        ${singleProject.status === 'Completed'
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 shadow-sm'
                                }`}
                            disabled={singleProject.status === 'Completed'}
                        >
                            Update Status: {selectedStatus}
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

                        {statusDropdownOpen && singleProject.status !== 'Completed' && (
                            <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                <div className="py-1">
                                    {["Published", "In_progress", "Completed", "Cancelled", "Draft"]
                                        .filter((status) => status !== singleProject.status)
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
            {showReviewModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`h-6 w-6 cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                        fill={star <= rating ? "#facc15" : "none"}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Review</label>
                            <textarea
                                rows={3}
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            ></textarea>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowReviewModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            >
                                Skip
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        await dispatch(createReview({
                                            project_id: singleProject._id,
                                            client_id: singleProject.client_id,
                                            freelancer_id: singleProject.freelancer_id,
                                            rating,
                                            review_text: reviewText,
                                        }));
                                        toast.success("Review submitted!");
                                        setShowReviewModal(false);
                                    } catch (error) {
                                        toast.error(error.response?.data?.message || "Failed to submit review");
                                    }
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewProject;
