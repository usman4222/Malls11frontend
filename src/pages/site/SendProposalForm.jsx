import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/SiteComponents/ui/button";
import { ExternalLink } from "lucide-react";
import { createProposal } from "../../actions/proposal/proposalAction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendProposalForm = ({ project }) => {
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.createProposal);

    const [coverLetter, setCoverLetter] = useState("");
    const [hourlyRate, setHourlyRate] = useState("");
    const [fixedPrice, setFixedPrice] = useState("");
    const [duration, setDuration] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const proposalData = {
            project_id: project._id,
            cover_letter: coverLetter,
            hourly_rate: project.project_type === "hourly" ? hourlyRate : undefined,
            fixed_price: project.project_type === "fixed" ? fixedPrice : undefined,
            duration,
        };

        try {
            await dispatch(createProposal(proposalData));
            toast.success("Proposal Submitted Successfully!");

            // Reset form fields
            setCoverLetter("");
            setHourlyRate("");
            setFixedPrice("");
            setDuration("");
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || err.message || "Failed to submit proposal.";
            toast.error(errorMessage);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
            <ToastContainer />
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Form Section */}
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Send Your Proposal</h2>

                    <div className="space-y-6">
                        {project.project_type === "fixed" ? (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Your Fixed Price</label>
                                <input
                                    type="number"
                                    value={fixedPrice}
                                    onChange={(e) => setFixedPrice(e.target.value)}
                                    placeholder="Enter your fixed price"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Price</label>
                                <input
                                    type="number"
                                    value={hourlyRate}
                                    onChange={(e) => setHourlyRate(e.target.value)}
                                    required
                                    placeholder="Hourly rate"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                                placeholder="Estimated hours"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                            <textarea
                                rows={6}
                                value={coverLetter}
                                required
                                onChange={(e) => setCoverLetter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Write your cover letter here..."
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 cursor-pointer"
                        >
                            {loading ? "Submitting..." : "Submit a Proposal"}
                            <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SendProposalForm;
