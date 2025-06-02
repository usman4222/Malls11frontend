import { GET_PROJECT_FAIL, GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS } from "../../store/slices/projects/singleProjectSlice";
import axiosInstance from "../../utils/axiosInstance";

export const getSingleProject = (projectId) => async (dispatch) => {
    try {
        dispatch(GET_PROJECT_REQUEST());

        const { data } = await axiosInstance.get(`/project/single-project/${projectId}`);

        dispatch(GET_PROJECT_SUCCESS(data.project));

    } catch (error) {
        dispatch(GET_PROJECT_FAIL(error.response?.data?.message || error.message));
    }
};