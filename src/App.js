import React from "react";
import Firebase from "./Pages/Firebase";
import UserProvider from "./providers/UserProvider";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <Firebase />
    </UserProvider>
  );
}

export default App;
