import React from 'react';
import { Box, Header, Text, Button } from '@primer/react';
import { MarkGithubIcon, SunIcon, MoonIcon } from '@primer/octicons-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

interface LayoutProps {
  colorMode: 'day' | 'night';
  onToggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ colorMode, onToggleTheme }) => {
  const location = useLocation();

  return (
    <Box bg="canvas.default" minHeight="100vh" display="flex" flexDirection="column">
      <Header>
        <Header.Item>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MarkGithubIcon size={32} />
            <Text fontWeight="bold" fontSize={2}>Adrian Llopart</Text>
          </Link>
        </Header.Item>
        <Header.Item full>
          <Box display="flex" sx={{ gap: 3 }} ml={4}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Text fontWeight={location.pathname === '/' ? 'bold' : 'normal'}>About</Text>
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
          © {new Date().getFullYear()} Adrian Llopart. Built with React & Primer CSS.
        </Text>
      </Box>
    </Box>
  );
};

export default Layout;
