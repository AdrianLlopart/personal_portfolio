import React, { useState } from 'react';
import { Box, Dialog } from '@primer/react';
import { GlobeIcon, ScreenFullIcon, BookIcon, ImageIcon, VideoIcon } from '@primer/octicons-react';
import { MediaLinks } from '../data';
import { GithubIcon } from 'lucide-react';

// Reusable media card component for consistent styling
const MediaCard: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => (
  <Box 
    display="flex" 
    alignItems="center"
    justifyContent="center"
    sx={{ 
      position: 'relative', 
      cursor: 'pointer',
      '&:hover .fullscreen-icon': {
        opacity: 1
      }
    }} 
    p={1} 
    border="1px solid" 
    borderColor="border.default" 
    borderRadius={2}
    onClick={onClick}
  >
    {children}
  </Box>
);

// Fullscreen icon overlay component
const FullscreenOverlay: React.FC = () => (
  <Box
    className="fullscreen-icon"
    position="absolute"
    top="50%"
    left="50%"
    display="flex"
    alignItems="center"
    justifyContent="center"
    sx={{
      transform: 'translate(-50%, -50%)',
      opacity: 0,
      transition: 'opacity 0.2s',
      bg: 'white',
      borderRadius: '50%',
      width: '48px',
      height: '48px',
      color: 'black',
      boxShadow: 'shadow.large'
    }}
  >
    <ScreenFullIcon size={24} />
  </Box>
);

// Consistent media dimensions
const MEDIA_WIDTH = 280;
const MEDIA_HEIGHT = 180;

const MediaDisplay: React.FC<MediaLinks> = ({ videoUrls, imageUrls, websiteUrl, pdfUrl, slidesUrl, codeUrl }) => {
  const [fullScreenMedia, setFullScreenMedia] = useState<{ type: 'video' | 'pdf' | 'slides' | 'image', url: string } | null>(null);

  if ((!videoUrls || videoUrls.length === 0) && (!imageUrls || imageUrls.length === 0) && !websiteUrl && !pdfUrl && !slidesUrl && !codeUrl) return null;

  const formatPdfUrl = (url: string) => {
    if (url.startsWith('public/')) {
      return url.replace('public/', '');
    }
    return url;
  };

  const getEmbedUrl = (url: string) => {
    // Handle YouTube URLs
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  const processedPdfUrl = pdfUrl ? formatPdfUrl(pdfUrl) : undefined;
  const processedSlidesUrl = slidesUrl ? formatPdfUrl(slidesUrl) : undefined;

  const isHttp = (url: string) => url.startsWith('http://') || url.startsWith('https://');

  // Build ordered media items for the grid
  // Row 1: websiteUrl, codeUrl
  // Row 2: slidesUrl, pdfUrl
  // Row 3+: videoUrls
  const mediaItems: React.ReactNode[] = [];

  // Row 1: Website and Code buttons (with link previews)
  if (websiteUrl && isHttp(websiteUrl)) {
    mediaItems.push(
      <MediaCard key="website" onClick={() => window.open(websiteUrl, '_blank')}>
        <Box 
          width={MEDIA_WIDTH}
          height={MEDIA_HEIGHT}
          bg="canvas.subtle" 
          borderRadius={1} 
          overflow="hidden"
          position="relative"
        >
          <Box 
            as="iframe" 
            src={websiteUrl} 
            width="100%" 
            height="100%" 
            sx={{ 
              border: 0, 
              pointerEvents: 'none',
              transform: 'scale(0.5)',
              transformOrigin: 'top left',
              width: '200%',
              height: '200%'
            }} 
            title="Website preview"
          />
          {/* Overlay to capture click */}
          <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="transparent" />
          {/* Label */}
          <Box
            position="absolute"
            bottom={2}
            left={2}
            px={2}
            py={1}
            bg="canvas.default"
            borderRadius={1}
            display="flex"
            alignItems="center"
            sx={{ gap: 1, opacity: 0.9 }}
          >
            <GlobeIcon size={16} />
            <Box as="span" fontSize={1}>Website</Box>
          </Box>
          <FullscreenOverlay />
        </Box>
      </MediaCard>
    );
  }

  if (codeUrl && isHttp(codeUrl)) {
    // Check if it's a GitHub URL (which blocks iframe embedding)
    const isGitHub = codeUrl.includes('github.com');
    
    // Extract repo info from GitHub URL
    const getGitHubInfo = (url: string) => {
      const match = url.match(/github\.com\/([^\/]+)(?:\/([^\/]+))?/);
      if (match) {
        return { owner: match[1], repo: match[2] || '' };
      }
      return null;
    };
    
    const ghInfo = isGitHub ? getGitHubInfo(codeUrl) : null;
    
    mediaItems.push(
      <MediaCard key="code" onClick={() => window.open(codeUrl, '_blank')}>
        <Box 
          width={MEDIA_WIDTH}
          height={MEDIA_HEIGHT}
          bg="canvas.subtle" 
          borderRadius={1} 
          overflow="hidden"
          position="relative"
        >
          {isGitHub ? (
            // GitHub-styled placeholder since GitHub blocks iframes
            <Box
              width="100%"
              height="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              bg="canvas.inset"
              sx={{ gap: 2 }}
            >
              <GithubIcon size={48} />
              {ghInfo && (
                <Box textAlign="center" px={2}>
                  <Box as="span" fontSize={1} fontWeight="bold" display="block">
                    {ghInfo.owner}
                  </Box>
                  {ghInfo.repo && (
                    <Box as="span" fontSize={0} color="fg.muted" display="block">
                      {ghInfo.repo}
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          ) : (
            // For non-GitHub URLs, try iframe preview
            <Box 
              as="iframe" 
              src={codeUrl} 
              width="100%" 
              height="100%" 
              sx={{ 
                border: 0, 
                pointerEvents: 'none',
                transform: 'scale(0.5)',
                transformOrigin: 'top left',
                width: '200%',
                height: '200%'
              }} 
              title="Code repository preview"
            />
          )}
          {/* Overlay to capture click */}
          <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="transparent" />
          {/* Label */}
          <Box
            position="absolute"
            bottom={2}
            left={2}
            px={2}
            py={1}
            bg="canvas.default"
            borderRadius={1}
            display="flex"
            alignItems="center"
            sx={{ gap: 1, opacity: 0.9 }}
          >
            <GithubIcon size={16} />
            <Box as="span" fontSize={1}>Code</Box>
          </Box>
          <FullscreenOverlay />
        </Box>
      </MediaCard>
    );
  }

  // Row 2: Images
  if (imageUrls) {
    imageUrls.forEach((url, index) => {
      const processedUrl = url.startsWith('public/') ? url.replace('public/', '') : url;
      mediaItems.push(
        <MediaCard key={`image-${index}`} onClick={() => setFullScreenMedia({ type: 'image', url: processedUrl })}>
          <Box 
            width={MEDIA_WIDTH}
            height={MEDIA_HEIGHT}
            bg="canvas.subtle" 
            borderRadius={1} 
            overflow="hidden"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              as="img"
              src={processedUrl}
              alt={`Image ${index + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
            {/* Overlay to capture click */}
            <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="transparent" />
            {/* Label */}
            <Box
              position="absolute"
              bottom={2}
              left={2}
              px={2}
              py={1}
              bg="canvas.default"
              borderRadius={1}
              display="flex"
              alignItems="center"
              sx={{ gap: 1, opacity: 0.9 }}
            >
              <ImageIcon size={16} />
              <Box as="span" fontSize={1}>Image</Box>
            </Box>
            <FullscreenOverlay />
          </Box>
        </MediaCard>
      );
    });
  }

  // Row 3: Slides and PDF
  if (processedSlidesUrl) {
    mediaItems.push(
      <MediaCard key="slides" onClick={() => setFullScreenMedia({ type: 'slides', url: processedSlidesUrl })}>
        <Box 
          width={MEDIA_WIDTH}
          height={MEDIA_HEIGHT}
          bg="canvas.subtle" 
          borderRadius={1} 
          overflow="hidden"
          position="relative"
        >
          {/* Slides preview using iframe with scaled view */}
          <Box
            as="iframe"
            src={`${processedSlidesUrl}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
            width="100%"
            height="100%"
            sx={{
              border: 0,
              pointerEvents: 'none',
              overflow: 'hidden',
            }}
            title="Slides Preview"
          />
          {/* Overlay to capture click */}
          <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="transparent" />
          {/* Label */}
          <Box
            position="absolute"
            bottom={2}
            left={2}
            px={2}
            py={1}
            bg="canvas.default"
            borderRadius={1}
            display="flex"
            alignItems="center"
            sx={{ gap: 1, opacity: 0.9 }}
          >
            <ScreenFullIcon size={16} />
            <Box as="span" fontSize={1}>Slides</Box>
          </Box>
          <FullscreenOverlay />
        </Box>
      </MediaCard>
    );
  }

  if (processedPdfUrl) {
    mediaItems.push(
      <MediaCard key="pdf" onClick={() => setFullScreenMedia({ type: 'pdf', url: processedPdfUrl })}>
        <Box 
          width={MEDIA_WIDTH}
          height={MEDIA_HEIGHT}
          bg="canvas.subtle" 
          borderRadius={1} 
          overflow="hidden"
          position="relative"
        >
          {/* PDF preview using iframe with scaled view */}
          <Box
            as="iframe"
            src={`${processedPdfUrl}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
            width="100%"
            height="100%"
            sx={{
              border: 0,
              pointerEvents: 'none',
              overflow: 'hidden',
            }}
            title="PDF Preview"
          />
          {/* Overlay to capture click */}
          <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="transparent" />
          {/* Label */}
          <Box
            position="absolute"
            bottom={2}
            left={2}
            px={2}
            py={1}
            bg="canvas.default"
            borderRadius={1}
            display="flex"
            alignItems="center"
            sx={{ gap: 1, opacity: 0.9 }}
          >
            <BookIcon size={16} />
            <Box as="span" fontSize={1}>PDF</Box>
          </Box>
          <FullscreenOverlay />
        </Box>
      </MediaCard>
    );
  }

  // Row 3+: Videos
  if (videoUrls) {
    videoUrls.forEach((url, index) => {
      const embedUrl = getEmbedUrl(url);
      mediaItems.push(
        <MediaCard key={`video-${index}`} onClick={() => setFullScreenMedia({ type: 'video', url: embedUrl })}>
          <Box 
            width={MEDIA_WIDTH}
            height={MEDIA_HEIGHT}
            bg="canvas.subtle" 
            borderRadius={1} 
            overflow="hidden"
            position="relative"
          >
            <Box 
              as="iframe" 
              src={embedUrl} 
              width="100%" 
              height="100%" 
              sx={{ border: 0, pointerEvents: 'none' }} 
              title={`Video preview ${index + 1}`}
            />
            {/* Overlay to capture click */}
            <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="transparent" />
            {/* Label */}
            <Box
              position="absolute"
              bottom={2}
              left={2}
              px={2}
              py={1}
              bg="canvas.default"
              borderRadius={1}
              display="flex"
              alignItems="center"
              sx={{ gap: 1, opacity: 0.9 }}
            >
              <VideoIcon size={16} />
              <Box as="span" fontSize={1}>Video</Box>
            </Box>
            <FullscreenOverlay />
          </Box>
        </MediaCard>
      );
    });
  }

  if (mediaItems.length === 0) return null;

  return (
    <Box display="flex" flexDirection="column" sx={{ gap: 2 }} my={2}>
      {/* 2-column centered grid */}
      <Box 
        display="grid" 
        sx={{ 
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 3,
          justifyItems: 'center',
          maxWidth: `${MEDIA_WIDTH * 2 + 48}px`,
          margin: '0 auto'
        }}
      >
        {mediaItems}
      </Box>

      {/* Fullscreen Dialog */}
      {fullScreenMedia && (
        <Dialog 
          isOpen={true} 
          onDismiss={() => setFullScreenMedia(null)} 
          aria-labelledby="media-dialog-header"
          sx={{ width: '90vw', maxWidth: '1200px', height: '90vh', maxHeight: '900px' }}
        >
          <Dialog.Header id="media-dialog-header">
            {fullScreenMedia.type === 'video' ? 'Video' : fullScreenMedia.type === 'slides' ? 'Slides' : fullScreenMedia.type === 'image' ? 'Image' : 'PDF'}
          </Dialog.Header>
          <Box p={3} height="calc(100% - 60px)" display="flex" alignItems="center" justifyContent="center">
            {fullScreenMedia.type === 'image' ? (
              <img 
                src={fullScreenMedia.url} 
                alt="Fullscreen image"
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
              />
            ) : (
              <iframe 
                src={fullScreenMedia.url} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                title="Fullscreen media"
              />
            )}
          </Box>
        </Dialog>
      )}
    </Box>
  );
};

export default MediaDisplay;
