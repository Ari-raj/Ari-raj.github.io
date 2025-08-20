import React, { useState, useContext } from 'react';
import { ContentContext } from '../App';

const PhoneApp: React.FC = () => {
  const { content } = useContext(ContentContext);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content.contact.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    borderStyle: 'solid',
    borderWidth: '3px',
    borderColor: 'var(--border-color-light) var(--border-color-dark) var(--border-color-dark) var(--border-color-light)',
    backgroundColor: copied ? '#4caf50' : 'var(--surface-light)',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    fontFamily: 'var(--font-heading)',
    fontSize: '12px',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '0 0 16px 0',
        color: 'var(--text-primary)',
        letterSpacing: '2px'
      }}>
        {content.contact.phone}
      </p>
      <button style={buttonStyle} onClick={handleCopy} onMouseDown={e => e.currentTarget.style.borderColor = 'var(--border-color-dark) var(--border-color-light) var(--border-color-light) var(--border-color-dark)'} onMouseUp={e => e.currentTarget.style.borderColor = 'var(--border-color-light) var(--border-color-dark) var(--border-color-dark) var(--border-color-light)'}>
        {copied ? 'COPIED!' : 'CLICK TO COPY'}
      </button>
    </div>
  );
};

export default PhoneApp;