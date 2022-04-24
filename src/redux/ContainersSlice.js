import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContainers,
  updateContainer,
  fetchContainer1,
  fetchContainer2,
} from "./ThunkAPICalls";

const containersSlice = createSlice({
  name: "containers",
  //TODO: remove hardcoded values
  initialState: {
    notificationToken: "",
    seenNotifications: [],
    notifications: [],
    container1Data: [],
    container2Data: [],
    loading: false,
    error: false,
  },
  reducers: {
    //name from GUIDE
    /*reducerName(currentNameAction): (state, action) => {
      const { newStateName } = action.payload;
      state.stateName = newStateName;
    },*/
    notificationToken: (state, action) => {
      const { newNotificationToken } = action.payload;
      state.notificationToken = newNotificationToken;
    },
    notificationsData: (state, action) => {
      state.notifications = action.payload.notifications;
    },
    seenNotificationsAction: (state, action) => {
      state.seenNotifications = action.payload.seenNotifications;
    },
    containersAction: (state, action) => {
      state.containersData = action.payload.containersData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContainer1.fulfilled, (state, action) => {
        state.container1Data = action.payload;
        state.loading = false;
      })
      .addCase(fetchContainer1.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchContainer2.fulfilled, (state, action) => {
        state.container2Data = action.payload;
        state.loading = false;
      })
      .addCase(fetchContainer2.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateContainer.fulfilled, (state, action) => {
        //TODO: change depending if DB returns all updated values or just one container value...
        state.monthData = action.payload;
        state.loading = false;
      })
      .addCase(updateContainer.pending, (state, action) => {
        state.loading = true;
      });
  },
});
export const {
  notificationToken,
  notificationsData,
  seenNotificationsAction,
  containersAction,
} = containersSlice.actions;
export default containersSlice.reducer;
