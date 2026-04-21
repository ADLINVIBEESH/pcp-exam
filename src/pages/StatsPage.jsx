import { useEffect, useMemo } from "react";
import { useAppContext } from "../context/useAppContext";
import { formatCurrency, STATUS_OPTIONS } from "../services/orderUtils";

function StatsPage() {
  const { validOrders } = useAppContext();

  const totalOrders = validOrders.length;
  const deliveredOrders = validOrders.filter((order) => order.status === "DELIVERED").length;
  const cancelledOrders = validOrders.filter((order) => order.status === "CANCELLED").length;

  const totalRevenue = validOrders
    .filter((order) => order.status === "DELIVERED")
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const ratedOrders = validOrders.filter((order) => Number.isFinite(order.rating));
  const averageRating = ratedOrders.length
    ? ratedOrders.reduce((sum, order) => sum + order.rating, 0) / ratedOrders.length
    : 0;

  const statusSummary = useMemo(
    () =>
      STATUS_OPTIONS.reduce((summary, status) => {
        summary[status] = validOrders.filter((order) => order.status === status).length;
        return summary;
      }, {}),
    [validOrders],
  );

  useEffect(() => {
    window.appState = {
      totalOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
      averageRating,
    };
  }, [totalOrders, deliveredOrders, cancelledOrders, totalRevenue, averageRating]);

  return (
    <section className="page">
      <div className="stats-grid">
        <article className="stat-card">
          <h3>Total Orders</h3>
          <p data-testid="total-orders">{totalOrders}</p>
        </article>
        <article className="stat-card">
          <h3>Delivered Orders</h3>
          <p data-testid="delivered-orders">{deliveredOrders}</p>
        </article>
        <article className="stat-card">
          <h3>Cancelled Orders</h3>
          <p data-testid="cancelled-orders">{cancelledOrders}</p>
        </article>
        <article className="stat-card">
          <h3>Delivered Revenue</h3>
          <p>{formatCurrency(totalRevenue)}</p>
        </article>
        <article className="stat-card">
          <h3>Average Rating</h3>
          <p>{averageRating.toFixed(1)}</p>
        </article>
      </div>

      <h3>Status Breakdown</h3>
      <ul className="status-breakdown">
        {Object.entries(statusSummary).map(([status, count]) => (
          <li key={status}>
            <strong>{status}</strong>: {count}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default StatsPage;
