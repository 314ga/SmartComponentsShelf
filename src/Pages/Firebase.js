import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import SignInPage from "./SignInPage";

import NavDrawer from "../components/Navbar/NavDrawer";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import { useLocation } from "react-router-dom";

const Firebase = () => {
  const user = useContext(UserContext);
  const [title, setTitle] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const parsedTitle = location.pathname.replace(/\W/g, " ");
    setTitle(parsedTitle);
  }, [location]);
  return user ? (
    <>
      <Grid container>
        <NavDrawer />
        <Header title={title} />
        <Outlet />
      </Grid>
    </>
  ) : (
    <>
      <SignInPage />
      {/* <Routes>
        <Route path="/">
          <Route path={ROUTES.SIGNIN} element={<SignInPage />} />
          <Route path={ROUTES.PASSWORD_RESET} element={<PasswordReset />} />
        </Route>
      </Routes> */}
    </>
  );
};

export default Firebase;
