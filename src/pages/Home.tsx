import React from 'react';
import { Box, Heading, Text, Avatar, Link } from '@primer/react';
import { bio } from '../data';

const Home: React.FC = () => {
  return (
    <Box display="flex" flexDirection={['column', 'column', 'row']} sx={{ gap: 4 }} alignItems="flex-start">
      <Box flexShrink={0}>
        <Avatar src="https://github.com/AdrianLlopart.png" size={260} alt="@AdrianLlopart" />
        <Box mt={3}>
          <Heading as="h1" sx={{ fontSize: 4 }}>Adrian Llopart</Heading>
          <Text color="fg.muted" fontSize={2}>@AdrianLlopart</Text>
        </Box>
        <Box mt={3}>
          <Link href="https://github.com/AdrianLlopart" target="_blank" sx={{ display: 'block', mb: 1 }}>GitHub</Link>
          <Link href="mailto:your.email@example.com" sx={{ display: 'block' }}>Contact</Link>
        </Box>
      </Box>

      <Box flexGrow={1}>
        <Box p={3} border="1px solid" borderColor="border.default" borderRadius={2} bg="canvas.subtle">
          <Text as="p" fontSize={2} lineHeight={1.5}>
            {bio}
          </Text>
        </Box>
        
        <Box mt={4}>
          <Heading as="h2" sx={{ fontSize: 3, mb: 2 }}>Pinned</Heading>
          <Box display="grid" gridTemplateColumns={['1fr', '1fr 1fr']} sx={{ gap: 3 }}>
             {/* We could pin some projects here later */}
             <Box p={3} border="1px solid" borderColor="border.default" borderRadius={2}>
                <Text fontWeight="bold">Deep Researcher Agent</Text>
                <Text as="p" fontSize={1} color="fg.muted" mt={1}>
                  An autonomous agent capable of conducting deep research...
                </Text>
             </Box>
             <Box p={3} border="1px solid" borderColor="border.default" borderRadius={2}>
                <Text fontWeight="bold">Voice to Text Pipeline</Text>
                <Text as="p" fontSize={1} color="fg.muted" mt={1}>
                  Robust pipeline for converting voice to text...
                </Text>
             </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
