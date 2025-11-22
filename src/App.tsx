import { useState, useEffect } from 'react';
import { ThemeProvider, BaseStyles } from '@primer/react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';

function App() {
  const [colorMode, setColorMode] = useState<'day' | 'night'>('day');

  useEffect(() => {
    // Check system preference or local storage
    const savedMode = localStorage.getItem('theme') as 'day' | 'night';
    if (savedMode) {
      setColorMode(savedMode);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setColorMode('night');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = colorMode === 'day' ? 'night' : 'day';
    setColorMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  return (
    <ThemeProvider colorMode={colorMode} preventSSRMismatch>
      <BaseStyles>
        <Router>
          <Routes>
            <Route path="/" element={<Layout colorMode={colorMode} onToggleTheme={toggleTheme} />}>
              <Route index element={<Home />} />
              <Route path="projects" element={<Projects />} />
            </Route>
          </Routes>
        </Router>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
