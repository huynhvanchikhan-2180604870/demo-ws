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

const initialState = {
  loading: false,
  data: [],
  error: null,
  totalPages: 0,
  totalElements: 0,
  orders: [],
  tours: [],
  accounts: [],
  // pageSize: 10, // Default page size
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TOURS_REQUEST:
    case GET_ALL_BOOKINGS_REQUEST:
    case GET_ALL_ACCOUNT_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_ALL_TOURS_SUCCESS:
      return {
        ...state,
        loading: false,
        tours: action.payload,
      };
    case GET_ALL_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case GET_ALL_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.payload,
      };
    case GET_ALL_TOURS_FAILURE:
    case GET_ALL_BOOKINGS_FAILURE:
    case GET_ALL_ACCOUNT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default adminReducer;
