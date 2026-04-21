import OrderCard from "../components/OrderCard";
import { useAppContext } from "../context/useAppContext";

function OrdersPage() {
  const { validOrders, invalidOrdersCount, moveOrderToNextStatus, cancelOrder } =
    useAppContext();

  return (
    <section className="page">
      <div className="info-banner">
        <p>
          <strong>Valid Orders:</strong> {validOrders.length}
        </p>
        <p>
          <strong>Invalid Orders Skipped:</strong> {invalidOrdersCount}
        </p>
      </div>

      <div className="grid">
        {validOrders.map((order) => (
          <OrderCard
            key={order.orderId}
            order={order}
            showControls
            onMoveNext={moveOrderToNextStatus}
            onCancel={cancelOrder}
          />
        ))}
      </div>
    </section>
  );
}

export default OrdersPage;
