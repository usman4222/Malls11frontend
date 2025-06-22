import axiosInstance from "../../utils/axiosInstance";
import { GET_ALL_FREELANCERS_FAIL, GET_ALL_FREELANCERS_REQUEST, GET_ALL_FREELANCERS_SUCCESS } from "../../store/slices/freelancer/allFreelancers";
import { GET_MY_PROPOSALS_FAIL, GET_MY_PROPOSALS_REQUEST, GET_MY_PROPOSALS_SUCCESS, GET_SINGLE_PROPOSAL_FAIL, GET_SINGLE_PROPOSAL_REQUEST, GET_SINGLE_PROPOSAL_SUCCESS, UPDATE_FREELANCER_PROPOSAL_REQUEST, UPDATE_FREELANCER_PROPOSAL_SUCCESS, WITHDRAW_FREELANCER_PROPOSAL_FAIL, WITHDRAW_FREELANCER_PROPOSAL_REQUEST, WITHDRAW_FREELANCER_PROPOSAL_SUCCESS } from "../../store/slices/propsoal/freelancer/myProposalSlice";
import { UPDATE_CLIENT_PROJECT_FAIL } from "../../store/slices/client/projectSlice";


export const getAllFreelancers = () => async (dispatch) => {
    try {
        dispatch(GET_ALL_FREELANCERS_REQUEST());

        const { data } = await axiosInstance.get('/profile/get-all-freelancers');

        dispatch(GET_ALL_FREELANCERS_SUCCESS(data.freelancers));

        return data.freelancers;
    } catch (error) {
        dispatch(GET_ALL_FREELANCERS_FAIL(error.message || "Failed to fetch Freelancers"));
        throw error;
    }
};


export const getMyProposals = () => async (dispatch) => {
    try {
        dispatch(GET_MY_PROPOSALS_REQUEST());

        const response = await axiosInstance.get('/proposal/my-proposals');

        dispatch(GET_MY_PROPOSALS_SUCCESS(response.data.proposals));
    } catch (error) {
        console.error("Error fetching Freelancers:", error);
        dispatch(GET_MY_PROPOSALS_FAIL(error.message || "Failed to fetch Freelancers"));
    }
};


export const getSingleFreelancerProposal = (id) => async (dispatch) => {
    try {
        dispatch(GET_SINGLE_PROPOSAL_REQUEST());

        const { data } = await axiosInstance.get(`/proposal/get-proposal/${id}`);

        dispatch(GET_SINGLE_PROPOSAL_SUCCESS(data.proposal));

    } catch (error) {
        dispatch(GET_SINGLE_PROPOSAL_FAIL(error.message || "Failed to fetch proposal"));
    }
};



export const updateFreelancerProposal = (proposalId, updatedData) => async (dispatch) => {
    try {
        dispatch(UPDATE_FREELANCER_PROPOSAL_REQUEST());

        const response = await axiosInstance.patch(`/proposal/edit-proposal/${proposalId}`, updatedData);

        dispatch(UPDATE_FREELANCER_PROPOSAL_SUCCESS(response.data.updatedProposal));

        return response.data.updatedProposal;
    } catch (error) {
        console.error("Error updating proposal:", error);
        dispatch(UPDATE_CLIENT_PROJECT_FAIL(error.response?.data?.message));

        throw error;
    }
};


export const withdrawFreelancerProposal = (projectId) => async (dispatch) => {
    dispatch(WITHDRAW_FREELANCER_PROPOSAL_REQUEST());

    try {
        const { data } = await axiosInstance.patch(`/proposal/withdraw-proposal/${projectId}`);

        dispatch(WITHDRAW_FREELANCER_PROPOSAL_SUCCESS(data.data));
        return response.data.proposal;
    } catch (error) {
        dispatch(
            WITHDRAW_FREELANCER_PROPOSAL_FAIL(
                error.response?.data?.message || "Failed to update project status"
            )
        );
        throw error;
    }
};