
import React, { useState, useContext } from 'react';
import { DesktopContext } from '../App';
import { APP_CONFIG, DOCK_APPS } from '../constants';
import type { AppId, AppConfig } from '../types';

const ActivitiesView: React.FC = () => {
    const { openWindow, playSound } = useContext(DesktopContext);
    const [searchTerm, setSearchTerm] = useState('');

    const appEntries = Object.entries(APP_CONFIG) as [AppId, AppConfig][];

    const filteredApps = appEntries.filter(([appId, config]) => {
        if (appId === 'viewer') return false;
        if (DOCK_APPS.includes(appId)) return false;

        if (searchTerm.trim() === '') {
            if (appId === 'admin' || appId === 'login') return false;
        }

        return config.title.toLowerCase().includes(searchTerm.toLowerCase());
    });


    const handleAppClick = (appId: AppId) => {
        playSound('click');
        const config = APP_CONFIG[appId];
        if (config.isExternal && config.url) {
            window.open(config.url, '_blank', 'noopener,noreferrer');
        } else {
            openWindow(appId, { appId }); // Pass appId for context in list views
        }
    };

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px',
            overflowY: 'auto'
        }}>
            <input 
                type="text"
                placeholder="search for more details about ariba"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                    width: '60%',
                    maxWidth: '700px',
                    padding: '12px 20px',
                    fontSize: '16px',
                    fontFamily: 'var(--font-heading)',
                    backgroundColor: 'var(--surface)',
                    border: '3px solid',
                    borderTopColor: 'var(--border-color-dark)',
                    borderLeftColor: 'var(--border-color-dark)',
                    borderBottomColor: 'var(--border-color-light)',
                    borderRightColor: 'var(--border-color-light)',
                    color: 'var(--text-primary)',
                    marginBottom: '40px',
                    flexShrink: 0,
                    textAlign: 'center'
                }}
            />
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '32px',
                width: '100%',
                maxWidth: '1200px',
                padding: '0 20px',
            }}>
                {filteredApps.map(([appId, config]) => (
                    <div 
                        key={appId}
                        onClick={() => handleAppClick(appId)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '16px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, text-shadow 0.2s',
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            const textEl = e.currentTarget.querySelector('span');
                            if(textEl) textEl.style.textShadow = '0 0 8px var(--glow)';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                             const textEl = e.currentTarget.querySelector('span');
                            if(textEl) textEl.style.textShadow = 'none';
                        }}
                    >
                        <img src={config.iconUrl} alt={config.title} style={{ width: 64, height: 64, marginBottom: '12px' }} />
                        <span style={{ 
                            fontFamily: 'var(--font-heading)',
                            fontSize: '10px',
                            textAlign: 'center',
                            color: 'var(--text-primary)',
                            transition: 'text-shadow 0.2s',
                        }}>{config.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivitiesView;