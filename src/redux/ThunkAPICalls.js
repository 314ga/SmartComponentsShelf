import { MQTTapi, DBapi } from "../utils/RestAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
/*API CALL URLS:
    1. /get-containers ------ GET method, database returns all info about containers
    2. /update-container/{container-ID} ------ PUT method to change specific container 
*/
//getting all information about all containers from DB
export const fetchContainers = createAsyncThunk(
  "containers/fetchContainers",
  async (props, thunkAPI) => {
    const response = await DBapi.get("get-containers/");
    return response.data;
  }
);
//updating settings of chosen container in DB
export const updateContainer = createAsyncThunk(
  "containers/updateContainer",
  async (props, thunkAPI) => {
    const response = await DBapi.put(
      "update-container/" +
        props[0] + //container ID
        "/"
    );
    return response.data;
  }
);
