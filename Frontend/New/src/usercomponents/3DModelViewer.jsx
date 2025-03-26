import React, { useState } from 'react';


const ModelViewer = ({ modelUrl, alt, title, description, onBuyClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBuyClick = () => {
        setIsModalOpen(true);
        if (onBuyClick) onBuyClick();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="navbar mb-6 flex justify-between items-center bg-green-600 text-white p-4 rounded-t-lg">
                <h1 className="text-2xl font-bold">3D Model Viewer</h1>
            </div>

            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">{title}</h2>

            <div className="relative">
                <model-viewer
                    src={modelUrl}
                    alt={alt}
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    camera-controls
                    auto-rotate
                    rotation-per-second="30deg"
                    shadow-intensity="1"
                    environment-image="neutral"
                    exposure="1"
                    camera-orbit="0deg 75deg 105%"
                    min-camera-orbit="auto auto 50%"
                    max-camera-orbit="auto auto 150%"
                    style={{ width: '100%', height: '500px' }}
                >
                    <div className="progress-bar hide" slot="progress-bar">
                        <div className="update-bar"></div>
                    </div>
                    <button
                        slot="ar-button"
                        id="ar-button"
                        className="absolute top-4 right-4 z-10 bg-white text-black border rounded px-4 py-2 hover:bg-gray-200"
                    >
                        ARView in your space
                    </button>
                </model-viewer>
            </div>

            <p className="text-gray-700 text-lg mt-6">{description}</p>

            <div className="mt-6 flex justify-center">
                <button
                    onClick={handleBuyClick}
                    className="bg-blue-600 text-white py-3 px-6 rounded-full shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                >
                    Buy Now
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">Purchase {title}</h2>
                        <p className="text-gray-700 mb-4">Are you sure you want to purchase this plant?</p>
                        <div className="flex justify-between">
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-300 text-black px-6 py-2 rounded-full hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
                            >
                                Confirm Purchase
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModelViewer;
