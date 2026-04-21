import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import FilterOrdersPage from "../pages/FilterOrdersPage";
import NotFoundPage from "../pages/NotFoundPage";
import OrderDetailsPage from "../pages/OrderDetailsPage";
import OrdersPage from "../pages/OrdersPage";
import StatsPage from "../pages/StatsPage";

function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate replace to="/orders" />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailsPage />} />
        <Route path="/filter" element={<FilterOrdersPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
