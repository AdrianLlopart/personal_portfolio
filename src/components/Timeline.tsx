import React, { useRef, useCallback } from 'react';
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
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isHoveringItem = useRef(false);
  const navigate = useNavigate();
  
  const cursorProgress = useMotionValue(0);
  const scaleY = useSpring(cursorProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Only follow cursor if not hovering over an item
    if (containerRef.current && !isHoveringItem.current) {
      const { top, height } = containerRef.current.getBoundingClientRect();
      const relativeY = e.clientY - top;
      const progress = Math.max(0, Math.min(1, relativeY / height));
      cursorProgress.set(progress);
    }
  };

  const handleItemHover = useCallback((index: number) => {
    isHoveringItem.current = true;
    if (containerRef.current && dotRefs.current[index]) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const dotRect = dotRefs.current[index]!.getBoundingClientRect();
      // Calculate position to the center of the dot
      const dotCenterY = dotRect.top + dotRect.height / 2 - containerRect.top;
      const progress = Math.max(0, Math.min(1, dotCenterY / containerRect.height));
      cursorProgress.set(progress);
    }
  }, [cursorProgress]);

  const handleItemLeave = useCallback(() => {
    isHoveringItem.current = false;
  }, []);

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

      {/* Moving Accent Line Indicator */}
      <motion.div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          transformOrigin: 'top',
          scaleY,
          translateX: '-50%',
          zIndex: 1
        }}
      >
        <Box width="100%" height="100%" bg="accent.fg" />
      </motion.div>

      {items.map((item, index) => {
        const isLeft = index % 2 === 0;
        return (
        <Box 
          key={index}
          display="flex" 
          justifyContent="center"
          alignItems="center"
          position="relative"
          mb={6}
          width="100%"
          sx={{
            [`&:has(.timeline-content-${index}:hover) .timeline-dot`]: {
              borderColor: 'accent.fg'
            },
            [`&:has(.timeline-content-${index}:hover) .timeline-connector`]: {
              bg: 'accent.fg',
              width: '18px'
            }
          }}
        >
          {/* Left Side (Content or Empty) */}
          <Box flex={1} display="flex" justifyContent="flex-end" pr={4}>
            {isLeft && (
              <Box
                className={`timeline-content-${index}`}
                onMouseEnter={() => handleItemHover(index)}
                onMouseLeave={handleItemLeave}
              >
                <TimelineItemContent item={item} type={type} navigate={navigate} />
              </Box>
            )}
          </Box>

          {/* Connector Line - Left side (when content is on left) */}
          {isLeft && (
            <Box
              className="timeline-connector"
              position="absolute"
              right="calc(50% + 10px)"
              width="24px"
              height="2px"
              bg="border.default"
              sx={{ 
                transition: 'background-color 0.2s ease, transform 0.2s ease, width 0.2s ease',
                transformOrigin: 'right center'
              }}
            />
          )}

          {/* Center Dot */}
          <Box 
            ref={(el: HTMLDivElement | null) => { dotRefs.current[index] = el; }}
            className="timeline-dot"
            position="relative"
            width="16px" 
            height="16px" 
            borderRadius="50%" 
            bg="canvas.default" 
            border="4px solid"
            borderColor="border.default"
            zIndex={2}
            flexShrink={0}
            sx={{
              transition: 'border-color 0.2s ease'
            }}
          />

          {/* Connector Line - Right side (when content is on right) */}
          {!isLeft && (
            <Box
              className="timeline-connector"
              position="absolute"
              left="calc(50% + 8px)"
              width="24px"
              height="2px"
              bg="border.default"
              sx={{ 
                transition: 'background-color 0.2s ease, width 0.2s ease',
                transformOrigin: 'left center'
              }}
            />
          )}

          {/* Right Side (Content or Empty) */}
          <Box flex={1} display="flex" justifyContent="flex-start" pl={4}>
            {!isLeft && (
              <Box
                className={`timeline-content-${index}`}
                onMouseEnter={() => handleItemHover(index)}
                onMouseLeave={handleItemLeave}
              >
                <TimelineItemContent item={item} type={type} navigate={navigate} />
              </Box>
            )}
          </Box>
        </Box>
        );
      })}
    </Box>
  );
};

const TimelineItemContent = ({ item, type, navigate }: { item: Experience | Education, type?: 'work' | 'education', navigate: any }) => {
  const itemType = type || ('company' in item ? 'work' : 'education');
  
  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
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
          <Text display="block" mt={2} fontSize={1} sx={{ textAlign: 'justify' }}>
            {item.description}
          </Text>

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
