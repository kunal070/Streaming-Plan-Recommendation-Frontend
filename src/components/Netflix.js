import React, { useState, useEffect } from 'react';
import '../Netflix.css'; // Import CSS file for styling'
import '../Loader.css';

function Netflix() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching plans data from an API
    useEffect(() => {
        fetch('http://localhost:8080/api/netflix/plans')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setPlans(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loader"></div>;
    }

    if (error) {
        return <div className="error">Error: {error.message}</div>;
    }

    return (
        <div className="netflix-container">
            <h1>Netflix Plans</h1>
            <div className="plans-grid">
                {plans.map(plan => (
                    <div className="plan-box" key={plan.id}>
                        <h2>{plan.planName}</h2>
                        <p>Price: {plan.price}</p>
                        <p>Ad-Supported: {plan.adSupported}</p>
                        <p>Video Quality: {plan.videoQuality}</p>
                        <p>Spatial Audio: {plan.spatialAudio}</p>
                        <p>WatchDevices: {plan.supportedWatchDevices}</p>
                        <p>supportedDownloadDevices: {plan.supportedDownloadDevices}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Netflix;
