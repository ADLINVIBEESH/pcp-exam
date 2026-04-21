import { Link } from "react-router-dom";
import { formatCurrency, formatDeliveryTime } from "../services/orderUtils";
import StatusControls from "./StatusControls";

function OrderCard({ order, showControls, onMoveNext, onCancel }) {
  return (
    <article className="card" data-testid="order-item">
      <div className="card-head">
        <h3>{order.orderId}</h3>
        <span className={`status-pill status-${order.status.toLowerCase()}`}>
          {order.status}
        </span>
      </div>

      <p>
        <strong>Customer:</strong> {order.customerName}
      </p>
      <p>
        <strong>Restaurant:</strong> {order.restaurant}
      </p>
      <p>
        <strong>Delivery Time:</strong> {formatDeliveryTime(order.deliveryTime)}
      </p>

      <ul className="item-list">
        {order.items.map((item) => (
          <li key={`${order.orderId}-${item.name}`}>
            {item.name} - {item.quantity} x {formatCurrency(item.price)}
          </li>
        ))}
      </ul>

      <p className="total-line">
        <strong>Total:</strong> {formatCurrency(order.totalAmount)}
      </p>

      <div className="card-actions">
        <Link className="button link-style" to={`/orders/${order.orderId}`}>
          View Details
        </Link>
      </div>

      {showControls ? (
        <StatusControls order={order} onMoveNext={onMoveNext} onCancel={onCancel} />
      ) : null}

    </article>
  );
}

export default OrderCard;
