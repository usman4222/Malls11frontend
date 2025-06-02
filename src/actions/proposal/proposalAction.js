import { CREATE_PROPOSAL_FAIL, CREATE_PROPOSAL_REQUEST, CREATE_PROPOSAL_SUCCESS } from "../../store/slices/propsoal/proposalSlice";
import axiosInstance from "../../utils/axiosInstance";

export const createProposal = (proposalData) => async (dispatch) => {
    try {
        dispatch(CREATE_PROPOSAL_REQUEST());

        const { data } = await axiosInstance.post("/proposal/send-proposal", proposalData);
        console.log("data",data);

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
