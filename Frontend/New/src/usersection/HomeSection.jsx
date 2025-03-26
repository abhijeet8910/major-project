import React, { useState } from 'react';
import PlantCard from '../usercomponents/PlantCard';
import DetailedPlants from '../usercomponents/DetailedPlants';
import plantsData from '../usercomponents/PlantsData.json';

import tulsi from '../assets/tulsi.jpg';
import aloe_vera from '../assets/aloe_vera.jpg';
import neem from '../assets/neem.jpg';
import ashwagandha from '../assets/ashwagandha.jpg';
import ginger from '../assets/ginger.jpg';
import turmeric from '../assets/turmeric.jpg';
import mint from '../assets/mint.jpg';
import rosemary from '../assets/rosemary.jpg';
import lemongrass from '../assets/lemongrass.jpg';
import bottle_gourd from '../assets/bottle_gourd.jpg';

const imageMap = {
  'tulsi.jpg': tulsi,
  'aloe_vera.jpg': aloe_vera,
  'neem.jpg': neem,
  'ashwagandha.jpg': ashwagandha,
  'ginger.jpg': ginger,
  'turmeric.jpg': turmeric,
  'mint.jpg': mint,
  'rosemary.jpg': rosemary,
  'lemongrass.jpg': lemongrass,
  'bottle_gourd.jpg': bottle_gourd,
};

const HomeSection = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);

  const handleMoreDetails = (plant) => {
    setSelectedPlant(plant);
  };

  const handleBack = () => {
    setSelectedPlant(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-blue-100 to-purple-200 py-8 px-4">
      {selectedPlant ? (
        <DetailedPlants plant={selectedPlant} onBack={handleBack} />
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
            Welcome to Your Herbal Garden
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plantsData.map((plant) => (
              <PlantCard
                key={plant.id}
                imgSrc={imageMap[plant.imgSrc]}
                name={plant.name}
                usage={plant.usage}
                onMoreDetails={() => handleMoreDetails(plant)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeSection;
