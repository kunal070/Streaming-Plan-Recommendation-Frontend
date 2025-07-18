# Streamlyze Frontend 🎬

A modern React-based frontend for the Streamlyze streaming service analytics platform. This application provides an intuitive interface for comparing streaming plans, analyzing web content, and performing advanced text processing operations.

> **Note**: This is the frontend repository. The backend API server can be found at: [Streamlyze Backend Repository](https://github.com/your-username/streamlyze-backend)

## 🚀 Features

### 📊 Plan Comparison Interface
- **Multi-Platform Comparison**: Interactive comparison of Netflix, Prime Video, Disney+, Discovery+, Paramount+, and YouTube plans
- **Smart Recommendations**: User-friendly interface for AI-powered plan suggestions based on price or video quality
- **Real-time Data Display**: Live visualization of scraped streaming service data

### 🕷️ Web Crawling Dashboard
- **Crawler Interface**: Simple URL input for web crawling operations
- **Keyword Analysis**: Interactive keyword frequency analysis across crawled pages
- **Results Visualization**: Table-based display of crawling results and statistics

### 🔍 Advanced Search Components
- **Search Interface**: Auto-suggestion enabled search with spell-checking
- **Page Ranking Display**: Ranked search results with relevance scoring
- **Inverted Indexing**: Fast search with detailed position-based results
- **Pagination**: Efficient handling of large result sets

### 🛠️ File Processing UI
- **Drag & Drop Upload**: User-friendly file upload for text analysis
- **Data Extraction Display**: Organized presentation of extracted URLs, emails, phone numbers, and dates
- **Loading States**: Smooth user experience with loading indicators and error handling

## 🏗️ Tech Stack

- **React.js 18** - Modern component-based UI framework
- **React Router** - Client-side routing and navigation
- **Axios** - HTTP client for API communication
- **CSS3** - Custom styling with animations and responsive design
- **JavaScript ES6+** - Modern JavaScript features

## 📦 Installation

### Prerequisites
- Node.js 14+ and npm
- Backend API server running on `http://localhost:8080`

### Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/streamlyze-frontend.git
   cd streamlyze-frontend
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

### Backend Requirement
This frontend requires the Streamlyze backend API to be running on `http://localhost:8080`. 
Please set up the backend server from: [Streamlyze Backend Repository](https://github.com/your-username/streamlyze-backend)

## 🏗️ Project Structure

```
src/
├── components/              # React components
│   ├── Navbar.js           # Navigation component
│   ├── Netflix.js          # Netflix plans display
│   ├── Prime.js            # Prime Video plans display
│   ├── Disney.js           # Disney+ plans display
│   ├── BestPlan.js         # Plan recommendation interface
│   ├── Web.js              # Web crawler interface
│   ├── TextExtract.js      # File analysis interface
│   ├── Page.js             # Page ranking interface
│   ├── Invert.js           # Inverted index search
│   └── Home.js             # Home page component
├── styles/                 # CSS stylesheets
│   ├── App.css             # Main app styles
│   ├── Navbar.css          # Navigation styles
│   ├── Netflix.css         # Netflix component styles
│   ├── BestPlan.css        # Best plan component styles
│   ├── Web.css             # Web crawler styles
│   ├── Page.css            # Page ranking styles
│   ├── Invert.css          # Inverted index styles
│   ├── TextExtract.css     # Text extraction styles
│   └── Loader.css          # Loading animation styles
├── App.js                  # Main application component
├── index.js                # Application entry point
└── index.css               # Global styles
```

## 🎯 Component Overview

### Core Components
| Component | Purpose | API Endpoints Used |
|-----------|---------|-------------------|
| **Netflix** | Display Netflix plans | `/api/netflix/plans` |
| **Prime** | Display Prime Video plans | `/api/Prime/plans` |
| **Disney** | Display Disney+ plans | `/api/Disney/plans` |
| **BestPlan** | Plan recommendations | `/api/best/price`, `/api/best/videoquality` |

### Analysis Components
| Component | Purpose | API Endpoints Used |
|-----------|---------|-------------------|
| **Web** | Web crawling interface | `/crawl`, `/api/netflix/keyword-frequency` |
| **Page** | Page ranking search | `/api/page-ranking`, `/crawl/words` |
| **Invert** | Inverted index search | `/crawl/inverted-index`, `/crawl/spell-checking` |
| **TextExtract** | File analysis | `/api/analyze-file` |

## 🔧 Key Features

### Responsive Design
- Mobile-first approach with responsive breakpoints
- Flexible grid layouts for plan comparisons
- Adaptive navigation for different screen sizes

### User Experience
- Loading states for all API calls
- Error handling with user-friendly messages
- Auto-suggestions for search inputs
- Pagination for large datasets

### Interactive Elements
- Hover effects and smooth animations
- Dynamic button states and selections
- Real-time search suggestions
- File upload with validation

## 🎨 Styling Features

- **Custom CSS Animations**: Smooth loader animations and hover effects
- **Modern Color Schemes**: Streaming service themed colors
- **Typography**: Clean, readable font choices
- **Responsive Tables**: Mobile-friendly data display
- **Interactive Cards**: Hover effects for plan comparisons

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🔗 API Integration

All API calls are configured to connect to `http://localhost:8080`. The frontend handles:
- Plan data fetching and display
- File upload and processing
- Search queries and results
- Web crawling requests
- Error handling and user feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Repositories

- **Backend API**: [Streamlyze Backend](https://github.com/your-username/streamlyze-backend)

---

**Note**: This frontend application requires the Streamlyze backend server to be running on port 8080 for full functionality. Please ensure both servers are running for complete features.
