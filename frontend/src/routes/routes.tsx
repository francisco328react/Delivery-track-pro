import type { RouteObject } from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Deliveries } from "../pages/Deliveries";
import { Couriers } from "../pages/Couriers";

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard", 
    element: (<Dashboard />),
  },
  {
    path: "/deliveries", 
    element: (<Deliveries />),
  },
  {
    path: "/couriers", 
    element: (<Couriers />),
  },
  {
    path: "*",
    element: <Login />,
  },
];
