import {
  canCancelOrder,
  canMoveToNextStatus,
  getNextStatus,
} from "../services/orderUtils";

function StatusControls({ order, onMoveNext, onCancel }) {
  const canMove = canMoveToNextStatus(order.status);
  const canCancel = canCancelOrder(order.status);
  const nextStatus = getNextStatus(order.status);

  return (
    <div className="status-controls">
      <button
        type="button"
        className="button small"
        onClick={() => onMoveNext(order.orderId)}
        disabled={!canMove}
      >
        Move to {nextStatus}
      </button>

      <button
        type="button"
        className="button small danger"
        onClick={() => onCancel(order.orderId)}
        disabled={!canCancel}
      >
        Cancel Order
      </button>
    </div>
  );
}

export default StatusControls;
