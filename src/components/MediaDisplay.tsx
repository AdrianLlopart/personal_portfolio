import React, { useState } from 'react';
import { Box, Button, Dialog } from '@primer/react';
import { GlobeIcon, ScreenFullIcon } from '@primer/octicons-react';
import { MediaLinks } from '../data';

const MediaDisplay: React.FC<MediaLinks> = ({ videoUrls, websiteUrl, pdfUrl, slidesUrl }) => {
  const [fullScreenMedia, setFullScreenMedia] = useState<{ type: 'video' | 'pdf' | 'slides', url: string } | null>(null);

  if ((!videoUrls || videoUrls.length === 0) && !websiteUrl && !pdfUrl && !slidesUrl) return null;

  const formatPdfUrl = (url: string) => {
    if (url.startsWith('public/')) {
      return url.replace('public/', '/');
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

  return (
    <Box display="flex" sx={{ gap: 2 }} my={2} flexWrap="wrap">
      {websiteUrl && (
        <Button as="a" href={websiteUrl} target="_blank" size="small" leadingVisual={GlobeIcon}>
          Website
        </Button>
      )}

      {processedPdfUrl && (
        <Box 
          display="flex" 
          alignItems="center" 
          sx={{ 
            gap: 1, 
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
          onClick={() => setFullScreenMedia({ type: 'pdf', url: processedPdfUrl })}
        >
           <Box 
             width="200px" 
             height="280px" 
             bg="canvas.subtle" 
             borderRadius={1} 
             overflow="hidden"
             position="relative"
           >
              {/* PDF Preview using iframe to better control scrollbars */}
              <iframe
                src={`${processedPdfUrl}#page=1&view=Fit&toolbar=0&navpanes=0&scrollbar=0`}
                width="100%"
                height="100%"
                style={{ pointerEvents: 'none', border: 'none', overflow: 'hidden' }}
                scrolling="no"
                title="PDF Preview"
              />
              {/* Overlay to capture click */}
              <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="transparent" />
              
              {/* Fullscreen Icon Overlay */}
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
           </Box>
        </Box>
      )}
      
      {videoUrls && videoUrls.map((url, index) => {
        const embedUrl = getEmbedUrl(url);
        return (
        <Box 
          key={index}
          display="flex" 
          alignItems="center" 
          sx={{ 
            gap: 1, 
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
          onClick={() => setFullScreenMedia({ type: 'video', url: embedUrl })}
        >
           <Box 
             width="300px" 
             height="168px" 
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
             
             {/* Fullscreen Icon Overlay */}
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
           </Box>
        </Box>
      )})}

      {processedSlidesUrl && (
        <Box 
          display="flex" 
          alignItems="center" 
          sx={{ 
            gap: 1, 
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
          onClick={() => setFullScreenMedia({ type: 'slides', url: processedSlidesUrl })}
        >
           <Box 
             width="200px" 
             height="280px" 
             bg="canvas.subtle" 
             borderRadius={1} 
             overflow="hidden"
             position="relative"
           >
              {/* PDF Preview using iframe to better control scrollbars */}
              <iframe
                src={`${processedSlidesUrl}#page=1&view=Fit&toolbar=0&navpanes=0&scrollbar=0`}
                width="100%"
                height="100%"
                style={{ pointerEvents: 'none', border: 'none', overflow: 'hidden' }}
                scrolling="no"
                title="Slides Preview"
              />
              {/* Overlay to capture click */}
              <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="transparent" />
              
              {/* Fullscreen Icon Overlay */}
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
           </Box>
        </Box>
      )}

      {fullScreenMedia && (
        <Dialog 
          isOpen={true} 
          onDismiss={() => setFullScreenMedia(null)} 
          aria-labelledby="media-dialog-header"
          sx={{ width: '90vw', maxWidth: '1200px', height: '90vh', maxHeight: '900px' }}
        >
          <Dialog.Header id="media-dialog-header">
            {fullScreenMedia.type === 'video' ? 'Video' : fullScreenMedia.type === 'slides' ? 'Slides' : 'PDF'}
          </Dialog.Header>
          <Box p={3} height="calc(100% - 60px)">
            <iframe 
              src={fullScreenMedia.url} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              title="Fullscreen media"
            />
          </Box>
        </Dialog>
      )}
    </Box>
  );
};

export default MediaDisplay;
