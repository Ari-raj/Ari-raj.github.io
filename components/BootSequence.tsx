
import React, { useState, useEffect } from 'react';
import { playSound } from '../utils/sounds';

const bootMessages = [
    'INIT ARIBA_OS v1.0...',
    'Loading kernel modules... [OK]',
    'Mounting virtual file systems... [OK]',
    'Starting window manager... [OK]',
    'Calibrating neon emitters... [DONE]',
    'Loading Y2K aesthetic libraries... [OK]',
    'Establishing connection to the future... [CONNECTED]',
    'Welcome, User.',
    ''
];

const BootSequence: React.FC<{ onBootComplete: () => void }> = ({ onBootComplete }) => {
    const [lines, setLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);

    useEffect(() => {
        if (currentLineIndex < bootMessages.length) {
            const timeout = setTimeout(() => {
                setLines(prev => [...prev, bootMessages[currentLineIndex]]);
                setCurrentLineIndex(prev => prev + 1);
            }, Math.random() * 200 + 100 * (bootMessages[currentLineIndex].length > 10 ? 2 : 1) );
            return () => clearTimeout(timeout);
        } else {
            const finalTimeout = setTimeout(onBootComplete, 1000);
            return () => clearTimeout(finalTimeout);
        }
    }, [currentLineIndex, onBootComplete]);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: 'var(--border-color-dark)',
            color: 'var(--accent)',
            fontFamily: 'var(--font-body)',
            fontSize: '22px',
            padding: '20px',
            overflow: 'hidden'
        }}>
            {lines.map((line, index) => (
                <div key={index}>> {line}</div>
            ))}
            {currentLineIndex < bootMessages.length && <span style={{ animation: 'blink 1s step-end infinite', backgroundColor: 'var(--accent)' }}>&nbsp;</span>}
            <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
        </div>
    );
};

export default BootSequence;
