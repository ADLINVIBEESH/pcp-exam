import {
  canCancelOrder,
  canMoveToNextStatus,
  cloneOrder,
  getNextStatus,
} from "../services/orderUtils";

export const ACTION_TYPES = {
  MOVE_ORDER_TO_NEXT_STATUS: "MOVE_ORDER_TO_NEXT_STATUS",
  CANCEL_ORDER: "CANCEL_ORDER",
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.MOVE_ORDER_TO_NEXT_STATUS: {
      const { orderId } = action.payload;

      return {
        ...state,
        orders: state.orders.map((order) => {
          if (String(order.orderId) !== String(orderId)) {
            return order;
          }

          if (!canMoveToNextStatus(order.status)) {
            return order;
          }

          return {
            ...cloneOrder(order),
            status: getNextStatus(order.status),
          };
        }),
      };
    }

    case ACTION_TYPES.CANCEL_ORDER: {
      const { orderId } = action.payload;

      return {
        ...state,
        orders: state.orders.map((order) => {
          if (String(order.orderId) !== String(orderId)) {
            return order;
          }

          if (!canCancelOrder(order.status)) {
            return order;
          }

          return {
            ...cloneOrder(order),
            status: "CANCELLED",
          };
        }),
      };
    }

    default:
      return state;
  }
};
