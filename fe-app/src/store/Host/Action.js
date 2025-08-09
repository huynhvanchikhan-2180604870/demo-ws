import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import {
  ADD_TOUR_FAILURE,
  ADD_TOUR_REQUEST,
  ADD_TOUR_SUCCESS,
  DELETE_TOUR_FAILURE,
  DELETE_TOUR_REQUEST,
  DELETE_TOUR_SUCCESS,
  FETCH_TOURS_FAILURE,
  FETCH_TOURS_REQUEST,
  FETCH_TOURS_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
} from "./ActionType";

export const fetchToursOfHost = (params, token) => async (dispatch) => {
  console.log("fetchTours called with params:", params);
  dispatch({ type: FETCH_TOURS_REQUEST });
  try {
    const pageNumber = Number(params.pageNumber) || 1;
    const pageSize = Number(params.pageSize) || 10;

    const start = (pageNumber - 1) * pageSize;

    const dataTablesParams = {
      draw: 1,
      start: start >= 0 ? start : 0,
      length: pageSize,
      searchValue: params.searchTerm || "",
      orderColumn: 0,
      orderDir: params.sortOrder || "asc",
      sortName: params.sortField || "title",
    };
    console.log("DataTables Params:", dataTablesParams);

    const response = await axios.get(`${API_BASE_URL}/api/v2/tours`, {
      params: dataTablesParams,
      headers: {
        // Headers should be inside the configuration object
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: FETCH_TOURS_SUCCESS,
      payload: {
        ...response.data,
        pageSize: dataTablesParams.length,
      },
    });
  } catch (error) {
    console.error("Error fetching tours:", error);
    dispatch({
      type: FETCH_TOURS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchTours = (params) => async (dispatch) => {
  console.log("fetchTours called with params:", params);
  dispatch({ type: FETCH_TOURS_REQUEST });
  try {
    const pageNumber = Number(params.pageNumber) || 1;
    const pageSize = Number(params.pageSize) || 10;

    const start = (pageNumber - 1) * pageSize;

    const dataTablesParams = {
      draw: 1,
      start: start >= 0 ? start : 0,
      length: pageSize,
      searchValue: params.searchTerm || "",
      orderColumn: 0,
      orderDir: params.sortOrder || "asc",
      sortName: params.sortField || "title",
    };
    console.log("DataTables Params:", dataTablesParams);

    const response = await axios.get(`${API_BASE_URL}/api/v1/tours`, {
      params: dataTablesParams,
    });

    dispatch({
      type: FETCH_TOURS_SUCCESS,
      payload: {
        ...response.data,
        pageSize: dataTablesParams.length,
      },
    });
  } catch (error) {
    console.error("Error fetching tours:", error);
    dispatch({
      type: FETCH_TOURS_FAILURE,
      payload: error.message,
    });
  }
};
export const deleteTour = (id, token) => async (dispatch) => {
  dispatch({ type: DELETE_TOUR_REQUEST });

  try {
    // Send DELETE request with JWT in Authorization header
    const response = await axios.delete(
      `${API_BASE_URL}/api/v2/tours/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure that the token is being passed correctly
        },
      }
    );

    // Dispatch success action with the id of the deleted tour
    dispatch({
      type: DELETE_TOUR_SUCCESS,
      payload: id,
    });
  } catch (error) {
    // If the request fails, dispatch the failure action with the error message
    dispatch({
      type: DELETE_TOUR_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const createTour = (tourData, token) => async (dispatch) => {
  dispatch({ type: ADD_TOUR_REQUEST });

  try {
    // Send DELETE request with JWT in Authorization header
    const response = await axios.post(
      `${API_BASE_URL}/api/v2/tours/create`,
      tourData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure that the token is being passed correctly
        },
      }
    );

    // Dispatch success action with the id of the deleted tour
    dispatch({
      type: ADD_TOUR_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // If the request fails, dispatch the failure action with the error message
    dispatch({
      type: ADD_TOUR_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};


export const getOrder = () => async (dispatch) => {
  dispatch({ type: GET_ALL_ORDERS_REQUEST });
  const token = localStorage.getItem("jwt");
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v2/booking/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Orders data response: ", response.data);
    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error during booking: ", error);
    dispatch({ type: GET_ALL_ORDERS_FAILURE, payload: error.toString() });
  }
};
