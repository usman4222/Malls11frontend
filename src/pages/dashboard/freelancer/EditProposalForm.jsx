import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/SiteComponents/ui/button";
import { ExternalLink } from "lucide-react";
import { getSingleFreelancerProposal, updateFreelancerProposal } from "../../../actions/freelancers/freelancerAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import DashboaordLoading from "../../../components/DashboardComponents/DashboaordLoading";

const EditProposalForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { singleProposal, singleLoading, singleError } = useSelector(
        (state) => state.freelancerProposals
    );
    const { updateLoading } = useSelector((state) => state.updateProposal || {});

    const [coverLetter, setCoverLetter] = useState("");
    const [hourlyRate, setHourlyRate] = useState("");
    const [fixedPrice, setFixedPrice] = useState("");
    const [duration, setDuration] = useState("");

    useEffect(() => {
        if (id) {
            dispatch(getSingleFreelancerProposal(id));
        }
    }, [id, dispatch]);

    // Initialize form fields once singleProposal is loaded
    useEffect(() => {
        if (singleProposal) {
            setCoverLetter(singleProposal.cover_letter || "");
            setHourlyRate(singleProposal.hourly_rate ?? "");
            setFixedPrice(singleProposal.fixed_price ?? "");
            setDuration(singleProposal.duration || "");
        }
    }, [singleProposal]);

    const isHourly = hourlyRate !== "" && hourlyRate !== null && hourlyRate !== undefined && hourlyRate !== "0";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            cover_letter: coverLetter,
            hourly_rate: isHourly ? hourlyRate : undefined,
            fixed_price: !isHourly ? fixedPrice : undefined,
            duration,
        };

        try {
            const result = await dispatch(updateFreelancerProposal(id, updatedData));
            // Assuming result.payload has the response data
            console.log('dispatch result:', result);

            if (result.payload?.success === false) {
                toast.error(result.payload.message || "Failed to update proposal.");
            } else {
                toast.success("Proposal Updated Successfully!");
            }
        } catch (err) {
            // fallback catch
            console.log("err", err);

            const errorMessage =
                err.response?.data?.message || err.message || "Failed to update proposal.";
            toast.error(errorMessage);
        }
    };


    if (singleLoading) return <div><DashboaordLoading/></div>;
    if (!singleProposal) return <div>No proposal data found.</div>;

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
            <ToastContainer />
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Your Proposal</h2>
            <div className="space-y-6">
                {isHourly ? (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate</label>
                        <input
                            type="number"
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(e.target.value)}
                            placeholder="Hourly rate"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ) : (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Fixed Price</label>
                        <input
                            type="number"
                            value={fixedPrice}
                            onChange={(e) => setFixedPrice(e.target.value)}
                            placeholder="Enter your fixed price"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
                    <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Estimated hours"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                    <textarea
                        rows={6}
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Update your cover letter here..."
                    />
                </div>

                <Button
                    type="submit"
                    disabled={updateLoading}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
                >
                    {updateLoading ? "Updating..." : "Update Proposal"}
                    <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </form>
    );
};

export default EditProposalForm;
