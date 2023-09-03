import { configureStore } from "@reduxjs/toolkit";
import driverReducer from "./slices/driverSlice";
import transportReducer from "./slices/transportSlice";
import transportScheduleReducer from "./slices/transportScheduleSlice";
import gateReducer from "./slices/gateSlice";
// Import other slice reducers for different entities

const store = configureStore({
  reducer: {
    drivers: driverReducer,
    transports: transportReducer,
    transportSchedules: transportScheduleReducer,
    gates: gateReducer,
    // Add other reducers for other entities here
  },
});

export default store;
