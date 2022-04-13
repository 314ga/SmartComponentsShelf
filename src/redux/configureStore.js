import { configureStore, combineReducers } from "@reduxjs/toolkit";
import containersSlice from "./ContainersSlice";

const reducer = combineReducers({
  containers: containersSlice,
});

const store = configureStore({
  reducer,
});

export default store;
