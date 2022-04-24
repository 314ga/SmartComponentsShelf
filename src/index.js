import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Components from "./Pages/Components";
import Orders from "./Pages/Orders";
import Reports from "./Pages/Reports";
import { ThemeProvider } from "@mui/material/styles";
import { dashboardTheme } from "./dashboardTheme";
import store from "./redux/configureStore";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as ROUTES from "./components/common/RouterContstants/routes";
import SignInPage from "./Pages/SignInPage";

ReactDOM.render(
  <ThemeProvider theme={dashboardTheme}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path={ROUTES.ORDERS} element={<Components />} />
            <Route path={ROUTES.REPORTS} element={<Reports />} />
            <Route path={ROUTES.THRESHOLDS} element={<Orders />} />
            <Route path={ROUTES.SIGNIN} element={<SignInPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
