const RAW_ORDERS = [
  {
    orderId: "FD-1001",
    customerName: "Aarav Kumar",
    restaurant: "Spice Route",
    items: [
      { name: "Paneer Roll", price: 120, quantity: 2 },
      { name: "Masala Fries", price: 90, quantity: 1 },
    ],
    totalAmount: 330,
    status: "PLACED",
    deliveryTime: "2026-04-21T13:30:00.000Z",
    rating: null,
  },
  {
    orderId: "FD-1002",
    customerName: "Nisha Patel",
    restaurant: "Burger Town",
    items: [
      { name: "Veg Burger", price: 180, quantity: 1 },
      { name: "Lemon Soda", price: 70, quantity: 1 },
    ],
    totalAmount: 250,
    status: "OUT_FOR_DELIVERY",
    deliveryTime: "2026-04-21T12:45:00.000Z",
    rating: 4,
  },
  {
    orderId: "FD-1003",
    customerName: "Sanjay Iyer",
    restaurant: "South Bowl",
    items: [
      { name: "Mini Meals", price: 210, quantity: 1 },
      { name: "Curd Rice", price: 120, quantity: 1 },
    ],
    totalAmount: 330,
    status: "DELIVERED",
    deliveryTime: "2026-04-21T11:10:00.000Z",
    rating: 5,
  },
  {
    orderId: "FD-1004",
    customerName: "Riya Mehta",
    restaurant: "Pizza Planet",
    items: [
      { name: "Margherita", price: 320, quantity: 1 },
      { name: "Garlic Bread", price: 140, quantity: 1 },
    ],
    totalAmount: 460,
    status: "CANCELLED",
    deliveryTime: "2026-04-21T14:20:00.000Z",
    rating: null,
  },
  {
    orderId: "FD-1005",
    customerName: "",
    restaurant: "Spice Route",
    items: [{ name: "Veg Pulao", price: 180, quantity: 1 }],
    totalAmount: 180,
    status: "PLACED",
    deliveryTime: "2026-04-21T15:20:00.000Z",
    rating: 3,
  },
  {
    orderId: "FD-1006",
    customerName: "Ishita Sharma",
    restaurant: "Pizza Planet",
    items: [{ name: "Farmhouse Pizza", price: -450, quantity: 1 }],
    totalAmount: -450,
    status: "PREPARING",
    deliveryTime: "2026-04-21T16:10:00.000Z",
    rating: 4,
  },
  {
    orderId: null,
    customerName: "Rahul Verma",
    restaurant: "Wok Works",
    items: [{ name: "Noodles", price: 190, quantity: 1 }],
    totalAmount: 190,
    status: "PLACED",
    deliveryTime: "2026-04-21T15:55:00.000Z",
    rating: null,
  },
  {
    orderId: "FD-1008",
    customerName: "Neha Das",
    restaurant: "Burger Town",
    items: [{ name: "Cheese Burger", price: 210, quantity: 1 }],
    totalAmount: 210,
    status: "DONE",
    deliveryTime: "2026-04-21T10:30:00.000Z",
    rating: 4,
  },
  {
    orderId: "FD-1009",
    customerName: "Karthik Jain",
    restaurant: "South Bowl",
    items: { name: "Dosa", price: 130, quantity: 2 },
    totalAmount: 260,
    status: "PLACED",
    deliveryTime: "2026-04-21T17:10:00.000Z",
    rating: null,
  },
  {
    orderId: "FD-1010",
    customerName: "Priya Nair",
    restaurant: "Spice Route",
    items: [{ name: "Veg Thali", price: 490, quantity: 1 }],
    totalAmount: 999,
    status: "PREPARING",
    deliveryTime: "2026-04-21T12:05:00.000Z",
    rating: 5,
  },
  {
    orderId: "FD-1011",
    customerName: "Harsh Gupta",
    restaurant: "Wok Works",
    items: [
      { name: "Manchurian", price: 220, quantity: 1 },
      { name: "Hakka Noodles", price: 180, quantity: 1 },
    ],
    totalAmount: 400,
    status: "DELIVERED",
    deliveryTime: "2026-04-21T09:30:00.000Z",
    rating: 7,
  },
  {
    orderId: "FD-1012",
    customerName: "Mohit Rana",
    restaurant: "Burger Town",
    items: [{ name: "Wrap", price: 150, quantity: 2 }],
    totalAmount: 300,
    status: "PLACED",
    deliveryTime: "not-a-date",
    rating: 4,
  },
];

const deepFreeze = (value) => {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }

  Object.freeze(value);
  Object.keys(value).forEach((key) => deepFreeze(value[key]));
  return value;
};

const cloneOrder = (order) => ({
  ...order,
  items: Array.isArray(order.items)
    ? order.items.map((item) => ({ ...item }))
    : order.items,
});

deepFreeze(RAW_ORDERS);

export const getInitialOrders = () => RAW_ORDERS.map((order) => cloneOrder(order));
