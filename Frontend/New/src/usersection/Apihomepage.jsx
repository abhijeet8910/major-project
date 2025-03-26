import React, { useState, useEffect } from 'react';
import PlantCard from '../usercomponents/PlantCard';
import DetailedPlants from '../usercomponents/DetailedPlants';
import axios from 'axios';

const HomeSection = () => {
  const [plantsData, setPlantsData] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const plantsPerPage = 10; // Set how many plants per page you want

  const handleMoreDetails = (plant) => {
    setSelectedPlant(plant);
  };

  const handleBack = () => {
    setSelectedPlant(null);
  };

  // Filter plants based on the search query
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(
          `https://perenual.com/api/species-list?key=sk-Z5XD676ae7cf3ce158074&lang=en&page=${currentPage}&limit=${plantsPerPage}`
        );
        const fetchedPlants = response.data?.data || [];
        setPlantsData(fetchedPlants);

        // Apply search filter on all plants
        if (searchQuery) {
          const filtered = fetchedPlants.filter((plant) =>
            plant.common_name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredPlants(filtered);
        } else {
          setFilteredPlants(fetchedPlants);
        }

        setTotalPages(Math.ceil(response.data?.total / plantsPerPage)); // Adjust if API provides total count
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data from the API.');
        setLoading(false);
      }
    };

    fetchPlants();
  }, [currentPage, searchQuery]); // Fetch data whenever page or search query changes

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold text-green-600">Loading plants data...</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-blue-100 to-purple-200 py-8 px-4 pb-16">
      {/* This pb-16 adds padding at the bottom to prevent footer overlap */}

      {selectedPlant ? (
        <DetailedPlants plant={selectedPlant} onBack={handleBack} />
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
            Welcome to Your Herbal Garden
          </h1>

          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search for a plant..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 px-4 py-2 rounded-md border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-600 text-lg"
            />
          </div>

          {/* Plants Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredPlants.length > 0 ? (
              filteredPlants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  imgSrc={plant.default_image?.thumbnail || 'placeholder-image-url.jpg'}
                  name={plant.common_name || 'Unknown Plant'}
                  usage={plant.scientific_name || 'No details available'}
                  onMoreDetails={() => handleMoreDetails(plant)}
                />
              ))
            ) : (
              <p className="text-lg text-center text-gray-600">No plants found matching your search.</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800 disabled:bg-gray-400"
            >
              Previous
            </button>
            <span className="flex items-center justify-center text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800 disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeSection;
