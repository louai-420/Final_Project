// frontend/src/components/Orders.js
import React from "react";

const Orders = () => {
  const orders = [
    { id: 1, date: "2023-10-01", total: 100, status: "Delivered" },
    { id: 2, date: "2023-10-05", total: 150, status: "Shipped" },
  ];

  return (
    <div>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
