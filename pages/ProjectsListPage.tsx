import React, { useContext } from 'react';
import { ContentContext, DesktopContext } from '../App';
import type { FileItem, AppId } from '../types';
import { APP_CONFIG } from '../constants';

const Entry: React.FC<{
    item: FileItem;
    onOpen: (item: FileItem) => void;
    iconUrl: string;
}> = ({ item, onOpen, iconUrl }) => {
    return (
        <div
            onClick={() => onOpen(item)}
            style={{
                display: 'flex', alignItems: 'center', padding: '10px 8px',
                cursor: 'pointer', transition: 'background-color 0.2s',
                borderBottom: '2px solid var(--surface-light)'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--primary)'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
            <img src={iconUrl} alt="icon" style={{ width: 28, height: 28, marginRight: 12 }}/>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '18px' }}>{item.title}</span>
        </div>
    );
};


const ListViewApp: React.FC<{ appId: AppId }> = ({ appId }) => {
    const { content } = useContext(ContentContext);
    const { openWindow } = useContext(DesktopContext);

    const handleOpenFile = (item: FileItem) => {
        openWindow('viewer', { file: item });
    };
    
    const config = APP_CONFIG[appId];
    let items: FileItem[] = [];
    if (appId === 'projects') items = content.projects;
    else if (appId === 'certificates') items = content.certificates;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ overflowY: 'auto', flexGrow: 1 }}>
                {items.map((item) => <Entry key={item.id} item={item} onOpen={handleOpenFile} iconUrl={config.iconUrl} />)}
            </div>
        </div>
    );
};

export default ListViewApp;