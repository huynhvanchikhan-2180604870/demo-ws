import {
  ADD_TO_FAVORITES_FAILURE,
  ADD_TO_FAVORITES_REQUEST,
  ADD_TO_FAVORITES_SUCCESS,
  BOOKING_TOUR_FAILURE,
  BOOKING_TOUR_REQUEST,
  BOOKING_TOUR_SUCCESS,
  CANCEL_TOUR_FAILURE,
  CANCEL_TOUR_REQUEST,
  CANCEL_TOUR_SUCCESS,
  CONTACT_TOUR_GUIDE_FAILURE,
  CONTACT_TOUR_GUIDE_REQUEST,
  CONTACT_TOUR_GUIDE_SUCCESS,
  FILTER_TOURS_FAILURE,
  FILTER_TOURS_REQUEST,
  FILTER_TOURS_SUCCESS,
  FIND_TOUR_FAILURE,
  FIND_TOUR_REQUEST,
  FIND_TOUR_SUCCESS,
  GET_TOUR_DETAILS_FAILURE,
  GET_TOUR_DETAILS_REQUEST,
  GET_TOUR_DETAILS_SUCCESS,
  GET_TOUR_HISTORY_FAILURE,
  GET_TOUR_HISTORY_REQUEST,
  GET_TOUR_HISTORY_SUCCESS,
  GET_TOURS_FAILURE,
  GET_TOURS_REQUEST,
  GET_TOURS_SUCCESS,
  LOAD_FAVORITES_SUCCESS,
  POST_TOUR_REVIEW_FAILURE,
  POST_TOUR_REVIEW_REQUEST,
  POST_TOUR_REVIEW_SUCCESS,
  REMOVE_FROM_FAVORITES_FAILURE,
  REMOVE_FROM_FAVORITES_REQUEST,
  REMOVE_FROM_FAVORITES_SUCCESS,
} from "./ActionType";

const initialState = {
  loading: false,
  tours: [],
  error: null,
  tourDetails: null,
  tourHistory: [],
  favorites: [],
  filters: {},
  pagination: {
    page: 0,
    totalPages: 0,
  },
};

const tourReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOURS_REQUEST:
    case BOOKING_TOUR_REQUEST:
    case FIND_TOUR_REQUEST:
    case GET_TOUR_DETAILS_REQUEST:
    case CANCEL_TOUR_REQUEST:
    case GET_TOUR_HISTORY_REQUEST:
    case FILTER_TOURS_REQUEST:
    case ADD_TO_FAVORITES_REQUEST:
    case REMOVE_FROM_FAVORITES_REQUEST:
    case POST_TOUR_REVIEW_REQUEST:
    case CONTACT_TOUR_GUIDE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TOURS_SUCCESS:
      return {
        ...state,
        loading: false,
        tours: action.payload.content,
        pagination: {
          page: action.payload.pageable.pageNumber,
          totalPages: action.payload.totalPages,
        },
      };

    case BOOKING_TOUR_SUCCESS:
    case FIND_TOUR_SUCCESS:
      return {
        ...state,
        loading: false,
        tourDetails: action.payload,
      };
    case GET_TOUR_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        tourDetails: action.payload,
      };
    case CANCEL_TOUR_SUCCESS:
      // You would typically filter out the cancelled tour or update its status
      return {
        ...state,
        loading: false,
        tours: state.tours.filter((tour) => tour.id !== action.payload.id),
      };
    case GET_TOUR_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        tourHistory: action.payload,
      };
    case FILTER_TOURS_SUCCESS:
      return {
        ...state,
        loading: false,
        tours: action.payload,
      };
    case LOAD_FAVORITES_SUCCESS:
      return {
        ...state,
        loading: false,
        favorites: action.payload,
      };
    case ADD_TO_FAVORITES_SUCCESS:
    case REMOVE_FROM_FAVORITES_SUCCESS:
      // Các action này đã load lại favorites trong action -> loadFavorites()
      // nên state.favorites đã được cập nhật trong LOAD_FAVORITES_SUCCESS
      // tại đây chỉ cần set loading = false
      return {
        ...state,
        loading: false,
      };
    case POST_TOUR_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        tourDetails: {
          ...state.tourDetails,
          reviews: [...state.tourDetails.reviews, action.payload],
        },
      };
    case CONTACT_TOUR_GUIDE_SUCCESS:
      return {
        ...state,
        loading: false,
        contactInfo: action.payload,
      };
    case GET_TOURS_FAILURE:
    case BOOKING_TOUR_FAILURE:
    case FIND_TOUR_FAILURE:
    case GET_TOUR_DETAILS_FAILURE:
    case CANCEL_TOUR_FAILURE:
    case GET_TOUR_HISTORY_FAILURE:
    case FILTER_TOURS_FAILURE:
    case ADD_TO_FAVORITES_FAILURE:
    case REMOVE_FROM_FAVORITES_FAILURE:
    case POST_TOUR_REVIEW_FAILURE:
    case CONTACT_TOUR_GUIDE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default tourReducer;
