import { GET_SINGLE_PROPOSAL_FAIL, GET_SINGLE_PROPOSAL_REQUEST, GET_SINGLE_PROPOSAL_SUCCESS } from "../../store/slices/client/projectSlice";
import { UPDATE_CLIENT_PROPOSAL_STATUS_FAIL, UPDATE_CLIENT_PROPOSAL_STATUS_REQUEST, UPDATE_CLIENT_PROPOSAL_STATUS_SUCCESS } from "../../store/slices/propsoal/client/proposalSlice";
import { CREATE_PROPOSAL_FAIL, CREATE_PROPOSAL_REQUEST, CREATE_PROPOSAL_SUCCESS } from "../../store/slices/propsoal/proposalSlice";
import axiosInstance from "../../utils/axiosInstance";

export const createProposal = (proposalData) => async (dispatch) => {
    try {
        dispatch(CREATE_PROPOSAL_REQUEST());

        const { data } = await axiosInstance.post("/proposal/send-proposal", proposalData);
        console.log("data", data);

        if (!data.success) {
            throw new Error(data.message || "Failed to send proposal");
        }


        dispatch(CREATE_PROPOSAL_SUCCESS(data));
        return data;
    } catch (error) {
        dispatch(
            CREATE_PROPOSAL_FAIL(
                error.response?.data?.message || error.message || "Failed to send proposal"
            )
        );
        throw error;
    }
};



export const updateProposalStatus = (proposalId, newStatus) => async (dispatch) => {
    dispatch(UPDATE_CLIENT_PROPOSAL_STATUS_REQUEST());

    try {
        const { data } = await axiosInstance.patch(`/project/update-proposal-status/${proposalId}`, { status: newStatus });

        dispatch(UPDATE_CLIENT_PROPOSAL_STATUS_SUCCESS(data));

        return data;
    } catch (error) {
        dispatch(
            UPDATE_CLIENT_PROPOSAL_STATUS_FAIL(
                error.response?.data?.message || "Failed to update project status"
            )
        );
        throw error;
    }
};


export const getSingleProposal = (proposalId) => async (dispatch) => {
    try {
        dispatch(GET_SINGLE_PROPOSAL_REQUEST());
        
        const { data } = await axiosInstance.get(`/project/proposal/${proposalId}`);

        dispatch(GET_SINGLE_PROPOSAL_SUCCESS(data));

        return data;
    } catch (error) {
        dispatch(GET_SINGLE_PROPOSAL_FAIL(error.response?.data?.message || error.message));
        throw error;
    }
};