import React, { useContext } from 'react';
import { DesktopContext } from '../App';
import { APP_CONFIG, DOCK_APPS } from '../constants';

const Dock: React.FC = () => {
  const { openWindow, playSound } = useContext(DesktopContext);

  const handleClick = (appId) => {
    playSound('click');
    openWindow(appId);
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px 8px',
      width: '80px',
      height: '100%',
      backgroundColor: 'var(--surface)',
      borderRight: '2px solid var(--border-color-dark)',
      flexShrink: 0,
    }}>
      {DOCK_APPS.map(appId => {
        const config = APP_CONFIG[appId];
        return (
          <div key={appId} onClick={() => handleClick(appId)} style={{ cursor: 'pointer', marginBottom: '24px' }} title={config.title}>
            <img src={config.iconUrl} alt={config.title} style={{ width: 48, height: 48, transition: 'transform 0.2s' }} 
                 onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15)'}
                 onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Dock;