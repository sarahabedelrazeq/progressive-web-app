import { ErrorBoundary, Fallback } from "components";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import routes from "routes";
import "./sass/index.scss";

function App() {
  const { pathname } = useLocation();

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ErrorBoundary>
      <div>
        <React.Suspense
          fallback={
            <div style={{ height: "100vh" }}>
              <Fallback />
            </div>
          }
        >
          <Routes basename="/">
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.component />}
                  />
                )
              );
            })}
          </Routes>
        </React.Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
