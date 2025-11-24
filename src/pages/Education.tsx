import React from 'react';
import { Box, Heading, Text, Label, TextInput, Avatar } from '@primer/react';
import { SearchIcon, MortarBoardIcon } from '@primer/octicons-react';
import { education, projects, research } from '../data';
import MediaDisplay from '../components/MediaDisplay';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useFilteredData } from '../hooks/useFilteredData';

const Education: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    selectedTag, 
    setSelectedTag, 
    searchQuery, 
    setSearchQuery, 
    allTags, 
    filteredData 
  } = useFilteredData(education);

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
            placeholder="Search education..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            width="100%"
          />
        </Box>

        <Box display="flex" flexDirection="column" sx={{ gap: 6 }}>
          {filteredData.map((edu) => (
            <Box key={edu.id} id={edu.id} p={4} border="1px solid" borderColor="border.default" borderRadius={2} bg="canvas.default">
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap">
                <Box display="flex" alignItems="center" sx={{ gap: 3 }}>
                  {edu.logoUrl ? (
                    <Avatar src={edu.logoUrl} size={48} alt={edu.institution} />
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
                      <MortarBoardIcon size={24} />
                    </Box>
                  )}
                  <Box>
                    <Heading as="h2" sx={{ fontSize: 3 }}>{edu.institution}</Heading>
                    <Text fontWeight="bold" fontSize={2} color="fg.muted">{edu.degree}</Text>
                  </Box>
                </Box>
                <Text fontSize={1} color="fg.muted" mt={[2, 0]}>{edu.startDate} - {edu.endDate}</Text>
              </Box>
              
              <Box ml={[0, '64px']}>
                <Text as="p" mt={3} fontSize={2}>
                  {edu.longDescription || edu.description}
                </Text>

                <MediaDisplay {...edu} />

                {edu.relatedProjectIds && edu.relatedProjectIds.length > 0 && (
                  <Box mt={4} pt={3} borderTop="1px solid" borderColor="border.default">
                    <Heading as="h4" sx={{ fontSize: 1, mb: 2 }}>Related Projects</Heading>
                    <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" sx={{ gap: 3 }}>
                      {edu.relatedProjectIds.map(projectId => {
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

                {edu.relatedPaperIds && edu.relatedPaperIds.length > 0 && (
                  <Box mt={4} pt={3} borderTop="1px solid" borderColor="border.default">
                    <Heading as="h4" sx={{ fontSize: 1, mb: 2 }}>Related Papers</Heading>
                    <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" sx={{ gap: 3 }}>
                      {edu.relatedPaperIds.map(paperId => {
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
                  {edu.tags.map(tag => (
                    <Label key={tag} variant="secondary">{tag}</Label>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
          {filteredData.length === 0 && (
            <Text color="fg.muted" textAlign="center" mt={4}>No education found matching your criteria.</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Education;
