import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ScrollConnector = ({ children }) => {
  const lineRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const line = lineRef.current;
      if (line) {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        controls.start({
          height: `${scrollPercent}%`,
          transition: { duration: 0.3, ease: 'easeInOut' },
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <div className="relative">
      {/* Línea animada */}
      <motion.div
        ref={lineRef}
        className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-500"
        initial={{ height: 0 }}
        animate={controls}
        style={{ top: '10vh', bottom: '10vh' }}
      />
      {/* Secciones */}
      <div className="space-y-24">{children}</div>
    </div>
  );
};

export default ScrollConnector;
