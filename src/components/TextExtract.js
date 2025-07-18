import React, { useState } from 'react';
import '../TextExtract.css';
import axios from "axios";

const TextExtract = () => {
    const [file, setFile] = useState(null);
    const [extractedData, setExtractedData] = useState({ urls: [], emails: [], phone_numbers: [], dates: [] });
    const[loading,setLoading] = useState(false);

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            // Check if the file is a .txt file
            if (uploadedFile.type !== "text/plain") {
                alert("Only .txt files are allowed. Please upload a valid file.");
                e.target.value = null; // Reset the input value
                setFile(null); // Reset the state
                return;
            }
            setFile(uploadedFile);
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            alert("Please upload a file before submitting.");
        } else {
            setLoading(true);  // Show the loader
            document.body.classList.add("page-disabled"); // Disable page interactions
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axios.post("http://localhost:8080/api/analyze-file", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                const data = response.data?.data || { urls: [], emails: [], phone_numbers: [], dates: [] };
                setExtractedData(data); // Update state with extracted data
            } catch (error) {
                console.error("Error during file analysis:", error);
                alert("Failed to analyze the file. Check console for details.");
            }
            finally{
                setLoading(false);  // Hide the loader
                document.body.classList.remove("page-disabled"); // Enable page interactions

            }
        }
    };

    const hasData =
        extractedData.urls.length > 0 ||
        extractedData.emails.length > 0 ||
        extractedData.phone_numbers.length > 0 ||
        extractedData.dates.length > 0;

    return (
        <div className="text-extract-container">
            <h1 className="text-extract-title">Text Extractor</h1>

            <div className="input-container">
                <label className="input-label">File Input</label>
                <div className="custom-file-input">
                    <input
                        type="file"
                        id="file-upload"
                        className="file-input"
                        accept=".txt"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload">
                        {file ? file.name : "Choose File"}
                    </label>
                </div>
                <button className="submit-button" onClick={handleSubmit} disabled={loading}>
                    Submit
                </button>
            </div>

            {/* Render result-container only if there is data */}
            {hasData && (
                <div className="result-container">
                    {extractedData.urls.length > 0 && (
                        <div className="result-section urls">
                            <h3>URLs</h3>
                            <ul>
                                {extractedData.urls.map((url, index) => (
                                    <li key={index}>{url}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {extractedData.emails.length > 0 && (
                        <div className="result-section emails">
                            <h3>Emails</h3>
                            <ul>
                                {extractedData.emails.map((email, index) => (
                                    <li key={index}>{email}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {extractedData.phone_numbers.length > 0 && (
                        <div className="result-section phones">
                            <h3>Phone Numbers</h3>
                            <ul>
                                {extractedData.phone_numbers.map((phone, index) => (
                                    <li key={index}>{phone}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {extractedData.dates.length > 0 && (
                        <div className="result-section dates">
                            <h3>Dates</h3>
                            <ul>
                                {extractedData.dates.map((date, index) => (
                                    <li key={index}>{date}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            {/* Show loader when loading */}
            {loading && <div className="loader"></div>}
        </div>
    );
};

export default TextExtract;
