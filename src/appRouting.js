import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Layout from "./pages/layout";
import RequireAuth from "./requireAuth";
import UserList from "./pages/layout/userList/userList";
import ArtsList from "./pages/layout/artsList/artsList";
import Artist from "./pages/layout/artist/artist";

const routes = [
  { path: "/", component: <Login />, protectedPath: false },
  {
    path: "dashboard",
    component: <Layout />,
    protectedPath: true,
    childRoutes: [
      { path: "", component: <UserList />, protectedPath: false },
      { path: "artsList", component: <ArtsList />, protectedPath: false },
      {
        path: "artist",
        component: <Artist />,
        protectedPathF: false,
      },
    ],
  },
];

const AppRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, component, childRoutes, protectedPath }) => (
          <Route
            key={Math.random()}
            path={path}
            element={
              <RequireAuth protectedPath={protectedPath}>
                {component}
              </RequireAuth>
            }
          >
            {childRoutes?.length > 0 &&
              childRoutes.map(({ path, component }) => (
                <Route key={Math.random()} path={path} element={component} />
              ))}
          </Route>
        ))}
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouting;
