import React from 'react';


const PlantCard = ({ imgSrc, name, usage, onMoreDetails }) => {
    return (
        <div className="plant-card bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
            <img src={imgSrc} alt={name} className="plant-image w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="plant-name text-xl font-semibold text-gray-800">{name}</h3>
                <p className="plant-usage text-sm text-gray-600 mt-2">{usage}</p>
                <button
                    className="more-details-button mt-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white px-4 py-2 rounded-md font-medium shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-green-400 transition-colors duration-300"
                    onClick={onMoreDetails}
                >
                    More Details
                </button>
            </div>
        </div>
    );                
};

export default PlantCard;
