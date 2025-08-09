import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import {
  BOOKING_TOUR_FAILURE,
  BOOKING_TOUR_REQUEST,
  BOOKING_TOUR_SUCCESS,
  CANCEL_TOUR_FAILURE,
  CANCEL_TOUR_REQUEST,
  CANCEL_TOUR_SUCCESS,
} from "../Tour/ActionType";
import {
  CHECK_PAYMENT_STATUS_FAILURE,
  CHECK_PAYMENT_STATUS_REQUEST,
  CHECK_PAYMENT_STATUS_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  PAYMENT_FAILURE,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
} from "./ActionType";

export const createBooking = (request) => async (dispatch) => {
  const token = localStorage.getItem("jwt");
  console.log("Booking data request: ", request);
  console.log("jwt in func createbooking: ", token);
  dispatch({ type: BOOKING_TOUR_REQUEST });

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v2/booking`,
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Booking data response: ", response.data);
    dispatch({ type: BOOKING_TOUR_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error during booking: ", error);
    dispatch({ type: BOOKING_TOUR_FAILURE, payload: error.toString() });
  }
};

export const createOrderPayment = (request) => async (dispatch) => {
  console.log("Send data request to payment controller: ", request);
  dispatch({ type: PAYMENT_REQUEST });
  const token = localStorage.getItem("jwt");
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v2/payments/create-order`,
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Booking data response: ", response.data);
    dispatch({ type: PAYMENT_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error during booking: ", error);
    dispatch({ type: PAYMENT_FAILURE, payload: error.toString() });
  }
};

export const checkPaymentStatus =
  (appTransId, qrBase64) => async (dispatch) => {
    dispatch({ type: CHECK_PAYMENT_STATUS_REQUEST });
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v2/payments/getstatusbyapptransid`,
        {
          apptransid: appTransId,
          qrBase64: qrBase64,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Payment status response: ", response.data);
      dispatch({ type: CHECK_PAYMENT_STATUS_SUCCESS, payload: response.data });
    } catch (error) {
      console.error("Error during checking payment status: ", error);
      dispatch({
        type: CHECK_PAYMENT_STATUS_FAILURE,
        payload: error.toString(),
      });
    }
  };

export const getOrderHistory = () => async (dispatch) => {
  dispatch({ type: GET_ORDERS_REQUEST });
  const token = localStorage.getItem("jwt");
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v2/booking/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Orders data response: ", response.data);
    dispatch({ type: GET_ORDERS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error during booking: ", error);
    dispatch({ type: GET_ORDERS_FAILURE, payload: error.toString() });
  }
};

export const cancelTour = (bookingId) => async (dispatch) => {
  const token = localStorage.getItem("jwt");
  dispatch({ type: CANCEL_TOUR_REQUEST });

  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/v2/booking/cancel/${bookingId}`,
      {}, // Body trống nếu không có dữ liệu cần gửi
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Booking data response: ", response.data);
    dispatch({ type: CANCEL_TOUR_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error during booking: ", error);
    dispatch({ type: CANCEL_TOUR_FAILURE, payload: error.toString() });
  }
};

