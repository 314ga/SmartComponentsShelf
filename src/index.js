import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Components from './Pages/Components'
import Overview from './Pages/Overview'
import Orders from './Pages/Orders'
import Reports from './Pages/Reports';
import { ThemeProvider } from '@mui/material/styles';
import { dashboardTheme } from './dashboardTheme';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import * as ROUTES from './components/common/RouterContstants/routes';

ReactDOM.render(
  <ThemeProvider theme={dashboardTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path={ROUTES.COMPONENTS} element={<Components />} />
          <Route path={ROUTES.REPORTS} element={<Reports />} />
          <Route path={ROUTES.OVERVIEW} element={<Overview />} />
          <Route path={ROUTES.ORDERS} element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
