import React, { useContext } from 'react';
import { ContentContext } from '../App';

const EducationApp: React.FC = () => {
    const { content } = useContext(ContentContext);

    const sectionStyle: React.CSSProperties = {
        marginBottom: '24px',
    };

    const h3Style: React.CSSProperties = {
        fontFamily: 'var(--font-heading)',
        fontSize: '14px',
        color: 'var(--accent)',
        margin: '0 0 4px 0',
    };
    
    const pStyle: React.CSSProperties = {
        margin: '0 0 12px 0',
        color: 'var(--text-primary)',
        fontSize: '18px',
    };
    
    const listStyle: React.CSSProperties = {
        listStyle: 'none',
        paddingLeft: '0',
        margin: 0,
    };

    const listItemStyle: React.CSSProperties = {
        marginBottom: '6px',
        position: 'relative',
        paddingLeft: '20px',
        color: 'var(--text-primary)',
        fontSize: '18px',
        lineHeight: 1.5
    };

    const listItemBefore: React.CSSProperties = {
        content: '">"',
        position: 'absolute',
        left: '0',
        top: '2px',
        color: 'var(--accent)',
    };

    return (
        <div style={{ height: '100%', overflowY: 'auto', paddingRight: '10px' }}>
             {content.education.map((edu) => (
                <div key={edu.id} style={sectionStyle}>
                    <h3 style={h3Style}>{edu.degree}</h3>
                    <p style={pStyle}>{edu.institution} | {edu.period}</p>
                    {edu.details.length > 0 && (
                        <ul style={listStyle}>
                            {edu.details.map((detail, i) => (
                                <li key={i} style={listItemStyle}>
                                    <span style={listItemBefore}></span>
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default EducationApp;