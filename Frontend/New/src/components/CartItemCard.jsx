import React from 'react';

const CartItemCard = ({ item, onRemove, onIncrease, onDecrease }) => {
  const totalPrice = item.price * item.quantity;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          <p className="text-sm text-gray-600 mt-2">Price: <span className="font-medium text-green-700">${item.price}</span></p>
          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
          <p className="text-sm text-gray-800 mt-1 font-semibold">Total: ${totalPrice.toFixed(2)}</p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDecrease(item._id)}
              className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-sm">{item.quantity}</span>
            <button
              onClick={() => onIncrease(item._id)}
              className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>

          <button
            onClick={() => onRemove(item._id)}
            className="text-sm text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>

        {/* Future option - Wishlist button */}
        {/* <button className="mt-2 text-blue-500 hover:underline text-sm">Move to Wishlist</button> */}
      </div>
    </div>
  );
};

export default CartItemCard;
