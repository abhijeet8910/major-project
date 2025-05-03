import React from 'react';

const OrderDetailCard = ({ order, onUpdate }) => {
  const { user, items, totalAmount, status, createdAt, shippingAddress } = order;

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">👤 Buyer Info</h3>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p>
          <strong>Address:</strong>{' '}
          {shippingAddress
            ? `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.zipCode}, ${shippingAddress.country}`
            : 'N/A'}
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-gray-700 mb-1">📦 Products</h4>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="bg-gray-50 p-2 rounded border">
              <p><strong>Product:</strong> {item.product?.name}</p>
              <p><strong>Price:</strong> ₹{parseFloat(item.price).toFixed(2)}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div>
          <p className="text-sm text-gray-600">Order placed on {new Date(createdAt).toLocaleString()}</p>
          <p className="font-semibold text-green-700">Total: ₹{parseFloat(totalAmount).toFixed(2)}</p>
          <p className="text-sm">Status: <span className="font-medium">{status}</span></p>
        </div>
        <button
          onClick={onUpdate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Update Status
        </button>
      </div>
    </div>
  );
};

export default OrderDetailCard;
