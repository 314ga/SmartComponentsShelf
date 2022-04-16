import { createSlice } from "@reduxjs/toolkit";
import { fetchContainers, updateContainer } from "./ThunkAPICalls";

const containersSlice = createSlice({
  name: "containers",
  //TODO: remove hardcoded values
  initialState: {
    notificationToken: "",
    seenNotifications: [],
    notifications: [],
    containersData: [
      {
        containerName: "Container 1",
        componentsName: "Resistors",
        componentsDescription: "Resistors for smartie people",
        singleComponentWeight: 0.24,
        remainingQuantity: 15,
        totalWeight: 3.6,
      },
      {
        containerName: "Container 2",
        componentsName: "Capacitors",
        componentsDescription: "Capacitors for smartie people",
        singleComponentWeight: 0.3,
        remainingQuantity: 15,
        totalWeight: 4.5,
      },
    ],
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContainers.fulfilled, (state, action) => {
        state.containersData = action.payload;
        state.loading = false;
      })
      .addCase(fetchContainers.pending, (state, action) => {
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
export const { notificationToken, notificationsData, seenNotificationsAction } =
  containersSlice.actions;
export default containersSlice.reducer;
