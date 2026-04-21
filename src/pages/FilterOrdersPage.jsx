import { useMemo, useState } from "react";
import OrderCard from "../components/OrderCard";
import { useAppContext } from "../context/useAppContext";
import { STATUS_OPTIONS } from "../services/orderUtils";

function FilterOrdersPage() {
  const { validOrders } = useAppContext();
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [restaurantFilter, setRestaurantFilter] = useState("ALL");

  const restaurantOptions = useMemo(
    () => [...new Set(validOrders.map((order) => order.restaurant))],
    [validOrders],
  );

  const filteredOrders = useMemo(
    () =>
      validOrders.filter((order) => {
        const matchStatus = statusFilter === "ALL" || order.status === statusFilter;
        const matchRestaurant =
          restaurantFilter === "ALL" || order.restaurant === restaurantFilter;
        return matchStatus && matchRestaurant;
      }),
    [validOrders, statusFilter, restaurantFilter],
  );

  return (
    <section className="page">
      <div className="filters">
        <label>
          Status
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="ALL">All</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          Restaurant
          <select
            value={restaurantFilter}
            onChange={(event) => setRestaurantFilter(event.target.value)}
          >
            <option value="ALL">All</option>
            {restaurantOptions.map((restaurant) => (
              <option key={restaurant} value={restaurant}>
                {restaurant}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="info-banner">
        <p>
          <strong>Filtered Results:</strong> {filteredOrders.length}
        </p>
      </div>

      <div className="grid">
        {filteredOrders.map((order) => (
          <OrderCard key={order.orderId} order={order} showControls={false} />
        ))}
      </div>
    </section>
  );
}

export default FilterOrdersPage;
