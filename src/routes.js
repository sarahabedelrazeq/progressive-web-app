import React from "react";

const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: React.lazy(() => import("pages/Home")),
  },
  {
    path: "/collections/:collection_name",
    exact: true,
    name: "Home",
    component: React.lazy(() => import("pages/Collections")),
  },
];

export default routes;
