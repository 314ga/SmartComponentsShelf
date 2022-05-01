import React, { useEffect, useState } from "react";
import mqtt from "precompiled-mqtt";
import { useSelector, useDispatch } from "react-redux";
import { getContainers } from "../utils/firestore";
import axios from "axios";
import { containersAction } from "../redux/ContainersSlice";
import Overview from "./Overview";
import {
  Grid,
  Button,
  Typography,
  Container,
} from "../mImportHelper/MUIImports";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Bar,
  Scatter,
} from "recharts";
import { fetchContainer1, fetchContainer2 } from "../redux/ThunkAPICalls";

const data = [
  {
    name: "DateFormat",
    Resistors: 590,
    Capacitors: 300,
    ThresholdCapacitors: 490,
  },
  {
    name: "DateFormat",
    Resistors: 868,
    Capacitors: 967,
    ThresholdCapacitors: 590,
  },
];

const client = mqtt.connect("tcp://mqtt3.thingspeak.com:443/mqtt", {
  clientId: "Jw8NLC4eITEJGws9OxglGBg",
  protocolId: "MQTT",
  keepAlive: 30,
  username: "Jw8NLC4eITEJGws9OxglGBg",
  reconnectPeriod: 3000,
  clean: true,
  connectTimeout: 10000,
  password: "DCaSO5lhd3xh9Um1WR0WjYTu",
  will: {
    topic: "WillMsg",
    payload: "Connection Closed abnormally..!",
    qos: 0,
    retain: false,
  },
});
const Reports = () => {
  const dispatch = useDispatch();
  const [subscribed, setSubscribed] = useState([]);
  const [container1, setContainer1] = useState([]);
  const [container2, setContainer2] = useState([]);
  const [containersValues, setContainersValues] = useState({
    container1: [],
    container2: [],
  });
  const [clientConnected, setClientConnected] = useState(false);
  const { containersData, loading, container1Data, container2Data } =
    useSelector((state) => state.containers);

  //TESTED WORKS
  //to test you can publish field1 in the topic with executing this URL in browser: https://api.thingspeak.com/update?api_key=19ZTPNAJN1N3C377&field1=15
  //TOPIC format: channels/1711037/subscribe/fields/field1  [field1-4] 1-scale1 2-scale2 3-threshold1 4-threshold2
  const mqttSub = (topic, dotID) => {
    if (client) {
      client.subscribe(topic, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        } else {
          let newArray = [...subscribed];
          newArray[dotID].sub = "YES";
          setSubscribed(newArray);
        }
      });
    }
  };
  //NOT TESTED - NOT VERY SURE ABOUT THE TOPIC LINK
  //TOPIC format: channels/1711037/subscribe/fields/field1  [field1-4] 1-scale1 2-scale2 3-threshold1 4-threshold2
  const mqttUnSub = (topic, dotID) => {
    if (client) {
      client.unsubscribe(topic, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        } else {
          let newArray = [...subscribed];
          newArray[dotID].sub = "NO";
          setSubscribed(newArray);
        }
      });
    }
  };
  //TESTED WORKS
  //TOPIC format: channels/1711037/publish/fields/field1  [field1-4] 1-scale1 2-scale2 3-threshold1 4-threshold2
  //TODO: add logic for sending thresholds(scale1-field3, scale2-field4)
  const mqttPublish = (topic, value) => {
    if (client) {
      client.publish(topic, value.toString(), (error) => {
        if (error) {
          console.log("Publish error: ", error);
        } else {
          console.log("sent");
        }
      });
    }
  };
  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        //TODO: subscribed topic blinking dot RED
      });
    }
  };

  useEffect(() => {
    client.on("connect", () => {
      console.log("connected");
      setClientConnected(true);
    });

    client.on("error", (e) => {
      console.log("MQTT error.", e.message);
    });

    client.on("reconnect", () => {
      console.log("MQTT client is reconnecting...");
    });
    client.on("message", (rawTopic, buf) => {
      //newArray[e.currentTarget.id].sub = "WORKING";
      //setSubscribed(newArray);

      if (buf != undefined) {
        setContainersValues({ container1: [], container2: [] });
        console.log(rawTopic);
        if (rawTopic === "channels/1711037/subscribe/fields/field1") {
          getContainerData(
            "https://api.thingspeak.com/channels/1711037/feeds.json?api_key=YFAYYK824V7A7DEA"
          );
        } else
          getContainerData(
            "https://api.thingspeak.com/channels/1711037/feeds.json?api_key=YFAYYK824V7A7DEA"
          );
      }
    });
    client.on("close", (e) => {
      console.log("closed");
      setClientConnected(false);
    });
    getAllContainers();
    dispatch(fetchContainer1()).then(() => {});
    dispatch(fetchContainer2()).then(() => {});
    getContainerData(
      "https://api.thingspeak.com/channels/1711037/feeds.json?api_key=YFAYYK824V7A7DEA"
    );
    /*return function cleanup() {
      mqttDisconnect();
    };*/
  }, []);

  const getAllContainers = () => {
    getContainers().then((results) => {
      var containersArray = [];
      results.forEach((doc) => {
        var cont = doc.data();
        let newContainer = { name: cont.name, sub: "NO" };
        setSubscribed((currentArray) => [...currentArray, newContainer]);
        containersArray.push(cont);
      });
      dispatch(containersAction({ containersData: containersArray }));
    });
  };

  const getContainerData = (container) => {
    axios
      .get(container)
      .then(function (response) {
        console.log(response);
        let data = response.data.feeds;
        let container1 = [];
        let container2 = [];
        data.forEach((data, index) => {
          if (data.field1) {
            container1.push(data);
          } else if (data.field2) {
            container2.push(data);
          }
        });
        console.log(container1);
        console.log(container2);
        setContainersValues({ container1, container2 });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  const handleSubscribe = (e) => {
    let newArray = [...subscribed];
    newArray[e.currentTarget.id].sub = "WORKING";
    setSubscribed(newArray);
    let url =
      "channels/1711037/subscribe/fields/field" +
      (parseInt(e.currentTarget.id) + 1);

    mqttSub(url, e.currentTarget.id);
  };
  const checkState = (e) => {
    console.log(containersValues[Object.keys(containersValues)[0]]);
    console.log(containersValues[Object.keys(containersValues)[1]]);
    console.log(containersValues);
  };

  const handleUnsubscribe = (e) => {
    let newArray = [...subscribed];
    newArray[e.currentTarget.id].sub = "WORKING";
    setSubscribed(newArray);
    let url =
      "channels/1711037/subscribe/fields/field" +
      (parseInt(e.currentTarget.id) + 1);

    mqttUnSub(url, e.currentTarget.id);
  };
  const updateContainer = (container) => {
    switch (container) {
      case "Container1": {
        mqttPublish("channels/1711037/publish/fields/field3", 1);
        break;
      }
      case "Container2": {
        mqttPublish("channels/1711037/publish/fields/field4", 2);
        break;
      }
      default:
        break;
    }
  };
  return (
    <Container style={{ marginLeft: "auto", marginRight: "auto" }}>
      {/*} <Button variant="contained" color="secondary" onClick={checkState}>
        test
      </Button>*/}
      <Grid container spacing={3}>
        {loading === false &&
          containersData &&
          containersData.map((container, index) => {
            return (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                key={container.name + "-g"}
              >
                <Typography
                  style={{ textAlign: "center", marginRight: "80px" }}
                  variant="h4"
                  component="h2"
                >
                  {subscribed &&
                    subscribed[index] &&
                    subscribed[index].sub == "NO" && (
                      <>
                        <Button
                          id={index}
                          variant="outlined"
                          onClick={handleSubscribe}
                        >
                          Subscribe
                        </Button>
                        <svg
                          style={{
                            justifyContent: "center",
                            width: "50px",
                            height: "50px",
                          }}
                        >
                          <circle
                            fill="red"
                            stroke="none"
                            cx="30"
                            cy="30"
                            r="12"
                          ></circle>
                        </svg>
                      </>
                    )}
                  {subscribed &&
                    subscribed[index] &&
                    subscribed[index].sub == "WORKING" && (
                      <>
                        <svg
                          style={{
                            justifyContent: "center",
                            width: "50px",
                            height: "50px",
                          }}
                        >
                          <circle
                            fill="orange"
                            stroke="none"
                            cx="30"
                            cy="30"
                            r="12"
                          ></circle>
                        </svg>
                      </>
                    )}
                  {subscribed &&
                    subscribed[index] &&
                    subscribed[index].sub == "YES" && (
                      <>
                        <Button
                          id={index}
                          variant="outlined"
                          onClick={handleUnsubscribe}
                        >
                          Unsubscribe
                        </Button>
                        <svg
                          style={{
                            justifyContent: "center",
                            width: "50px",
                            height: "50px",
                          }}
                        >
                          <circle
                            fill="#4caf50"
                            stroke="none"
                            cx="30"
                            cy="30"
                            r="12"
                          >
                            <animate
                              attributeName="opacity"
                              dur="2s"
                              values="0;1;0"
                              repeatCount="indefinite"
                              begin="0.1"
                            />
                          </circle>
                        </svg>
                      </>
                    )}
                  {container.name}
                </Typography>
                <LineChart
                  width={500}
                  height={300}
                  data={containersValues[Object.keys(containersValues)[index]]}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <tbody>
                    {containersValues[Object.keys(containersValues)[index]]}
                  </tbody>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="created_at" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={"field" + (index + 1)}
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </Grid>
            );
          })}
      </Grid>
      <Overview updateContainer={updateContainer}></Overview>
    </Container>
  );
};

export default Reports;
