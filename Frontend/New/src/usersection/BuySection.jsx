import React, { useState } from 'react';
import BuyPlantCard from '../usercomponents/BuyPlantCard';
import data from '../usercomponents/BuyData.json';
import Buy from '../usercomponents/Buy';

import tulsi from '../assets/tulsi.jpg';
import aloe_vera from '../assets/aloe_vera.jpg';
import neem from '../assets/neem.jpg';
import ashwagandha from '../assets/ashwagandha.jpg';
import ginger from '../assets/ginger.jpg';
import turmeric from '../assets/turmeric.jpg';
import mint from '../assets/mint.jpg';
import rosemary from '../assets/rosemary.jpg';
import lemongrass from '../assets/lemongrass.jpg';

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
};

const BuySection = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);

  const handleMoreDetails = (plant) => {
    setSelectedPlant(plant);
  };

  const handleBack = () => {
    setSelectedPlant(null);
  };

  return (
    <div className="buy-section p-8 bg-gradient-to-r from-green-100 to-green-300 rounded-lg shadow-xl">
      {selectedPlant ? (
        <Buy plant={selectedPlant} onBack={handleBack} />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center text-green-800 mb-8">Buy Plants</h1>
          <div className="cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((plant) => (
              <BuyPlantCard
                key={plant.id}
                imgSrc={imageMap[plant.imgSrc]}
                name={plant.name}
                usage={plant.usage}
                price={plant.price}
                buyNowUrl={plant.buyNowUrl}
                availability={plant.availability}
                onMoreDetails={() => handleMoreDetails(plant)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BuySection;
