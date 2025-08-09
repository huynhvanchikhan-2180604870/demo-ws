import { api } from "../../config/api";
import {
  ADD_NEW_MESSAGE,
  LOAD_MESSAGES_FOR_SESSION,
  MESSAGE_CREATE_FAILURE,
  MESSAGE_CREATE_SUCCESS,
  SESSION_CREATE_FAILURE,
  SESSION_CREATE_REQUEST,
  SESSION_CREATE_SUCCESS,
  SET_CURRENT_SESSION_ID,
} from "./ActionType";

export const addNewMessage = (message) => ({
  type: ADD_NEW_MESSAGE,
  payload: message,
});
const handleApiRequest = async (
  dispatch,
  requestAction,
  successAction,
  failureAction,
  apiCall
) => {
  try {
    const { data } = await apiCall();
    console.log("data reponse: " ,data)
    dispatch({ type: successAction, payload: data });
  } catch (error) {
    dispatch({ type: failureAction, payload: error.message });
  }
};
export const sendMessages = (messageData) => async (dispatch) => {
  try {
    const response = await api.post(`/api/v1/chats/send`, messageData);
    // Dispatch action success
    dispatch({ type: MESSAGE_CREATE_SUCCESS, payload: response.data });
    // Return dữ liệu để .then((res) => ...) trong component có thể sử dụng res
    return response.data;
  } catch (error) {
    dispatch({ type: MESSAGE_CREATE_FAILURE, payload: error.message });
    throw error; // Ném lỗi ra để có thể bắt bằng .catch trong component
  }
};

export const createSession = (hostId) => async (dispatch) => {
  dispatch({ type: SESSION_CREATE_REQUEST });
  try {
    const response = await api.post(`/api/v1/chats/sessions/${hostId}`);
    dispatch({
      type: SESSION_CREATE_SUCCESS,
      payload: {
        hostId: hostId,
        session: response.data
      },
    });
    // Cập nhật currentSessionId trong store
    dispatch(setCurrentSessionId(response.data.id));
    return response.data;
  } catch (error) {
    dispatch({ type: SESSION_CREATE_FAILURE, payload: error.message });
    throw error;
  }
};

export const setCurrentSessionId = (sessionId) => ({
  type: SET_CURRENT_SESSION_ID,
  payload: sessionId,
});

export const fetchSessionMessages = (sessionId) => async (dispatch) => {
  try {
    const response = await api.get(`/api/v1/chats/sessions/${sessionId}/messages`);
    dispatch(loadMessagesForSession(response.data));
    return response.data;
  } catch (error) {
    console.error("Error fetching session messages:", error);
    throw error;
  }
};

export const loadMessagesForSession = (messages) => ({
  type: LOAD_MESSAGES_FOR_SESSION,
  payload: messages
});