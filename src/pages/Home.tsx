import React, { useMemo } from 'react';
import { Box, Heading, Text, Link, Tooltip } from '@primer/react';
import { MarkGithubIcon, MailIcon } from '@primer/octicons-react';
import { FileIcon, Linkedin, YoutubeIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { bioTitle, bioSubTitle, bioDescription, work, education } from '../data';
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
              src="videos/profile_pic_moving.mp4"
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
              <Tooltip aria-label="CV">
                <Link href="presentations/adrianllopart_CV.pdf" download="adrianllopart_CV.pdf" sx={{ color: 'fg.muted', '&:hover': { color: 'accent.fg' } }}>
                  <FileIcon size={24} />
                </Link>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        <Box flexGrow={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Box width={['100%', '100%', '70%']} mt={6}>
            <Text as="p" fontWeight="bold" textAlign="center" fontSize={3} mb={0}>
              {bioTitle}
            </Text>
            <Text as="p" fontWeight="semibold" textAlign="center" sx={{ fontSize: '19px' }} mt={1}>
              {bioSubTitle}
            </Text>
            <Box fontSize={2} sx={{ lineHeight: 1.5, textAlign: 'justify', '& p': { margin: 0 }, '& strong': { fontWeight: 700 } }}>
              <ReactMarkdown>{bioDescription}</ReactMarkdown>
            </Box>
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
