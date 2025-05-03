import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DetailedPlants = ({ plant, onBack }) => {
  const [dropdowns, setDropdowns] = useState({});
  const [plantDetails, setPlantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleDropdown = (key) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const renderDropdown = (title, content) => {
    if (!content || (Array.isArray(content) && content.length === 0)) return null;

    return (
      <div className="mb-4">
        <button
          onClick={() => toggleDropdown(title)}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-md shadow-md text-left font-medium flex justify-between items-center"
        >
          {title}
          <span>{dropdowns[title] ? '▲' : '▼'}</span>
        </button>
        {dropdowns[title] && (
          <div className="mt-2 bg-white shadow-md rounded-md p-4">
            {Array.isArray(content) ? (
              <ul className="list-disc list-inside">
                {content.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            ) : typeof content === 'object' ? (
              <pre className="text-gray-700">{JSON.stringify(content, null, 2)}</pre>
            ) : (
              <p className="text-gray-700">{content}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const fetchPlantDetails = async () => {
      try {
        const response = await axios.get(
          `https://perenual.com/api/species/details/${plant.id}?key=sk-Z5XD676ae7cf3ce158074&lang=en`
        );
        setPlantDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch plant details.');
        setLoading(false);
      }
    };

    fetchPlantDetails();
  }, [plant.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold text-green-600">Loading plant details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  // Determine best image source
  const imageUrl =
    plant.default_image?.original_url ||
    plantDetails?.default_image?.original_url ||
    plant.default_image?.medium_url ||
    'https://via.placeholder.com/400?text=Image+Not+Available';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-100 to-purple-200 p-6">
      {/* Back Button */}
      <nav className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-white bg-green-600 hover:bg-green-800 px-4 py-2 rounded-md shadow-lg"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-gray-800 ml-4">
          {plant.common_name || 'Plant Details'}
        </h1>
      </nav>

      {/* Plant Details Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Image and Basic Details */}
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <img
            src={imageUrl}
            alt={plant.common_name || 'Plant Image'}
            className="rounded-lg shadow-lg w-full lg:w-1/3 object-contain"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400?text=Unavailable';
            }}
          />
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">
              About {plant.common_name || 'this Plant'}
            </h2>
            <p className="text-gray-700 text-lg mb-2">
              <strong>Scientific Name:</strong> {plant.scientific_name?.join(', ') || 'N/A'}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Family:</strong> {plant.family || 'N/A'}
            </p>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-6">
          {renderDropdown('Description', plantDetails.description)}
          {renderDropdown('Type', plantDetails.type)}
          {renderDropdown(
            'Dimensions',
            plantDetails.dimensions?.min_value
              ? `Height: ${plantDetails.dimensions.min_value}-${plantDetails.dimensions.max_value} ${plantDetails.dimensions.unit}`
              : null
          )}
          {renderDropdown('Cycle', plantDetails.cycle)}
          {renderDropdown(
            'Watering Needs',
            plantDetails.watering
              ? `${plantDetails.watering} (${plantDetails.volume_water_requirement?.value} ${plantDetails.volume_water_requirement?.unit})`
              : null
          )}
          {renderDropdown('Watering Period', plantDetails.watering_period)}
          {renderDropdown(
            'Plant Anatomy',
            plantDetails.plant_anatomy
              ? `Bark: ${plantDetails.plant_anatomy.bark}, Leaves: ${plantDetails.plant_anatomy.leaves}`
              : null
          )}
          {renderDropdown('Sunlight Requirements', plantDetails.sunlight)}
          {renderDropdown('Pruning Months', plantDetails.pruning_month)}
          {renderDropdown('Attracts', plantDetails.attracts)}
          {renderDropdown('Propagation Methods', plantDetails.propagation)}
          {renderDropdown(
            'Hardiness Zone',
            plantDetails.hardiness?.min
              ? `Zone ${plantDetails.hardiness.min}-${plantDetails.hardiness.max}`
              : null
          )}
          {renderDropdown('Flowering Season', plantDetails.flowering_season)}
          {renderDropdown('Leaf Color', plantDetails.leaf_color)}
          {renderDropdown('Medicinal Properties', plantDetails.medicinal ? 'Yes' : null)}
          {renderDropdown('Care Level', plantDetails.care_level)}
          {renderDropdown('Growth Rate', plantDetails.growth_rate)}
          {renderDropdown('Maintenance', plantDetails.maintenance)}
          {renderDropdown(
            'Hardiness Map',
            plantDetails.hardiness_location?.full_url ? (
              <iframe
                src={plantDetails.hardiness_location.full_url}
                width="100%"
                height="550"
                title="Hardiness Map"
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedPlants;
