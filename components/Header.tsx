
import React, { useState, useEffect, useContext } from 'react';
import { DesktopContext } from '../App';

const TopBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { activeWindowTitle } = useContext(DesktopContext);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center', // Center items horizontally
      alignItems: 'center',
      padding: '8px 16px',
      height: '40px',
      backgroundColor: 'var(--primary)',
      color: '#000',
      textShadow: '1px 1px var(--background)',
      borderBottom: '2px solid var(--border-color-dark)',
      flexShrink: 0,
      userSelect: 'none',
      zIndex: 1000,
      fontFamily: 'var(--font-heading)',
      fontSize: '12px',
      position: 'relative', // for positioning children
    }}>
      <div style={{ position: 'absolute', left: '16px', textTransform: 'uppercase' }}>ARIBA OS v1.0</div>
      <div style={{
          transition: 'opacity 0.3s ease-in-out',
          opacity: activeWindowTitle ? 1 : 0.7,
      }}>
          {activeWindowTitle || "Desktop"}
      </div>
      <div style={{ position: 'absolute', right: '16px' }}>{timeString}</div>
    </div>
  );
};

export default TopBar;
