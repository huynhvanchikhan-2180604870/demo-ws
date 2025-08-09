import {
  ADD_NEW_MESSAGE,
  LOAD_MESSAGES_FOR_SESSION,
  MESSAGE_CREATE_FAILURE,
  MESSAGE_CREATE_REQUEST,
  MESSAGE_CREATE_SUCCESS,
  SESSION_CREATE_FAILURE,
  SESSION_CREATE_REQUEST,
  SESSION_CREATE_SUCCESS,
} from "./ActionType";

const initialState = {
  loading: false,
  error: null,
  messagesRoom: [],
  message: null,
  sessionsByHost: {},
  currentSessionId: null,
};
export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_CREATE_REQUEST:
    case SESSION_CREATE_REQUEST:
      return { ...state, loading: true, error: null };
    case SESSION_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        // Lưu session vào sessionsByHost. Chú ý: payload cần chứa hostId.
        sessionsByHost: {
          ...state.sessionsByHost,
          [action.payload.hostId]: action.payload.session,
        },
      };
    case MESSAGE_CREATE_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case ADD_NEW_MESSAGE:
      // Kiểm tra xem tin nhắn đã tồn tại chưa trước khi thêm
      const isMessageExists = state.messagesRoom.some(
        (msg) => msg.id === action.payload.id
      );

      return {
        ...state,
        messagesRoom: isMessageExists
          ? state.messagesRoom
          : [...state.messagesRoom, action.payload],
      };
    case LOAD_MESSAGES_FOR_SESSION:
      return {
        ...state,
        // Thay vì thay thế hoàn toàn, hãy merge tin nhắn mới
        messagesRoom: [
          ...state.messagesRoom.filter(
            (msg) => msg.chatSession !== action.payload[0]?.chatSession
          ),
          ...action.payload,
        ],
      };
    case MESSAGE_CREATE_FAILURE:
    case SESSION_CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
