import { Link, useParams } from "react-router-dom";
import OrderCard from "../components/OrderCard";
import { useAppContext } from "../context/useAppContext";

function OrderDetailsPage() {
  const { id } = useParams();
  const { validOrders, moveOrderToNextStatus, cancelOrder } = useAppContext();

  const order = validOrders.find((item) => String(item.orderId) === String(id));

  if (!order) {
    return (
      <section className="page">
        <p className="helper-text">Order not found in valid dataset.</p>
        <Link className="button link-style" to="/orders">
          Back to Orders
        </Link>
      </section>
    );
  }

  return (
    <section className="page">
      <OrderCard
        order={order}
        showControls
        onMoveNext={moveOrderToNextStatus}
        onCancel={cancelOrder}
      />
    </section>
  );
}

export default OrderDetailsPage;
