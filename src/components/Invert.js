import React, { useState, useEffect } from 'react';
import '../Invert.css';

const Invert = () => {
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [recommendedWords, setRecommendedWords] = useState([]);
    const [invertedIndexData, setInvertedIndexData] = useState([]); // Store inverted index results
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const fetchSpellCheckSuggestions = async () => {
        if (!inputValue) {
            alert("Please type a keyword before submitting.");
            setRecommendedWords([]);
            setInvertedIndexData([]);
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`http://localhost:8080/crawl/spell-checking?word=${encodeURIComponent(inputValue)}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.recommendedWords && data.recommendedWords.length > 0) {
                setRecommendedWords(data.recommendedWords || []); // Update recommendations
                setInvertedIndexData([]); // Clear inverted index data if suggestions are found
            } else {
                // If no spell check suggestions, fetch inverted index data
                const invertedIndexResponse = await fetch(`http://localhost:8080/crawl/inverted-index?keyword=${encodeURIComponent(inputValue)}`);
                const invertedIndexData = await invertedIndexResponse.json();
                setInvertedIndexData(invertedIndexData || []);
                setRecommendedWords([]); // Clear suggestions if inverted index data is shown
            }
        } catch (error) {
            console.error("Error fetching spell-check suggestions:", error);
            setRecommendedWords([]); // Clear recommendations on error
            setInvertedIndexData([]); // Clear inverted index data on error
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        await fetchSpellCheckSuggestions();
    };

    const handleSelectSuggestion = (word) => {
        setInputValue(word); // Update input value with selected suggestion
        setRecommendedWords([]); // Clear suggestions
    };

    // Pagination logic
    const paginateData = () => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return invertedIndexData.slice(indexOfFirstItem, indexOfLastItem);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Generate pagination controls
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(invertedIndexData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="page-container">
            <p className="title_page">Inverted Indexing</p>
            <div className="combined-container" style={{ marginLeft: '320px', marginTop: '50px' }}>
                <div className="search-container">
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
                </div>
            </div>

            {/* Display recommended words if available */}
            {recommendedWords.length > 0 && (
                <div className="horizontal-suggestions">
                    <p className="foysal">What do you mean?</p>
                    {recommendedWords.map((word, index) => (
                        <div
                            key={index}
                            className="s-item"
                            onClick={() => handleSelectSuggestion(word)}
                        >
                            {word}
                        </div>
                    ))}
                </div>
            )}

            {/* Display inverted index results in a table */}
            {invertedIndexData.length > 0 && (
                <div className="table-container">
                    <table className="keyword-count-table">
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>File Index</th>
                                <th>Page Index</th>
                                <th>Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginateData().map((item, index) => (
                                <tr key={index}>
                                    <td>{item.fileName}</td>
                                    <td>{item.fileIndex}</td>
                                    <td>{item.pageIndex}</td>
                                    <td>{item.position}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination controls */}
                    <div className="pagination">
                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                className={`page-button ${number === currentPage ? "active" : ""}`}
                                onClick={() => handlePageChange(number)}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {loading && <div className="loader"></div>}
        </div>
    );
};

export default Invert;
