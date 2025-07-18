import React, { useState } from 'react';
import '../Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    const [activeLink, setActiveLink] = useState('Home');

    const handleSetActiveLink = (link) => {
        setActiveLink(link);
    };

    return (
        <nav className="navbar">
            <span className="navbar-logo">Streamlyze</span>
            <ul className="nav">
                <li className="nav-item">
                    <Link
                        to="/home" // Use `Link` for navigation
                        className={`nav-link ${activeLink === 'Home' ? 'active' : ''}`}
                        onClick={() => handleSetActiveLink('Home')}
                    >
                        <img src="images/home.png" alt="Home Icon" className="icon-logo" />
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/netflix" // Use `Link` for navigation
                        className={`nav-link ${activeLink === 'Netflix' ? 'active' : ''}`}
                        onClick={() => handleSetActiveLink('Netflix')}
                    >
                        <img src="images/netflix.png" alt="Netflix Icon" className="icon-logo" />
                        Netflix
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/prime" // Use `Link` for navigation
                        className={`nav-link ${activeLink === 'PrimeVideos' ? 'active' : ''}`}
                        onClick={() => handleSetActiveLink('PrimeVideos')}
                    >
                        <img src="images/prime.png" alt="Prime Videos Icon" className="icon-logo" />
                        Prime Videos
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/disney" // Use `Link` for navigation
                        className={`nav-link ${activeLink === 'DisneyPlus' ? 'active' : ''}`}
                        onClick={() => handleSetActiveLink('DisneyPlus')}
                    >
                        <img src="images/disney.png" alt="Disney Icon" className="icon-logo" />
                        Disney+
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/bestplan" // Use `Link` for navigation
                        className={`nav-link ${activeLink === 'BestPlan' ? 'active' : ''}`}
                        onClick={() => handleSetActiveLink('BestPlan')}
                    >
                        <img src="images/best.png" alt="Best Plan Icon" className="icon-logo" />
                        Best Plan
                    </Link>
                </li>
                <li className="nav-item dropdown">
                    <button className="dropdown-btn">Explore</button>
                    <div className="dropdown-content">
                        <a href="/web">Web Crawl</a>
                        <a href="/text-extractor">Text Extractor</a>
                        <a href="/page">Page Ranking</a>
                        <a href="/invert">Inverted indexing</a>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
