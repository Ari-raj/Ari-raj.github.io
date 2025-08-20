import React, { useContext } from 'react';
import { ContentContext } from '../App';

const TerminalOutput: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: '0 0 1em 0' }}>{children}</pre>
);

const TerminalApp: React.FC = () => {
    const { content } = useContext(ContentContext);
    const userHost = "ariba@portfolio";

    const prompt = <span style={{ color: '#00ffcc' }}>{userHost}:~$ </span>;

    return (
        <div style={{ 
            backgroundColor: 'rgba(10, 10, 20, 0.9)', 
            color: '#e0e0e0', 
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            padding: '12px',
            height: '100%',
            overflowY: 'auto',
            border: '2px inset #0a0a1e'
        }}>
            <TerminalOutput>
                {prompt}<span style={{ color: 'white' }}>./show_about.sh</span>
                <br />
                <span style={{ color: '#e94560', fontWeight: 'bold' }}>## {content.about.name} - {content.about.tagline}</span>
                <br />
                {content.about.professionalStatement}
            </TerminalOutput>
            
            <TerminalOutput>
                {prompt}<span style={{ color: 'white' }}>./list_skills.sh</span>
                <br />
                {Object.entries(content.skills).map(([category, skills]) => (
                    <div key={category} style={{ marginBottom: '0.5em' }}>
                        <span style={{ color: '#82aaff', textDecoration: 'underline' }}>{category}:</span>
                        <br />
                        {skills.join(', ')}
                    </div>
                ))}
            </TerminalOutput>

            <TerminalOutput>
                {prompt}<span style={{ color: 'white' }}>./show_education.sh</span>
                <br/>
                {content.education.map((edu, index) => (
                    <div key={index} style={{marginBottom: '1em'}}>
                        <span style={{color: '#82aaff'}}>{edu.degree}</span> - {edu.institution} ({edu.period})
                        <br/>
                        {edu.details.map((detail, i) => <span key={i} style={{display: 'block', paddingLeft: '2em'}}>- {detail}</span>)}
                    </div>
                ))}
            </TerminalOutput>

             <TerminalOutput>
                {prompt}<span style={{ animation: 'blink 1s step-end infinite', backgroundColor: '#e0e0e0' }}>&nbsp;</span>
            </TerminalOutput>
            <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
        </div>
    );
};

export default TerminalApp;