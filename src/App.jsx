import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import WritingPage from './pages/Writing';
import PostDetail from './pages/PostDetail/PostDetail';
import AdventurePage from './pages/Adventure';
import AdventureDetail from './pages/AdventureDetail/AdventureDetail';
import Footer from './components/Footer/Footer';

// Sanity Studio
import { Studio } from 'sanity';
import config from '../sanity.config';

function Layout() {
  const location = useLocation();
  const isStudio = location.pathname.startsWith('/studio');

  return (
    <>
      {!isStudio && <Navbar />}
      <main key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/writing/:slug" element={<PostDetail />} />
          <Route path="/adventure" element={<AdventurePage />} />
          <Route path="/adventure/:slug" element={<AdventureDetail />} />
          <Route path="/studio/*" element={<Studio config={config} />} />
        </Routes>
      </main>
      {!isStudio && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
