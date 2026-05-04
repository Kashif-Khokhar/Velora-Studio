import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Templates from './pages/Templates';
import Editor from './pages/Editor';

import About from './pages/About';

import LiveCalendar from './pages/LiveCalendar';
import ScrollToTop from './components/ScrollToTop';

import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="templates" element={<Templates />} />
          <Route path="editor" element={<Editor />} />
          <Route path="calendar" element={<LiveCalendar />} />
          <Route path="livecalendar" element={<Navigate to="/calendar" replace />} />
          <Route path="about" element={<About />} />
          
          <Route path="features" element={<Features />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
          
          <Route path="careers" element={<ComingSoon title="Careers" />} />
          <Route path="blog" element={<ComingSoon title="Velora Blog" />} />
          
          <Route path="privacy" element={<Legal title="Privacy Policy" lastUpdated="May 2026" />} />
          <Route path="terms" element={<Legal title="Terms of Service" lastUpdated="May 2026" />} />
          <Route path="cookies" element={<Legal title="Cookie Policy" lastUpdated="May 2026" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
