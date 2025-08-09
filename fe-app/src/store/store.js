import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { autReducer } from "./Auth/Reducer";
import hostReducer from "./Host/Reducer";
import tourReducer from "./Tour/Reducer";
import bookingReducer from "./Booking/Reducer";
import adminReducer from './Admin/Reducer'
import { messageReducer } from "./Message/Reducer";
const rootReducers = combineReducers({
  auth: autReducer,
  host: hostReducer,
  tour: tourReducer,
  booking: bookingReducer,
  admin: adminReducer,
  message: messageReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
