import React from 'react';
import { Box, Header, Text, Button } from '@primer/react';
import { SunIcon, MoonIcon } from '@primer/octicons-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

interface LayoutProps {
  colorMode: 'day' | 'night';
  onToggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ colorMode, onToggleTheme }) => {
  const location = useLocation();

  return (
    <Box bg="canvas.default" minHeight="100vh" display="flex" flexDirection="column">
      <Header style={{ height: 64, maxHeight: 64 }}>
        <Header.Item>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img
              src="logos/name_logo_white.png"
              alt="Adrian Llopart"
              height="64px"
              style={{ display: 'block' }}
            />
          </Link>
        </Header.Item>
        <Header.Item full>
          <Box display="flex" sx={{ gap: 3 }} ml={4}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Text fontWeight={location.pathname === '/' ? 'bold' : 'normal'}>Home</Text>
            </Link>
            <Link to="/education" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Text fontWeight={location.pathname === '/education' ? 'bold' : 'normal'}>Education</Text>
            </Link>
            <Link to="/work" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Text fontWeight={location.pathname === '/work' ? 'bold' : 'normal'}>Work</Text>
            </Link>
            <Link to="/research" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Text fontWeight={location.pathname === '/research' ? 'bold' : 'normal'}>Research</Text>
            </Link>
            <Link to="/projects" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Text fontWeight={location.pathname === '/projects' ? 'bold' : 'normal'}>Projects</Text>
            </Link>
          </Box>
        </Header.Item>
        <Header.Item>
          <Button onClick={onToggleTheme} leadingVisual={colorMode === 'day' ? MoonIcon : SunIcon}>
            {colorMode === 'day' ? 'Dark' : 'Light'}
          </Button>
        </Header.Item>
      </Header>

      <Box flexGrow={1} p={4} maxWidth="1012px" mx="auto" width="100%">
        <Outlet />
      </Box>

      <Box p={4} borderTop="1px solid" borderColor="border.default" textAlign="center">
        <Text color="fg.muted" fontSize={1}>
          © {new Date().getFullYear()} Adrian Llopart. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Layout;
