# Streamlyze 🎬

A comprehensive streaming service analytics platform that helps users compare streaming plans, analyze web content, and perform various text processing operations.

## Features

### 🎯 Core Features
- **Plan Comparison**: Compare Netflix, Prime Video, and Disney+ subscription plans
- **Best Plan Recommendation**: Get personalized recommendations based on price or video quality
- **Web Crawler**: Crawl websites and analyze keyword frequency
- **Text Extractor**: Extract URLs, emails, phone numbers, and dates from text files
- **Page Ranking**: Search and rank pages based on keyword relevance
- **Inverted Indexing**: Advanced search with spell-checking and auto-suggestions

### 🛠 Technical Features
- Modern React.js frontend with responsive design
- RESTful API integration
- File upload and processing capabilities
- Real-time search suggestions
- Pagination for large datasets
- Loading states and error handling

## Tech Stack

- **Frontend**: React.js, React Router
- **Styling**: CSS3 with custom animations
- **HTTP Client**: Axios
- **Backend API**: REST endpoints (running on localhost:8080)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/streamlyze.git
   cd streamlyze
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## API Requirements

The application requires a backend server running on `http://localhost:8080` with the following endpoints:

- `/api/netflix/plans` - Netflix plans data
- `/api/Prime/plans` - Prime Video plans data
- `/api/Disney/plans` - Disney+ plans data
- `/api/best/price` - Best plan by price
- `/api/best/videoquality` - Best plan by video quality
- `/crawl` - Web crawling functionality
- `/api/analyze-file` - Text file analysis
- `/api/page-ranking` - Page ranking algorithm
- `/crawl/inverted-index` - Inverted index search

## Usage

### Plan Comparison
1. Navigate to Netflix, Prime, or Disney+ sections to view available plans
2. Compare features like price, video quality, and device support

### Best Plan Finder
1. Go to "Best Plan" section
2. Choose your priority: Price or Video Quality
3. Get personalized recommendations

### Web Crawler
1. Enter a URL in the Web Crawl section
2. Crawl the website to extract links
3. Search for specific keywords across crawled pages

### Text Extractor
1. Upload a `.txt` file
2. Extract structured data like URLs, emails, phone numbers, and dates

### Page Ranking & Search
1. Enter keywords to search across indexed content
2. Get ranked results based on relevance
3. Use spell-check suggestions for better results

## Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.js       # Navigation component
│   ├── Netflix.js      # Netflix plans display
│   ├── Prime.js        # Prime Video plans display
│   ├── Disney.js       # Disney+ plans display
│   ├── BestPlan.js     # Plan recommendation engine
│   ├── Web.js          # Web crawler interface
│   ├── TextExtract.js  # File analysis tool
│   ├── Page.js         # Page ranking system
│   └── Invert.js       # Inverted index search
├── styles/             # CSS stylesheets
├── App.js              # Main application component
└── index.js            # Application entry point
```

## Features Overview

| Feature | Description | Status |
|---------|-------------|--------|
| Plan Comparison | Compare streaming service plans | ✅ Active |
| Best Plan Finder | AI-powered plan recommendations | ✅ Active |
| Web Crawler | Extract and analyze web content | ✅ Active |
| Text Extractor | Parse structured data from files | ✅ Active |
| Page Ranking | Search and rank content | ✅ Active |
| Inverted Indexing | Advanced search with suggestions | ✅ Active |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React.js community for excellent documentation
- Streaming services for plan data inspiration
- Contributors and testers

---

**Note**: Make sure your backend server is running on port 8080 before using the application features.
