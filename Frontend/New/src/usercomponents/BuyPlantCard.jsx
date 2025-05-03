import React from 'react';

const BuyPlantCard = ({ imgSrc, name, usage, price, availability, onMoreDetails }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
      <div className="w-full h-60 bg-gray-100 flex items-center justify-center">
        <img
          src={imgSrc}
          alt={name}
          className="h-full w-full object-contain p-2"
          onError={(e) => {
            e.target.src = '/placeholder.jpg'; // fallback image
            e.target.alt = 'Image not available';
          }}
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 truncate">{name}</h3>
        <p className="text-gray-600 mt-2">{usage}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-green-600">₹{price.toFixed(2)}</span>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              availability === 'In Stock'
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {availability}
          </span>
        </div>
        <button
          onClick={onMoreDetails}
          className="block mt-5 px-4 py-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full"
        >
          More Details
        </button>
      </div>
    </div>
  );
};

export default BuyPlantCard;
