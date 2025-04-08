import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Switch, FormControl, FormLabel, HStack, useColorModeValue } from '@chakra-ui/react';

interface GazeTrackerProps {
  enabled?: boolean;
  showTooltips?: boolean;
}

/**
 * A component that simulates eye-gaze tracking with a visual cursor
 * This is a demo component that doesn't actually track eye gaze but simulates it
 * for UI demonstration purposes without requiring camera access
 */
const GazeTracker: React.FC<GazeTrackerProps> = ({ 
  enabled = true,
  showTooltips = true 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(enabled);
  const [isVisible, setIsVisible] = useState(true);
  const [focusPoint, setFocusPoint] = useState({ x: 0, y: 0 });
  const [showFocusData, setShowFocusData] = useState(false);
  
  const gazeRef = useRef<HTMLDivElement>(null);
  const lastMoveTime = useRef<number>(Date.now());
  const focusTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const gazeCursorColor = useColorModeValue('rgba(74, 111, 255, 0.7)', 'rgba(74, 111, 255, 0.8)');
  const gazeCursorBlurColor = useColorModeValue('rgba(74, 111, 255, 0.2)', 'rgba(74, 111, 255, 0.3)');
  const focusPointColor = useColorModeValue('rgba(52, 199, 89, 0.4)', 'rgba(52, 199, 89, 0.5)');
  
  // Effect for tracking mouse position (simulating eye gaze)
  useEffect(() => {
    if (!isActive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Add subtle delay and smoothing for more natural movement
      const now = Date.now();
      const timeDiff = now - lastMoveTime.current;
      
      if (timeDiff > 10) {  // Limit update rate for smoother movement
        // Calculate cursor position with a bit of lag/smoothing
        const newX = e.clientX;
        const newY = e.clientY;
        
        setPosition(prev => ({
          x: prev.x + (newX - prev.x) * 0.3, 
          y: prev.y + (newY - prev.y) * 0.3
        }));
        
        lastMoveTime.current = now;
        setIsVisible(true);
        
        // Reset focus timeout
        if (focusTimeout.current) {
          clearTimeout(focusTimeout.current);
        }
        
        // Set a timeout to determine if user is focusing on a point
        focusTimeout.current = setTimeout(() => {
          setFocusPoint({ x: newX, y: newY });
          setShowFocusData(true);
          
          // Hide focus data after 3 seconds
          setTimeout(() => {
            setShowFocusData(false);
          }, 3000);
        }, 800); // Consider "focused" if gaze stays in an area for 800ms
      }
    };
    
    // Handle cursor leaving the window
    const handleMouseLeave = () => {
      setIsVisible(false);
      if (focusTimeout.current) {
        clearTimeout(focusTimeout.current);
      }
    };
    
    // Handle cursor entering the window
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      
      if (focusTimeout.current) {
        clearTimeout(focusTimeout.current);
      }
    };
  }, [isActive]);
  
  // Calculate attention stats based on movement patterns
  // This is just a simulation, not real eye tracking
  const getAttentionStatus = () => {
    // Calculate time since last significant movement
    const timeSinceMove = Date.now() - lastMoveTime.current;
    
    if (timeSinceMove > 5000) {
      return "Inactive";
    } else if (timeSinceMove > 2000) {
      return "Focused";
    } else {
      return "Active";
    }
  };
  
  if (!isActive) {
    return (
      <FormControl display="flex" alignItems="center" justifyContent="flex-end" position="fixed" bottom="20px" right="20px" width="auto" zIndex={1000}>
        <FormLabel htmlFor="gaze-toggle" mb="0" mr={2} fontSize="sm">
          Eye-Gaze Visualization
        </FormLabel>
        <Switch
          id="gaze-toggle"
          colorScheme="primary"
          isChecked={isActive}
          onChange={() => setIsActive(!isActive)}
        />
      </FormControl>
    );
  }
  
  return (
    <>
      {/* Gaze Visualization Cursor */}
      {isVisible && (
        <Box
          ref={gazeRef}
          position="fixed"
          width="24px"
          height="24px"
          borderRadius="full"
          bg={gazeCursorColor}
          boxShadow={`0 0 15px 5px ${gazeCursorBlurColor}`}
          transform="translate(-50%, -50%)"
          pointerEvents="none"
          zIndex={9999}
          left={`${position.x}px`}
          top={`${position.y}px`}
          transition="all 0.05s ease-out"
        />
      )}
      
      {/* Focus Point Indicator */}
      {showFocusData && (
        <Box
          position="fixed"
          width="100px"
          height="100px"
          borderRadius="full"
          bg={focusPointColor}
          transform="translate(-50%, -50%)"
          pointerEvents="none"
          zIndex={9998}
          left={`${focusPoint.x}px`}
          top={`${focusPoint.y}px`}
          opacity={0.5}
          transition="all 0.3s ease-out"
        >
          {showTooltips && (
            <Box 
              height="100%" 
              width="100%" 
              position="relative"
              title={`Attention: ${getAttentionStatus()}`}
            >
              <Box 
                position="absolute" 
                top="-40px" 
                left="50%" 
                transform="translateX(-50%)" 
                bg="blackAlpha.800" 
                color="white" 
                px={2}
                py={1}
                borderRadius="md"
                fontSize="sm"
              >
                Attention: {getAttentionStatus()}
              </Box>
            </Box>
          )}
        </Box>
      )}
      
      {/* Controls */}
      <FormControl 
        display="flex" 
        alignItems="center" 
        justifyContent="flex-end" 
        position="fixed" 
        bottom="20px" 
        right="20px" 
        width="auto"
        bg={useColorModeValue('white', 'gray.800')}
        p={2}
        borderRadius="md"
        boxShadow="sm"
        zIndex={1000}
      >
        <FormLabel htmlFor="gaze-toggle" mb="0" mr={2} fontSize="sm">
          Eye-Gaze Visualization
        </FormLabel>
        <Switch
          id="gaze-toggle"
          colorScheme="primary"
          isChecked={isActive}
          onChange={() => setIsActive(!isActive)}
        />
      </FormControl>
    </>
  );
};

export default GazeTracker;