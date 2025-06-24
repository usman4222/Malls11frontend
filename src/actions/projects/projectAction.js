import { GET_SINGLE_PROJECT_FAIL, GET_SINGLE_PROJECT_REQUEST, GET_SINGLE_PROJECT_SUCCESS } from "../../store/slices/projects/allProjectSlice";
import axiosInstance from "../../utils/axiosInstance";

export const getSingleProject = (id) => async (dispatch) => {
  try {
    console.log("🔥 Thunk Called with ID:", id);
    dispatch(GET_SINGLE_PROJECT_REQUEST());

    const { data } = await axiosInstance.get(`/project/single-project/${id}`);
    console.log("✅ Data from API:", data);

    dispatch(GET_SINGLE_PROJECT_SUCCESS(data.project));
  } catch (error) {
    console.error("❌ Error in getSingleProject:", error);
    dispatch(GET_SINGLE_PROJECT_FAIL(error.message));
  }
};
