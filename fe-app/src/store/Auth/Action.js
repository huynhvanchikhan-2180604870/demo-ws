import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_GOOGLE_FAILURE,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
} from "./ActionType";

export const loginUser = (loginData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/v1/auth/login`,
      loginData
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.token });
  } catch (error) {
    dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
  }
};

export const register = (registerData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/v1/auth/register`,
      registerData
    );
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAILURE, payload: error.message });
  }
};

export const verify = (email, password, verify_code) => async (dispatch) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        verify_code: verify_code,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("jwt", data.token);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.token });
    }
  } catch (error) {
    console.error("Verification failed:", error);
    alert("Something went wrong. Please try again.");
    dispatch({ type: REGISTER_USER_FAILURE, payload: error.message });
  }
};

export const getUserProfile = (jwt) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v2/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("User login: ", data);
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("jwt");
};

export const loginGoole = (token) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/v1/auth/google`,
      token
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }

    dispatch({ type: LOGIN_GOOGLE_SUCCESS, payload: data.token });
  } catch (error) {
    dispatch({ type: LOGIN_GOOGLE_FAILURE, payload: error.message });
  }
};

export const updateProfile = (request) => async (dispatch) => {
  const token = localStorage.getItem("jwt");
  try {
    const { response } = await axios.post(
      `${API_BASE_URL}/api/v2/users/update`,
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
  }
};

export const changePassword = (request) => async (dispatch) => {
  const token = localStorage.getItem("jwt");
  try {
    const { response } = await axios.post(
      `${API_BASE_URL}/api/v2/users/change-password`,
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
  } catch (error) {}
};
