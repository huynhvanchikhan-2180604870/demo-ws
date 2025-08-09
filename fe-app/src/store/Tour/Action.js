import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import {
  ADD_TO_FAVORITES_FAILURE,
  ADD_TO_FAVORITES_REQUEST,
  ADD_TO_FAVORITES_SUCCESS,
  FIND_TOUR_FAILURE,
  FIND_TOUR_REQUEST,
  FIND_TOUR_SUCCESS,
  GET_TOURS_FAILURE,
  GET_TOURS_REQUEST,
  GET_TOURS_SUCCESS,
  LOAD_FAVORITES_FAILURE,
  LOAD_FAVORITES_REQUEST,
  LOAD_FAVORITES_SUCCESS,
  POST_TOUR_REVIEW_FAILURE,
  POST_TOUR_REVIEW_REQUEST,
  POST_TOUR_REVIEW_SUCCESS,
  REMOVE_FROM_FAVORITES_FAILURE,
  REMOVE_FROM_FAVORITES_REQUEST,
  REMOVE_FROM_FAVORITES_SUCCESS,
} from "./ActionType";
import { enqueueSnackbar } from "notistack";

// Action Creators
export const getAllTours = (queryParams) => async (dispatch) => {
  console.log("queryParams: ", queryParams);
  dispatch({ type: GET_TOURS_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/tours`, {
      params: queryParams,
    });
    console.log("all tours: ", response.data);
    dispatch({ type: GET_TOURS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_TOURS_FAILURE, payload: error.toString() });
  }
};

export const findTourById = (id) => async (dispatch) => {
  dispatch({ type: FIND_TOUR_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/tours/` + id);
    console.log("all tours: ", response.data);
    dispatch({ type: FIND_TOUR_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FIND_TOUR_FAILURE, payload: error.toString() });
  }
};

export const postReview = (reviewData) => async (dispatch) => {
  dispatch({ type: POST_TOUR_REVIEW_REQUEST });
  const token = localStorage.getItem("jwt");
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v2/reviews/create`,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: POST_TOUR_REVIEW_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: POST_TOUR_REVIEW_FAILURE, payload: error.toString() });
  }
};


// Load favorites if user is logged in
export const loadFavorites = () => async (dispatch) => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    // Không có token, không load favorites
    return;
  }
  dispatch({ type: LOAD_FAVORITES_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v2/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response from backend favorites: ", response.data)
    dispatch({ type: LOAD_FAVORITES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LOAD_FAVORITES_FAILURE, payload: error.toString() });
  }
};

export const addToFavorites = (tourId) => async (dispatch) => {
  const token = localStorage.getItem("jwt");
  if (!token) {
     enqueueSnackbar(`Bạn chưa đăng nhập!`, {
                variant: "error",
              });
    return;
  }
  dispatch({ type: ADD_TO_FAVORITES_REQUEST });
  try {
    await axios.post(
      `${API_BASE_URL}/api/v2/favorites/add/${tourId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Sau khi thêm thành công, chúng ta có thể dispatch lại loadFavorites hoặc đơn giản thêm tour vừa add vào store
    // Ở đây ta đơn giản gọi loadFavorites() để cập nhật danh sách
    dispatch(loadFavorites());
    dispatch({ type: ADD_TO_FAVORITES_SUCCESS });
  } catch (error) {
    dispatch({ type: ADD_TO_FAVORITES_FAILURE, payload: error.toString() });
    throw error;
  }
};

export const removeFromFavorites = (tourId) => async (dispatch) => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    alert("Bạn cần đăng nhập để sử dụng tính năng này!");
    return;
  }
  dispatch({ type: REMOVE_FROM_FAVORITES_REQUEST });
  try {
    await axios.delete(`${API_BASE_URL}/api/v2/favorites/remove/${tourId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Tương tự, sau khi remove, reload favorites
    dispatch(loadFavorites());
    dispatch({ type: REMOVE_FROM_FAVORITES_SUCCESS });
  } catch (error) {
    dispatch({ type: REMOVE_FROM_FAVORITES_FAILURE, payload: error.toString() });
    throw error;
  }
};