import { MQTTapi, DBapi } from "../utils/RestAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
/*API CALL URLS:
    1. /get-containers ------ GET method, database returns all info about containers
    2. /update-container/{container-ID} ------ PUT method to change specific container 
*/
//getting all information about all containers from DB
export const fetchContainer1 = createAsyncThunk(
  "containers/fetchContainer1",
  async (props, thunkAPI) => {
    const response = await DBapi.get("/1.json?api_key=YFAYYK824V7A7DEA");
    return response.data.feeds;
  }
);
export const fetchContainer2 = createAsyncThunk(
  "containers/fetchContainer2",
  async (props, thunkAPI) => {
    const response = await DBapi.get("/2.json?api_key=YFAYYK824V7A7DEA");
    return response.data.feeds;
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
