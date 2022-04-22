import React from "react";
import Firebase from "./Pages/Firebase";
import UserProvider from "./providers/UserProvider";
import { Connector } from "mqtt-react-hooks";
import "./App.css";

function App() {
  return (
    <Connector brokerUrl="wss://test.mosquitto.org:1884">
      <UserProvider>
        <Firebase />
      </UserProvider>
    </Connector>
  );
}

export default App;
