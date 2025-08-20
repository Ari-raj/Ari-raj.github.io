import React from 'react';
import type { FileItem } from '../types';

const DocumentViewerApp: React.FC<{ file?: FileItem }> = ({ file }) => {
    
    const NoFileSelected = () => (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', color: 'var(--text-secondary)', padding: '20px'}}>
           <img src="https://img.icons8.com/ios/100/cancel-2.png" alt="Error" style={{opacity: 0.5, filter: 'grayscale(1) invert(1) brightness(0.8)'}}/>
           <h3 style={{marginTop: 16, fontFamily: 'var(--font-heading)', fontSize: '12px'}}>DOCUMENT ERROR</h3>
           <p style={{fontFamily: 'var(--font-body)', fontSize: '18px'}}>The file may be missing or the source does not allow embedding.</p>
       </div>
   );

    if (!file || !file.url) {
        return <NoFileSelected />;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#000' }}>
            <iframe
                src={file.url}
                style={{ flexGrow: 1, border: 'none' }}
                title={file.title}
                sandbox="allow-scripts allow-same-origin"
            ></iframe>
        </div>
    );
};

export default DocumentViewerApp;