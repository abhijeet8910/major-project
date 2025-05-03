import React from 'react';

const OrderCard = ({ order, onCancel }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Order ID: {order._id}</h3>
        <p className="text-sm text-gray-600 mt-1">Status: {order.status}</p>
        <p className="text-sm text-gray-600">Items: {order.items?.map(i => i.name).join(', ') || 'N/A'}</p>
      </div>
      <button
        onClick={() => onCancel(order._id)}
        className="mt-4 text-red-600 hover:underline text-sm"
      >
        Cancel Order
      </button>
    </div>
  );
};

export default OrderCard;
