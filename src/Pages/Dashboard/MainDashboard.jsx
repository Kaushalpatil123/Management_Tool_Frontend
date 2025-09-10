import { Route, Routes } from "react-router-dom";
import routes from "../../routes";

const MainDashboard = () => {
  return (
    <div className="bg-green-300 h-screen">
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Routes>
    </div>
  );
};

export default MainDashboard;
