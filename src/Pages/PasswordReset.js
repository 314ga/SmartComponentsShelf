import React, { useEffect } from "react";
import mqtt from "precompiled-mqtt";
import { Button } from "@mui/material";
const PasswordReset = () => {
  // Local broker
  const client = mqtt.connect("ws://mqtt3.thingspeak.com:443/mqtt", {
    clientId: "ATQKIR4vCRYWEisIABwUISg",
    protocolId: "MQTT",
    keepAlive: 30,
    username: "ATQKIR4vCRYWEisIABwUISg",
    reconnectPeriod: 3000,
    clean: true,
    connectTimeout: 10000,
    password: "TbwJiRmVDB3AIWzdjRTiDza/",
    will: {
      topic: "WillMsg",
      payload: "Connection Closed abnormally..!",
      qos: 0,
      retain: false,
    },
  });
  console.log(client);
  const onMessage = (callBack) => {
    client.on("message", (topic, message, packet) => {
      callBack(JSON.parse(new TextDecoder("utf-8").decode(message)));
    });
  };
  client.on("connect", () => {
    console.log("connected");
  });

  client.on("error", (e) => {
    console.log("MQTT error.", e.message);
  });

  client.on("reconnect", () => {
    console.log("MQTT client is reconnecting...");
  });
  client.on("message", (rawTopic, buf) => {
    console.log(rawTopic + " " + buf); //TODO: handle messages received from thingsspeak
  });
  client.on("close", (e) => {
    console.log("MQTT client is disconnected.");
  });
  //TESTED WORKS
  //to test you can publish field1 in the topic with executing this URL in browser: https://api.thingspeak.com/update?api_key=19ZTPNAJN1N3C377&field1=15
  //TOPIC format: channels/1711037/subscribe/fields/field1  [field1-4] 1-scale1 2-scale2 3-threshold1 4-threshold2
  const mqttSub = (topic) => {
    if (client) {
      client.subscribe(topic, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        } else {
          //TODO:subscribed topic blinking dot
        }
      });
    }
  };
  //NOT TESTED - NOT VERY SURE ABOUT THE TOPIC LINK
  //TOPIC format: channels/1711037/subscribe/fields/field1  [field1-4] 1-scale1 2-scale2 3-threshold1 4-threshold2
  const mqttUnSub = (topic) => {
    if (client) {
      client.unsubscribe(topic, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        } else {
          //TODO: dot orange that client is still connected but topic was unsubscribed
        }
      });
    }
  };
  //TESTED WORKS
  //TOPIC format: channels/1711037/publish/fields/field1  [field1-4] 1-scale1 2-scale2 3-threshold1 4-threshold2
  //TODO: add logic for sending thresholds(scale1-field3, scale2-field4)
  const mqttPublish = () => {
    if (client) {
      client.publish(
        "channels/1711037/publish/fields/field1",
        "10",
        (error) => {
          if (error) {
            console.log("Publish error: ", error);
          } else {
            console.log("sent");
          }
        }
      );
    }
  };
  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        //TODO: subscribed topic blinking dot RED
      });
    }
  };

  useEffect(() => {}, []);

  return (
    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
      <p>Connected-{client.connected}</p>
      <Button
        onClick={() => mqttSub("channels/1711037/subscribe/fields/field1")}
        variant="contained"
      >
        Subscribe btn
      </Button>
    </div>
  );
};

export default PasswordReset;

// 	< Box
// component = "form"
// sx = {{
// 	"& .MuiTextField-root": { m: 1, width: "25ch" },
// }}
// noValidate
// autoComplete = "off"
// 	>
//           <div>
//             <TextField
//               error={email === ""}
//               helperText={email === "" ? "Empty field!" : " "}
//               id="email"
//               label="Email"
//               required
//               value={email}
//               onChange={onTextFieldChange}
//             />
//             <TextField
//               error={password === ""}
//               helperText={password === "" ? "Empty field!" : " "}
//               id="password"
//               label="Password"
//               required
//               value={password}
//               onChange={onTextFieldChange}
//             />
//           </div>
//           <Button disabled={loading} onClick={handleSignIn} variant="contained">
//             Log-in
//           </Button>
//           <Button
//             disabled={loading}
//             onClick={() => handleResetPassword(true)}
//             variant="outlined"
//           >
//             Reset Password
//           </Button>
//         </ >
