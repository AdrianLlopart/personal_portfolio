import React, { useRef } from 'react';
import { Box, Text, Heading, Label, Avatar } from '@primer/react';
import { OrganizationIcon, MortarBoardIcon } from '@primer/octicons-react';
import { Experience, Education } from '../data';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface TimelineProps {
  items: (Experience | Education)[];
  type?: 'work' | 'education';
}

const Timeline: React.FC<TimelineProps> = ({ items, type }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const cursorProgress = useMotionValue(0);
  const scaleY = useSpring(cursorProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const { top, height } = containerRef.current.getBoundingClientRect();
      const relativeY = e.clientY - top;
      const progress = Math.max(0, Math.min(1, relativeY / height));
      cursorProgress.set(progress);
    }
  };

  return (
    <Box 
      ref={containerRef} 
      position="relative" 
      width="100%" 
      py={4}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => cursorProgress.set(0)}
    >
      {/* Continuous Vertical Line */}
      <Box 
        position="absolute" 
        left="50%" 
        top={0} 
        bottom={0} 
        width="2px" 
        bg="border.default" 
        sx={{ transform: 'translateX(-50%)' }} 
      />

      {/* Moving Blue Dot Indicator */}
      <motion.div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          backgroundColor: '#0969da', // Primer accent color
          transformOrigin: 'top',
          scaleY,
          translateX: '-50%',
          zIndex: 1
        }}
      />

      {items.map((item, index) => (
        <Box 
          key={index} 
          display="flex" 
          justifyContent="center"
          alignItems="center"
          position="relative"
          mb={6}
          width="100%"
        >
          {/* Left Side (Content or Empty) */}
          <Box flex={1} display="flex" justifyContent="flex-end" pr={4}>
            {index % 2 === 0 && (
              <TimelineItemContent item={item} type={type} navigate={navigate} />
            )}
          </Box>

          {/* Center Dot */}
          <Box 
            position="relative"
            width="16px" 
            height="16px" 
            borderRadius="50%" 
            bg="canvas.default" 
            border="4px solid"
            borderColor="accent.fg"
            zIndex={2}
            flexShrink={0}
          />

          {/* Right Side (Content or Empty) */}
          <Box flex={1} display="flex" justifyContent="flex-start" pl={4}>
            {index % 2 !== 0 && (
              <TimelineItemContent item={item} type={type} navigate={navigate} />
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const TimelineItemContent = ({ item, type, navigate }: { item: Experience | Education, type?: 'work' | 'education', navigate: any }) => {
  const itemType = type || ('company' in item ? 'work' : 'education');
  
  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
    style={{ width: '100%', maxWidth: '500px', cursor: 'pointer' }}
    onClick={() => navigate(`/${itemType}#${item.id}`)}
  >
    <Box 
      p={3} 
      border="1px solid" 
      borderColor="border.default" 
      borderRadius={2} 
      bg="canvas.default"
      boxShadow="shadow.small"
      sx={{
        '&:hover': {
          boxShadow: 'shadow.medium',
          borderColor: 'accent.fg'
        }
      }}
    >
      <Box display="flex" alignItems="flex-start" sx={{ gap: 2 }}>
        {/* Logo Column */}
        <Box flexShrink={0} mt={1}>
          {item.logoUrl ? (
            <Avatar src={item.logoUrl} size={40} alt={'company' in item ? item.company : item.institution} />
          ) : (
            <Box 
              width="40px" 
              height="40px" 
              borderRadius="50%" 
              bg="canvas.subtle" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              border="1px solid"
              borderColor="border.default"
            >
              {itemType === 'work' ? <OrganizationIcon size={16} /> : <MortarBoardIcon size={16} />}
            </Box>
          )}
        </Box>

        {/* Content Column */}
        <Box flexGrow={1} minWidth={0}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
            <Heading as="h4" sx={{ fontSize: 2, mr: 2 }}>
              {'company' in item ? item.company : item.institution}
            </Heading>
            <Text fontSize={1} color="fg.muted" sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
              {item.startDate} - {item.endDate || 'Present'}
            </Text>
          </Box>
          
          <Text display="block" fontWeight="bold" fontSize={1} color="fg.muted">
            {'role' in item ? item.role : item.degree}
          </Text>
          <Text display="block"  fontSize={1}>
            {item.description}
          </Text>

          {item.longDescription && (
            <Box mt={2}>
              <Text as="div" fontSize={1} color="fg.muted" sx={{ whiteSpace: 'pre-wrap' }}>
                {item.longDescription}
              </Text>
            </Box>
          )}

          <Box mt={2} display="flex" flexWrap="wrap" sx={{ gap: 1 }}>
            {item.tags.map(tag => (
              <Label key={tag} variant="secondary">{tag}</Label>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  </motion.div>
);
};

export default Timeline;
