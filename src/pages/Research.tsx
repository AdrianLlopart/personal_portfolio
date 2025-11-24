import React, { useEffect } from 'react';
import { Box, Heading, Text, Label, TextInput } from '@primer/react';
import { SearchIcon, BookIcon } from '@primer/octicons-react';
import { research } from '../data';
import MediaDisplay from '../components/MediaDisplay';
import { useFilteredData } from '../hooks/useFilteredData';
import { useLocation } from 'react-router-dom';

const Research: React.FC = () => {
  const location = useLocation();
  const { 
    selectedTag, 
    setSelectedTag, 
    searchQuery, 
    setSearchQuery, 
    allTags, 
    filteredData: filteredResearch 
  } = useFilteredData(research);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location, filteredResearch]);

  return (
    <Box display="flex" flexDirection={['column', 'column', 'row']} sx={{ gap: 4 }}>
      <Box width={['100%', '100%', '250px']} flexShrink={0}>
        <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>Filter by Tag</Heading>
        <Box display="flex" flexWrap="wrap" sx={{ gap: 2 }}>
          <Label 
            variant={selectedTag === null ? 'accent' : 'secondary'}
            sx={{ cursor: 'pointer' }}
            onClick={() => setSelectedTag(null)}
          >
            All
          </Label>
          {allTags.map(tag => (
            <Label 
              key={tag} 
              variant={selectedTag === tag ? 'accent' : 'secondary'}
              sx={{ cursor: 'pointer' }}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag}
            </Label>
          ))}
        </Box>
      </Box>

      <Box flexGrow={1}>
        <Box mb={4}>
          <TextInput 
            leadingVisual={SearchIcon} 
            placeholder="Search research..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            width="100%"
          />
        </Box>

        <Box display="flex" flexDirection="column" sx={{ gap: 3 }}>
          {filteredResearch.map((item) => (
            <Box key={item.id} id={item.id} p={3} border="1px solid" borderColor="border.default" borderRadius={2} bg="canvas.default">
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box display="flex" sx={{ gap: 2 }} alignItems="center">
                   <Text color="fg.muted"><BookIcon /></Text>
                   <Heading as="h3" sx={{ fontSize: 2 }}>
                     {item.websiteUrl ? (
                       <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                         {item.title}
                       </a>
                     ) : (
                       item.title
                     )}
                   </Heading>
                </Box>
                <Text fontSize={1} color="fg.muted">{item.date}</Text>
              </Box>
              
              {item.publication && (
                <Text as="p" fontSize={1} color="fg.muted" fontStyle="italic" mt={1}>
                  {item.publication}
                </Text>
              )}

              <Text as="p" mt={2} color="fg.default">
                {item.description}
              </Text>

              <MediaDisplay {...item} />

              <Box mt={2} display="flex" sx={{ gap: 1 }}>
                {item.tags.map(tag => (
                  <Label key={tag} variant="secondary">{tag}</Label>
                ))}
              </Box>
            </Box>
          ))}
          {filteredResearch.length === 0 && (
            <Text color="fg.muted" textAlign="center" mt={4}>No research found matching your criteria.</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Research;
