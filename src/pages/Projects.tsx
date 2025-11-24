import React, { useEffect } from 'react';
import { Box, Heading, Text, Label, TextInput } from '@primer/react';
import { SearchIcon, RepoIcon, BookIcon, VideoIcon } from '@primer/octicons-react';
import { projects } from '../data';
import MediaDisplay from '../components/MediaDisplay';
import { useFilteredData } from '../hooks/useFilteredData';
import { useLocation } from 'react-router-dom';

const Projects: React.FC = () => {
  const location = useLocation();
  const { 
    selectedTag, 
    setSelectedTag, 
    searchQuery, 
    setSearchQuery, 
    allTags, 
    filteredData: filteredProjects 
  } = useFilteredData(projects);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location, filteredProjects]);

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
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            width="100%"
          />
        </Box>

        <Box display="flex" flexDirection="column" sx={{ gap: 3 }}>
          {filteredProjects.map((project) => (
            <Box key={project.id} id={project.id} p={3} border="1px solid" borderColor="border.default" borderRadius={2} bg="canvas.default">
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box display="flex" sx={{ gap: 2 }} alignItems="center">
                   <Text color="fg.muted">
                     {project.pdfUrl ? <BookIcon /> : (project.videoUrls && project.videoUrls.length > 0) ? <VideoIcon /> : <RepoIcon />}
                   </Text>
                   <Heading as="h3" sx={{ fontSize: 2 }}>
                     {project.websiteUrl ? (
                       <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                         {project.title}
                       </a>
                     ) : (
                       project.title
                     )}
                   </Heading>
                </Box>
                <Text fontSize={1} color="fg.muted">{project.date}</Text>
              </Box>
              <Text as="p" mt={2} color="fg.default">
                {project.description}
              </Text>
              
              <MediaDisplay {...project} />

              <Box mt={2} display="flex" sx={{ gap: 1 }}>
                {project.tags.map(tag => (
                  <Label key={tag} variant="secondary">{tag}</Label>
                ))}
              </Box>
            </Box>
          ))}
          {filteredProjects.length === 0 && (
            <Text color="fg.muted" textAlign="center" mt={4}>No projects found matching your criteria.</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Projects;
