import { useState, useEffect } from 'react';

// Interface to type the window size
interface WindowSize {
  width: number;
  height: number;
}


// Custom Hook to get window size (width and height)
export const useWindowSize = (): WindowSize => {
  // State to hold the window size
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Effect to handle the resize event
  useEffect(() => {
    // Function to update window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener on mount
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount and cleanup on unmount

  return windowSize;
};
