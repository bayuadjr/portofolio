import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import WritingPage from './pages/Writing';
import PostDetail from './pages/PostDetail/PostDetail';
import AdventurePage from './pages/Adventure';
import AdventureDetail from './pages/AdventureDetail/AdventureDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';

const StudioPage = lazy(() => import('./pages/StudioPage'));

function Layout() {
  const location = useLocation();
  const isStudio = location.pathname.startsWith('/studio');

  return (
    <div className={!isStudio ? 'wrap' : ''}>
      {!isStudio && (
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
      )}
      {!isStudio && <Navbar />}
      <main id="main-content" tabIndex={-1} key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/writing/:slug" element={<PostDetail />} />
          <Route path="/adventure" element={<AdventurePage />} />
          <Route path="/adventure/:slug" element={<AdventureDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/studio/*"
            element={
              <Suspense fallback={<div style={{ padding: '40px' }}>Loading Studio...</div>}>
                <StudioPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isStudio && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  );
}
