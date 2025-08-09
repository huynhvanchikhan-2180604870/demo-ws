import {
  ADD_TOUR_FAILURE,
  ADD_TOUR_REQUEST,
  ADD_TOUR_SUCCESS,
  DELETE_TOUR_FAILURE,
  DELETE_TOUR_REQUEST,
  DELETE_TOUR_SUCCESS,
  EDIT_TOUR_FAILURE,
  EDIT_TOUR_REQUEST,
  EDIT_TOUR_SUCCESS,
  FETCH_TOURS_FAILURE,
  FETCH_TOURS_REQUEST,
  FETCH_TOURS_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
} from "./ActionType";

const initialState = {
  loading: false,
  data: [],
  error: null,
  totalPages: 0,
  totalElements: 0,
  orders:[]
  // pageSize: 10, // Default page size
};

const hostReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOURS_REQUEST:
    case ADD_TOUR_REQUEST:
    case EDIT_TOUR_REQUEST:
    case DELETE_TOUR_REQUEST:
    case GET_ALL_ORDERS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case FETCH_TOURS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        totalPages: Math.ceil(
          action.payload.recordsTotal / action.payload.pageSize
        ),
        totalElements: action.payload.recordsTotal,
        // If you're storing pageSize in state
        // pageSize: action.payload.pageSize,
      };
    case ADD_TOUR_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [action.payload, ...state.data],
      };
    case EDIT_TOUR_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((tour) =>
          tour.id === action.payload.id ? action.payload : tour
        ),
      };
    case DELETE_TOUR_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter((tour) => tour.id !== action.payload),
      };
    case FETCH_TOURS_FAILURE:
    case ADD_TOUR_FAILURE:
    case EDIT_TOUR_FAILURE:
    case DELETE_TOUR_FAILURE:
    case GET_ALL_ORDERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default hostReducer;
