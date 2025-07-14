import type { RouteObject } from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";

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
    path: "*",
    element: <Login />,
  },
];
