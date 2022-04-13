import React, { useState, useEffect } from "react";
import NavDrawer from "./components/Navbar/NavDrawer";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
import { useLocation } from "react-router-dom";
import "./App.css";

function App() {
  const [title, setTitle] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const parsedTitle = location.pathname.replace(/\W/g, " ");
    setTitle(parsedTitle);
  }, [location]);

  return (
    <Grid container>
      <NavDrawer />
      <Header title={title} />
      <Outlet />
    </Grid>
  );
}

export default App;
