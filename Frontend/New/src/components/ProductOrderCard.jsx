import React from 'react';

const ProductOrderCard = ({ type, data, onEdit, onDelete, onUpdate }) => {
  const imageUrl = data.imageUrl?.startsWith('http')
    ? data.imageUrl
    : `http://localhost:4008${data.imageUrl}`; // Prepend base URL if needed

  if (type === 'product') {
    return (
      <div className="bg-white p-4 rounded shadow flex flex-col justify-between">
        <img
          src={imageUrl}
          alt={data.name}
          className="w-full h-48 object-contain bg-gray-100 rounded mb-2 border border-gray-200"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/150'; // Fallback image
          }}
        />
        <h3 className="text-lg font-bold">{data.name}</h3>
        <p className="text-sm text-gray-600">{data.description}</p>
        <div className="flex justify-between mt-2">
          <span className="text-green-700 font-bold">₹{data.price}</span>
          <span className="text-sm text-gray-500">Stock: {data.stock}</span>
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={onEdit} className="flex-1 bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
          <button onClick={onDelete} className="flex-1 bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </div>
      </div>
    );
  }

  if (type === 'order') {
    return (
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Order ID: {data._id}</h3>
        <p className="text-gray-600">Customer: {data.user?.name || 'N/A'}</p>
        <p className="text-gray-600">Total Price: ₹{data.totalPrice}</p>
        <p className="text-gray-600">Status: {data.status}</p>
        <button onClick={onUpdate} className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
          Update Status
        </button>
      </div>
    );
  }

  return null;
};

export default ProductOrderCard;
