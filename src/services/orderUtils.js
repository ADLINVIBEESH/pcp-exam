export const STATUS_OPTIONS = [
  "PLACED",
  "PREPARING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

const MOVABLE_STATUS_FLOW = [
  "PLACED",
  "PREPARING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

export const isNonEmptyText = (value) =>
  typeof value === "string" && value.trim().length > 0;

export const isValidOrderItem = (item) => {
  if (!item || typeof item !== "object") {
    return false;
  }

  const hasValidName = isNonEmptyText(item.name);
  const hasValidPrice = Number.isFinite(item.price) && item.price > 0;
  const hasValidQuantity =
    Number.isFinite(item.quantity) && item.quantity > 0 && Number.isInteger(item.quantity);

  return hasValidName && hasValidPrice && hasValidQuantity;
};

export const calculateItemsTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const isValidRating = (rating) =>
  rating === null ||
  rating === undefined ||
  (Number.isFinite(rating) && rating >= 1 && rating <= 5);

export const isValidOrder = (order) => {
  if (!order || typeof order !== "object") {
    return false;
  }

  if (!isNonEmptyText(String(order.orderId ?? ""))) {
    return false;
  }

  if (!isNonEmptyText(order.customerName) || !isNonEmptyText(order.restaurant)) {
    return false;
  }

  if (!Array.isArray(order.items) || order.items.length === 0) {
    return false;
  }

  if (!order.items.every(isValidOrderItem)) {
    return false;
  }

  if (!Number.isFinite(order.totalAmount) || order.totalAmount <= 0) {
    return false;
  }

  const itemsTotal = calculateItemsTotal(order.items);
  if (Math.abs(itemsTotal - order.totalAmount) > 0.01) {
    return false;
  }

  if (!STATUS_OPTIONS.includes(order.status)) {
    return false;
  }

  if (Number.isNaN(Date.parse(order.deliveryTime))) {
    return false;
  }

  if (!isValidRating(order.rating)) {
    return false;
  }

  return true;
};

export const cloneOrder = (order) => ({
  ...order,
  items: order.items.map((item) => ({ ...item })),
});

export const getValidOrders = (orders) =>
  orders.filter(isValidOrder).map((order) => cloneOrder(order));

export const getNextStatus = (currentStatus) => {
  const index = MOVABLE_STATUS_FLOW.indexOf(currentStatus);

  if (index === -1 || index === MOVABLE_STATUS_FLOW.length - 1) {
    return currentStatus;
  }

  return MOVABLE_STATUS_FLOW[index + 1];
};

export const canMoveToNextStatus = (status) =>
  MOVABLE_STATUS_FLOW.includes(status) && status !== "DELIVERED";

export const canCancelOrder = (status) =>
  status !== "DELIVERED" && status !== "CANCELLED";

export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDeliveryTime = (dateValue) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateValue));
