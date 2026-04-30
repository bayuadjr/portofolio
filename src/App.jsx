import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Work from './pages/Work';
import WritingPage from './pages/Writing';
import AdventurePage from './pages/Adventure';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/adventure" element={<AdventurePage />} />
          <Route
            path="/contact"
            element={
              <section
                style={{
                  minHeight: '80vh',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Footer />
              </section>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
