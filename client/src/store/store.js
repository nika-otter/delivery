import { configureStore } from "@reduxjs/toolkit";
import driverReducer from "./slices/driverSlice";
import transportReducer from "./slices/transportSlice";
import transportScheduleReducer from "./slices/transportScheduleSlice";
import gateReducer from "./slices/gateSlice";
import locationReducer from "./slices/locationSlice";
import loginReducer from "./slices/loginSlice";
import locationManagerReducer from "./slices/locationManagerSlice";
// Import other slice reducers for different entities

const store = configureStore({
  reducer: {
    drivers: driverReducer,
    transports: transportReducer,
    transportSchedules: transportScheduleReducer,
    gates: gateReducer,
    locations: locationReducer,
    login: loginReducer,
    locationmanagers: locationManagerReducer,
    // Add other reducers for other entities here
  },
});

export default store;
