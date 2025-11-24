import React from 'react';
import { Box, Heading, Text, Label, TextInput, Avatar } from '@primer/react';
import { SearchIcon, OrganizationIcon } from '@primer/octicons-react';
import { work, projects, research } from '../data';
import MediaDisplay from '../components/MediaDisplay';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useFilteredData } from '../hooks/useFilteredData';

const Work: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    selectedTag, 
    setSelectedTag, 
    searchQuery, 
    setSearchQuery, 
    allTags, 
    filteredData 
  } = useFilteredData(work);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location, filteredData]);

  return (
    <Box display="flex" flexDirection={['column', 'column', 'row']} sx={{ gap: 4 }}>
      {/* Sidebar Filter */}
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

      {/* Main Content */}
      <Box flexGrow={1}>
        <Box mb={4}>
          <TextInput 
            leadingVisual={SearchIcon} 
            placeholder="Search work experience..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            width="100%"
          />
        </Box>

        <Box display="flex" flexDirection="column" sx={{ gap: 6 }}>
          {filteredData.map((job) => (
            <Box key={job.id} id={job.id} p={4} border="1px solid" borderColor="border.default" borderRadius={2} bg="canvas.default">
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap">
                <Box display="flex" alignItems="center" sx={{ gap: 3 }}>
                  {job.logoUrl ? (
                    <Avatar src={job.logoUrl} size={48} alt={job.company} />
                  ) : (
                    <Box 
                      width="48px" 
                      height="48px" 
                      borderRadius="50%" 
                      bg="canvas.subtle" 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center"
                      border="1px solid"
                      borderColor="border.default"
                    >
                      <OrganizationIcon size={24} />
                    </Box>
                  )}
                  <Box>
                    <Heading as="h2" sx={{ fontSize: 3 }}>{job.company}</Heading>
                    <Text fontWeight="bold" fontSize={2} color="fg.muted">{job.role}</Text>
                  </Box>
                </Box>
                <Text fontSize={1} color="fg.muted" mt={[2, 0]}>{job.startDate} - {job.endDate}</Text>
              </Box>
              
              {job.location && (
                <Box ml={[0, '64px']}>
                   <Text display="block" fontSize={1} color="fg.muted" mb={2}>{job.location}</Text>
                </Box>
              )}

              <Box ml={[0, '64px']}>
                <Text as="p" mt={3} fontSize={2}>
                  {job.longDescription || job.description}
                </Text>

                <MediaDisplay {...job} />

                {job.relatedProjectIds && job.relatedProjectIds.length > 0 && (
                  <Box mt={4} pt={3} borderTop="1px solid" borderColor="border.default">
                    <Heading as="h4" sx={{ fontSize: 1, mb: 2 }}>Related Projects</Heading>
                                        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" sx={{ gap: 3 }}>
                      {job.relatedProjectIds.map(projectId => {
                        const project = projects.find(p => p.id === projectId);
                        if (!project) return null;
                        return (
                          <Box 
                            key={project.id} 
                            p={3} 
                            border="1px solid" 
                            borderColor="border.default" 
                            borderRadius={2} 
                            bg="canvas.subtle"
                            onClick={() => navigate(`/projects#${project.id}`)}
                            sx={{ 
                              cursor: 'pointer', 
                              transition: 'all 0.2s',
                              ':hover': { 
                                borderColor: 'accent.fg',
                                boxShadow: 'shadow.medium'
                              } 
                            }}
                          >
                            <Heading as="h5" sx={{ fontSize: 1 }}>
                              {project.title}
                            </Heading>
                            <Text as="p" fontSize={0} mt={1} color="fg.muted">{project.description}</Text>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                )}

                {job.relatedPaperIds && job.relatedPaperIds.length > 0 && (
                  <Box mt={4} pt={3} borderTop="1px solid" borderColor="border.default">
                    <Heading as="h4" sx={{ fontSize: 1, mb: 2 }}>Related Papers</Heading>
                    <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" sx={{ gap: 3 }}>
                      {job.relatedPaperIds.map(paperId => {
                        const paper = research.find(p => p.id === paperId);
                        if (!paper) return null;
                        return (
                          <Box 
                            key={paper.id} 
                            p={3} 
                            border="1px solid" 
                            borderColor="border.default" 
                            borderRadius={2} 
                            bg="canvas.subtle"
                            onClick={() => navigate(`/research#${paper.id}`)}
                            sx={{ 
                              cursor: 'pointer', 
                              transition: 'all 0.2s',
                              ':hover': { 
                                borderColor: 'accent.fg',
                                boxShadow: 'shadow.medium'
                              } 
                            }}
                          >
                            <Heading as="h5" sx={{ fontSize: 1 }}>
                              {paper.title}
                            </Heading>
                            <Text as="p" fontSize={0} mt={1} color="fg.muted">{paper.description}</Text>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                )}


                <Box mt={3} display="flex" flexWrap="wrap" sx={{ gap: 1 }}>
                  {job.tags.map(tag => (
                    <Label key={tag} variant="secondary">{tag}</Label>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
          {filteredData.length === 0 && (
            <Text color="fg.muted" textAlign="center" mt={4}>No work experience found matching your criteria.</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Work;
