import React, { useState, useEffect } from 'react';
import '../Disney.css';
import '../Loader.css';


function Disney() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/Disney/plans') // Ensure this URL is correct
            .then((response) => {
                console.log('Response Status:', response.status); // Debugging response status
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Fetched Data:', data); // Debugging fetched data
                setPlans(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error); // Debugging error
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
        <div className="Disney-container">
            <h1>Disney Plans</h1>
            <div className="plans-grid">
                {plans.map(plan => (
                    <div className="plan-box" key={plan.id || plan.plan}> {/* Ensure key is unique */}
                        <h2>{plan.plan}</h2>
                        <p>Price: {plan.price}</p>
                        <p>Ad-Supported: {plan.adSupported}</p>
                        <p>Video Quality: {plan.videoQuality}</p>
                        <p>Spatial Audio: {plan.spatialAudio}</p>
                        <p>WatchDevices: {plan.watchDevice}</p>
                        <p>supportedDownloadDevices: {plan.supportedDownloadDevices}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Disney;
    