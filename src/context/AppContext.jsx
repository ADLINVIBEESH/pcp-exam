import { useMemo, useReducer } from "react";
import { AppContext } from "./AppContextStore";
import { ACTION_TYPES, appReducer } from "../reducer/AppReducer";
import { getInitialOrders } from "../services/orderData";
import { getValidOrders, isValidOrder } from "../services/orderUtils";

const initialState = {
  orders: getInitialOrders(),
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const validOrders = useMemo(() => getValidOrders(state.orders), [state.orders]);
  const invalidOrdersCount = useMemo(
    () => state.orders.filter((order) => !isValidOrder(order)).length,
    [state.orders],
  );

  const value = useMemo(
    () => ({
      rawOrders: state.orders,
      validOrders,
      invalidOrdersCount,
      moveOrderToNextStatus: (orderId) =>
        dispatch({
          type: ACTION_TYPES.MOVE_ORDER_TO_NEXT_STATUS,
          payload: { orderId },
        }),
      cancelOrder: (orderId) =>
        dispatch({
          type: ACTION_TYPES.CANCEL_ORDER,
          payload: { orderId },
        }),
    }),
    [state.orders, validOrders, invalidOrdersCount],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
