import type { RouteObject } from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Deliveries } from "../pages/Deliveries";
import { Couriers } from "../pages/Couriers";
import { PrivateRoute } from "./PrivateRoute";
import { NewDelivery } from "../pages/NewDelivery";
import { NewCourier } from "../pages/NewCourier";

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard", 
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/deliveries", 
    element: (
      <PrivateRoute>
        <Deliveries />
      </PrivateRoute>
    ),
  },
  {
    path: "/couriers", 
    element: (
      <PrivateRoute>
        <Couriers />
      </PrivateRoute>
    ),
  },
  {
    path: "/deliveries/new", 
    element: (
      <PrivateRoute>
        <NewDelivery />
      </PrivateRoute>
    ),
  },
  {
    path: "/couriers/new", 
    element: (
      <PrivateRoute>
        <NewCourier />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <Login />,
  },
];
