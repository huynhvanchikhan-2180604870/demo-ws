import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import {
  GET_ALL_ACCOUNT_FAILURE,
  GET_ALL_ACCOUNT_REQUEST,
  GET_ALL_ACCOUNT_SUCCESS,
  GET_ALL_BOOKINGS_FAILURE,
  GET_ALL_BOOKINGS_REQUEST,
  GET_ALL_BOOKINGS_SUCCESS,
  GET_ALL_TOURS_FAILURE,
  GET_ALL_TOURS_REQUEST,
  GET_ALL_TOURS_SUCCESS,
} from "./ActionType";

export const getTours = () => async (dispatch) => {
  dispatch({ type: GET_ALL_TOURS_REQUEST });
  const token = localStorage.getItem("jwt");
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v2/admin/tours`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Tours data response: ", response.data);
    dispatch({ type: GET_ALL_TOURS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error during booking: ", error);
    dispatch({ type: GET_ALL_TOURS_FAILURE, payload: error.toString() });
  }
};

export const getBookings = () => async (dispatch) => {
  dispatch({ type: GET_ALL_BOOKINGS_REQUEST });
  const token = localStorage.getItem("jwt");
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v2/admin/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Bookings data response: ", response.data);
    dispatch({ type: GET_ALL_BOOKINGS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error during booking: ", error);
    dispatch({ type: GET_ALL_BOOKINGS_FAILURE, payload: error.toString() });
  }
};

export const getAccounts = () => async (dispatch) => {
  dispatch({ type: GET_ALL_ACCOUNT_REQUEST });
  const token = localStorage.getItem("jwt");
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v2/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Account data response: ", response.data);
    dispatch({ type: GET_ALL_ACCOUNT_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error during booking: ", error);
    dispatch({ type: GET_ALL_ACCOUNT_FAILURE, payload: error.toString() });
  }
};
