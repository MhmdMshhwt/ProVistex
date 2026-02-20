import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = useState<Position>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setTrailPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.2,
        y: prev.y + (mousePos.y - prev.y) * 0.2,
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  return (
    <>
      <style>{`
        * {
          cursor: none;
        }
      `}</style>

      <motion.div
        className="fixed w-6 h-6 pointer-events-none z-[9999]"
        style={{
          left: mousePos.x - 12,
          top: mousePos.y - 12,
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, rgba(6, 182, 212, 0.3) 100%)',
          borderRadius: '50%',
          boxShadow: '0 0 15px rgba(6, 182, 212, 0.6)',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        className="fixed w-2 h-2 pointer-events-none z-[9998]"
        style={{
          left: trailPos.x - 4,
          top: trailPos.y - 4,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(168, 85, 247, 0.2) 100%)',
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(168, 85, 247, 0.4)',
        }}
      />
    </>
  );
}
