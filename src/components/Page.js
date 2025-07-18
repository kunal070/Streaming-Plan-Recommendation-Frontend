import React, { useState } from 'react';
import '../Page.css';

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [recommendedWord, setRecommendedWord] = useState(""); // State for recommended word
    const [keywordCounts, setKeywordCounts] = useState([]);
    const [responseCount, setResponseCount] = useState(0);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        fetchSuggestedWords(e.target.value); // Fetch suggestions as user types
    };

    const fetchSuggestedWords = async (query) => {
        if (!query) {
            setRecommendedWord("");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/crawl/words?word=${encodeURIComponent(query)}`, {
                method: 'GET',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Assume API returns { recommendedWord: "someWord" }
            setRecommendedWord(data.recommendedWord || ""); // Set recommended word
        } catch (error) {
            console.error('Error fetching suggested words:', error);
        }
    };

    const handleSelectSuggestion = () => {
        setInputValue(recommendedWord); // Set the input value to the recommended word
        setRecommendedWord(""); // Clear suggestions
    };

    const handleSubmit = async () => {
        if (!inputValue) {
            alert("Please type a keyword before submitting.");
            return;
        }
    
        try {
            setLoading(true);
            setRecommendedWord(""); // Clear the recommended word when the search button is clicked
    
            const response = await fetch(`http://localhost:8080/api/page-ranking?word=${encodeURIComponent(inputValue)}`, {
                method: "POST",
            });
    
            const response1 = await fetch(
                `http://localhost:8080/api/search-frequency?word=${encodeURIComponent(inputValue)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            const response1Data = await response1.json();
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Response Data:", data);
    
            const transformedData = Object.entries(data).map(([url, count]) => ({ url, count }));
            setResponseCount(response1Data?.count || 0);
            setKeywordCounts(transformedData);
    
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to fetch data from the server.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className='page-container'>
            <p className='title_page'>Page Ranking</p>
            <div className="action-container">
                <div className="middle-container" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="images/up.png" className="up-logo" alt="Up Logo" style={{ marginRight: '8px' }} />
                    <span style={{ marginRight: '13px' }}>{responseCount || 0}</span>
                </div>
                <div className="search-container" style={{ position: 'relative' }}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Type keyword here"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button className="search-button" onClick={handleSubmit} disabled={loading}>
                        <span className="search-icon">🔍</span>
                    </button>
                    
                    {/* Display recommended word below the input */}
                    {recommendedWord && (
                        <div className="suggestions-container">
                            <ul className="suggestions-list">
                                <li
                                    className="suggestion-item"
                                    onClick={handleSelectSuggestion} // Set input value on click
                                >
                                    {recommendedWord}
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {keywordCounts.length > 0 && (
                <div>
                    <h2>Keyword Counts per Crawled Link</h2>
                    <table className="keyword-count-table">
                        <thead>
                            <tr>
                                <th>URL</th>
                                <th>Keyword Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {keywordCounts.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <a href={`http://${item.url}`} target="_blank" rel="noopener noreferrer">
                                            {item.url}
                                        </a>
                                    </td>
                                    <td>{item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {loading && <div className="loader"></div>}
        </div>
    );
};

export default Page;
