import React, { useState, useEffect } from 'react';
import '../BestPlan.css';
import '../Loader.css';

function BestPlan() {
    const [plan, setPlan] = useState(null); // Use a single plan object instead of an array
    const [loading, setLoading] = useState(false); // Set loading to false initially
    const [error, setError] = useState(null);
    const [selectedButton, setSelectedButton] = useState(null);

    // Handle button click to select the criteria
    const handleButtonClick = (buttonType) => {
        setSelectedButton(buttonType);
    };

    useEffect(() => {
        if (!selectedButton) return; // Avoid fetching if no button is selected

        // Set loading state before fetching
        setLoading(true);
        setError(null); // Reset any previous errors

        const endpoint = selectedButton === 'price' 
            ? 'http://localhost:8080/api/best/price' 
            : 'http://localhost:8080/api/best/videoquality';

        fetch(endpoint)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setPlan(data); // Directly set the single plan object
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            });
    }, [selectedButton]); // Trigger when selectedButton changes

    // Return loading state
    if (loading) {
        return <div className="updated-loader"></div>;
    }

    // Return error state if any
    if (error) {
        return <div className="updated-error">Error: {error.message}</div>;
    }

    return (
        <div className="updated-container">
            <div className="updated-heading">Choose the best plan for you by selecting the criteria below:</div>
            <div className="updated-button-container">
                <button 
                    className={`updated-button ${selectedButton === 'price' ? 'updated-selected' : ''}`} 
                    onClick={() => handleButtonClick('price')}
                >
                    Price
                </button>
                <button 
                    className={`updated-button ${selectedButton === 'videoQuality' ? 'updated-selected' : ''}`} 
                    onClick={() => handleButtonClick('videoQuality')}
                >
                    Video Quality
                </button>
            </div>
            {/* Conditionally render a single centered plan box if the plan data is available */}
            {plan && (
                <div className="updated-plan-box">
                    <p className='head' style={{color : '#d32f2f', marginBottom : '10px',fontSize:'30px'}}>{plan.streamingService}</p>
                    <p className='plane' style={{marginBottom : '10px',fontSize:'22px'}}>{plan.plan}</p>
                    <p>Price: {plan.price}</p>
                    <p>Ad-Supported: {plan.adSupported}</p>
                    <p>Video Quality: {plan.videoQuality}</p>
                    <p>Spatial Audio: {plan.spatialAudio}</p>
                    <p>Watch Devices: {plan.watchDevice}</p>
                    <p>Supported Download Devices: {plan.supportedDownloadDevices}</p>
                </div>
            )}
        </div>
    );
}

export default BestPlan;
