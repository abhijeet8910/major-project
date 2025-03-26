import React from 'react';
import ModelViewer from './3DModelViewer';

const Buy = ({ plant, onBack }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <button
        onClick={onBack}
        className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 mb-6"
      >
        ← Back
      </button>

      {plant && (
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
          <ModelViewer
            key={plant.id}
            modelUrl={plant.modelUrl}
            title={plant.title}
            description={plant.description}
            alt={plant.alt}
          />
        </div>
      )}
    </div>
  );
};

export default Buy;
