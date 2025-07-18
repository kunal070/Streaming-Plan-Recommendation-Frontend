import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Loader.css'

import Netflix from './components/Netflix';
import Prime from './components/Prime';
import Disney from './components/Disney';
import BestPlan from './components/BestPlan';
import Web from './components/Web';
import TextExtract from './components/TextExtract';
import Home from './components/Home';
import Page from './components/Page';
import Invert from './components/Invert';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        {/* Define Routes for different pages */}
        <Routes>
          <Route path="/home" element={Home} />
          <Route path="/netflix" element={<Netflix />} /> {/* Netflix plans page */}
          <Route path="/prime" element={<Prime />} /> {/* Netflix plans page */}
          <Route path="/disney" element={<Disney />} /> {/* Netflix plans page */}
          <Route path="/bestplan" element={<BestPlan/>} />
          <Route path="/web" element={<Web/>} />
          <Route path="/text-extractor" element={<TextExtract/>} />
          <Route path="/page" element={<Page/>}/>
          <Route path="/invert" element={<Invert/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
