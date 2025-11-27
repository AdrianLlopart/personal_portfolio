import { useState, useEffect } from 'react';
import { ThemeProvider, BaseStyles, theme as primerTheme } from '@primer/react';
import deepmerge from 'deepmerge';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Research from './pages/Research';
import Work from './pages/Work';
import Education from './pages/Education';

// Custom theme with forest green accent color
const customTheme = deepmerge(primerTheme, {
  colorSchemes: {
    light: {
      colors: {
        accent: {
          fg: '#228B22',
          emphasis: '#228B22',
          muted: 'rgba(34, 139, 34, 0.4)',
          subtle: 'rgba(34, 139, 34, 0.1)',
        },
      },
    },
    dark: {
      colors: {
        accent: {
          fg: '#2E8B2E',
          emphasis: '#228B22',
          muted: 'rgba(34, 139, 34, 0.4)',
          subtle: 'rgba(34, 139, 34, 0.15)',
        },
      },
    },
  },
});

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
    <ThemeProvider theme={customTheme} colorMode={colorMode} preventSSRMismatch>
      <BaseStyles>
        <Router>
          <Routes>
            <Route path="/" element={<Layout colorMode={colorMode} onToggleTheme={toggleTheme} />}>
              <Route index element={<Home />} />
              <Route path="projects" element={<Projects />} />
              <Route path="research" element={<Research />} />
              <Route path="work" element={<Work />} />
              <Route path="education" element={<Education />} />
            </Route>
          </Routes>
        </Router>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
