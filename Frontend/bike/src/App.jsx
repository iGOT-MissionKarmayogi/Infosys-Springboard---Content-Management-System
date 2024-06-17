import React from "react";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import SportsPage from "./pages/SportsPage";
import AdventurePage from "./pages/AdventurePage";
import CruiserPage from "./pages/CruiserPage";
import ElectricPage from "./pages/ElectricPage";
import BikeDetails from "./components/BikeDetails";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/adventure" element={<AdventurePage />} />
        <Route path="/cruiser" element={<CruiserPage />} />
        <Route path="/electric" element={<ElectricPage />} />
        <Route path="/bikedetail/:id" element={<BikeDetails />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
