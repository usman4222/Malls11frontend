import { CREATE_PROJECT_FAIL, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_CLIENT_PROJECT_FAIL, DELETE_CLIENT_PROJECT_REQUEST, DELETE_CLIENT_PROJECT_SUCCESS, GET_CLIENT_PROJECTS_FAIL, GET_CLIENT_PROJECTS_REQUEST, GET_CLIENT_PROJECTS_SUCCESS, UPDATE_CLIENT_PROJECT_FAIL, UPDATE_CLIENT_PROJECT_REQUEST, UPDATE_CLIENT_PROJECT_SUCCESS, UPDATE_CLIENT_PROJECT_VISIBILITY_FAIL, UPDATE_CLIENT_PROJECT_VISIBILITY_REQUEST, UPDATE_CLIENT_PROJECT_VISIBILITY_SUCCESS } from "../../store/slices/client/projectSlice";
import { GET_ALL_PROJECTS_FAIL, GET_ALL_PROJECTS_REQUEST, GET_ALL_PROJECTS_SUCCESS } from "../../store/slices/projects/allProjectSlice";
import { GET_ALL_CLIENT_PROPOSAL_FAIL, GET_ALL_CLIENT_PROPOSAL_REQUEST, GET_ALL_CLIENT_PROPOSAL_SUCCESS } from "../../store/slices/propsoal/client/proposalSlice";
import axiosInstance from "../../utils/axiosInstance";

export const createProject = (formData) => async (dispatch) => {
    try {
        dispatch(CREATE_PROJECT_REQUEST());

        const data = await axiosInstance.post(
            "/project/create-project", formData
        );
        dispatch(CREATE_PROJECT_SUCCESS(data));

    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to delete profile";
        dispatch(CREATE_PROJECT_FAIL(errorMessage));
        console.log("errorMessage", errorMessage);

        // return { success: false, message: errorMessage };
        // console.log(errorMessage);

    }
};


export const getAllClientProjects = () => async (dispatch) => {
    try {
        dispatch(GET_CLIENT_PROJECTS_REQUEST());
        const { data } = await axiosInstance.get('/project/all-client-projects');

        dispatch(GET_CLIENT_PROJECTS_SUCCESS(data));
    } catch (error) {
        dispatch(GET_CLIENT_PROJECTS_FAIL(error.message || "Failed to fetch projects"));
    }
};


export const getAllProjects = () => async (dispatch) => {
    try {
        dispatch(GET_ALL_PROJECTS_REQUEST());

        const { data } = await axiosInstance.get('/project/all-projects');


        dispatch(GET_ALL_PROJECTS_SUCCESS(data.projects));
    } catch (error) {
        console.error("Error fetching projects:", error);
        dispatch(GET_ALL_PROJECTS_FAIL(error.message || "Failed to fetch projects"));
    }
};






export const updateClientProjectStatus = (projectId, newStatus) => async (dispatch) => {
    dispatch(UPDATE_CLIENT_PROJECT_REQUEST());

    try {
        const { data } = await axiosInstance.patch(`/project/change-project-status/${projectId}`, { status: newStatus });

        dispatch(UPDATE_CLIENT_PROJECT_SUCCESS(data.data));
    } catch (error) {
        dispatch(
            UPDATE_CLIENT_PROJECT_FAIL(
                error.response?.data?.message || "Failed to update project status"
            )
        );
    }
};



export const updateClientProjectVisibility = (projectId, newVisibility) => async (dispatch) => {
    dispatch(UPDATE_CLIENT_PROJECT_VISIBILITY_REQUEST());

    try {
        const { data } = await axiosInstance.patch(`/project/change-project-visibility/${projectId}`, { visibility: newVisibility });

        dispatch(UPDATE_CLIENT_PROJECT_VISIBILITY_SUCCESS(data.data));
    } catch (error) {
        dispatch(
            UPDATE_CLIENT_PROJECT_VISIBILITY_FAIL(
                error.response?.data?.message || "Failed to update project status"
            )
        );
    }
};


export const deleteClientProject = (projectId) => async (dispatch) => {
    dispatch(DELETE_CLIENT_PROJECT_REQUEST());

    try {
        const { data } = await axiosInstance.delete(`/project/delete-project/${projectId}`);

        dispatch(DELETE_CLIENT_PROJECT_SUCCESS(data.data));
    } catch (error) {
        dispatch(
            DELETE_CLIENT_PROJECT_FAIL(
                error.response?.data?.message || "Failed to update project status"
            )
        );
    }
};



export const getAllClientProposal = () => async (dispatch) => {
    try {
        dispatch(GET_ALL_CLIENT_PROPOSAL_REQUEST());

        const { data } = await axiosInstance.get('/project/all-proposals');        

        dispatch(GET_ALL_CLIENT_PROPOSAL_SUCCESS(data.proposals));

        return data.proposals;
    } catch (error) {
        console.error("Error fetching projects:", error);
        dispatch(GET_ALL_CLIENT_PROPOSAL_FAIL(error.message || "Failed to fetch projects"));
        throw error;
    }
};
