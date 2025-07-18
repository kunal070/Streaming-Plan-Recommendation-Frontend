import React, { useState } from "react";
import axios from "axios";
import "../Web.css";


const WebCrawler = () => {
    const [url, setUrl] = useState("");
    const [crawledLinks, setCrawledLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [keywordCounts, setKeywordCounts] = useState([]);
    const [keywordSubmitted, setKeywordSubmitted] = useState(false);
    const [responseCount, setResponseCount] = useState(0);


    const handleCrawl = async () => {
        if (url.trim() === "") {
            alert("Please enter a URL");
            return;
        }

        setLoading(true);  // Show the loader
        document.body.classList.add("page-disabled"); // Disable page interactions
        try {
            const response = await axios.post(
                "http://localhost:8080/crawl",
                { url },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const links = response.data?.links || [];
            if (links.length === 1) {
                alert("Don't test us :)");
                setCrawledLinks([]);
            } else if (links.length > 1) {
                setCrawledLinks(links);
                setKeywordCounts([]); // Clear previous keyword counts
                setKeywordSubmitted(false); // Reset keyword submission state
            } else {
                setCrawledLinks([]);
                alert("No links were found during crawling.");
            }
        } catch (error) {
            console.error("Error during crawling:", error);
            alert("Failed to crawl the URL. Check console for details.");
        } finally {
            setLoading(false);  // Hide the loader
            document.body.classList.remove("page-disabled"); // Enable page interactions
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async () => {
        if (!inputValue) {
            alert("Please type a keyword before submitting.");
            return;
        }
    
        setLoading(true); // Show the loader
        document.body.classList.add("page-disabled"); // Disable page interactions
        try {
            // First API call using axios
            const response = await axios.get("http://localhost:8080/api/netflix/keyword-frequency", {
                params: { keyword: inputValue },
            });
    
            // Second API call using fetch
            const response1 = await fetch(
                `http://localhost:8080/api/search-frequency?word=${encodeURIComponent(inputValue)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            // Parse response1 as JSON
            const response1Data = await response1.json();
    
            // Extract data from the responses
            const data = response.data?.data || [];
            setKeywordCounts(data); // Set keyword counts
            setResponseCount(response1Data?.count || 0); // Extract and set the count from response1
            setKeywordSubmitted(true);
        } catch (error) {
            console.error("Error during keyword search:", error);
            alert("Failed to search the keyword. Check console for details.");
        } finally {
            setLoading(false); // Hide the loader
            document.body.classList.remove("page-disabled"); // Enable page interactions
        }
    };
    

    return (
        <div className="web-crawler-container">
            <h1 className="title">Web Crawler and Frequency Count</h1>

            {/* URL Input Section */}
            <div className="actio-container">
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="search-input"
                    />
                    <button className="search-button" onClick={handleCrawl} disabled={loading}>
                        <span className="search-icon">🔍</span>
                    </button>
                </div>

                {/* Search Input Section */}
                {crawledLinks.length > 0 && (
                 <div className="middle-container" style={{ display: 'flex', alignItems: 'center' }}>
                 <img src="images/up.png" className="up-logo" alt="Up Logo" style={{ marginRight: '8px' }} />
                 <span style={{marginRight : '16px',fontSize:'20px'}}>{responseCount || 0}</span>
             </div>
                )}

                {crawledLinks.length > 0 && (
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Type keyword here"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <button className="search-button" onClick={handleSubmit}>
                            <span className="search-icon">🔍</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Crawled Links and Keyword Counts Display */}
            {crawledLinks.length > 0 && (
                <div>
                    <h2>{keywordSubmitted ? "Keyword Counts per Crawled Link" : "Crawled Links"}</h2>
                    <table className="keyword-count-table">
                        <thead>
                            <tr>
                                <th>Crawled Link</th>
                                {keywordSubmitted && <th>Keyword Count</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {crawledLinks.map((link, index) => (
                                <tr key={index}>
                                    <td>
                                        <a href={link} target="_blank" rel="noopener noreferrer">
                                            {link}
                                        </a>
                                    </td>
                                    {keywordSubmitted && (
                                        <td>{keywordCounts[index]?.count || 0}</td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Show loader when loading */}
            {loading && <div className="loader"></div>}
        </div>
    );
};

export default WebCrawler;
