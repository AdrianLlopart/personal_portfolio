import React, { useMemo } from 'react';
import { Box, Heading, Text, Link, Tooltip } from '@primer/react';
import { MarkGithubIcon, MailIcon } from '@primer/octicons-react';
import { Linkedin, YoutubeIcon } from 'lucide-react';
import { bio, work, education } from '../data';
import Timeline from '../components/Timeline';

const Home: React.FC = () => {
  const timelineItems = useMemo(() => {
    const combined = [...work, ...education];
    return combined.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return dateB - dateA;
    });
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      {/* Bio Section */}
      <Box display="flex" flexDirection={['column', 'column', 'row']} alignItems="flex-start">
        <Box flexShrink={0}>
          <Box
            sx={{
              width: 256,
              height: 256,
              borderRadius: '50%',
              overflow: 'hidden'
            }}
          >
            <video
              src="/videos/profile_pic_moving.mp4"
              width="100%"
              height="100%"
              autoPlay
              loop
              muted
              playsInline
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Box mt={3} display="flex" flexDirection="column" alignItems="center">
            <Heading as="h1" sx={{ fontSize: 4, textAlign: 'center' }}>Adrian Llopart</Heading>
            <Box mt={3} display="flex" sx={{ gap: 3 }} alignItems="center" justifyContent="center">
              <Tooltip aria-label="GitHub">
                <Link href="https://github.com/AdrianLlopart" target="_blank" sx={{ color: 'fg.muted', '&:hover': { color: 'accent.fg' } }}>
                  <MarkGithubIcon size={24} />
                </Link>
              </Tooltip>
              <Tooltip aria-label="YouTube">
                <Link href="https://www.youtube.com/@adrianllopart" target="_blank" sx={{ color: 'fg.muted', '&:hover': { color: 'accent.fg' } }}>
                  <YoutubeIcon size={28} />
                </Link>
              </Tooltip>
              <Tooltip aria-label="LinkedIn">
                <Link href="https://www.linkedin.com/in/adrian-llopart" target="_blank" sx={{ color: 'fg.muted', '&:hover': { color: 'accent.fg' } }}>
                  <Linkedin size={24} />
                </Link>
              </Tooltip>
              <Tooltip aria-label="Email">
                <Link href="mailto:adrianllopart@gmail.com" sx={{ color: 'fg.muted', '&:hover': { color: 'accent.fg' } }}>
                  <MailIcon size={24} />
                </Link>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        <Box flexGrow={1}>
          <Box p={3} border="1px solid" borderColor="border.default" borderRadius={2} bg="canvas.subtle">
            <Text as="p" fontSize={2} lineHeight={1.5}>
              {bio}
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Experience & Education Section */}
      <Box>
        <Heading as="h2" sx={{ fontSize: 4, mb: 4, textAlign: 'center' }}>Experience & Education</Heading>
        <Timeline items={timelineItems} />
      </Box>
    </Box>
  );
};

export default Home;
