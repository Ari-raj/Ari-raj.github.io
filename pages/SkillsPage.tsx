import React, { useContext } from 'react';
import { ContentContext } from '../App';

const AboutApp: React.FC = () => {
    const { content } = useContext(ContentContext);
    const { about } = content;

    const sectionStyle: React.CSSProperties = {
        marginBottom: '24px',
    };

    const h2Style: React.CSSProperties = {
        paddingBottom: '8px',
        marginTop: '0',
        marginBottom: '12px',
        fontSize: '14px'
    };
    
    const listStyle: React.CSSProperties = {
        listStyle: 'none',
        paddingLeft: '0',
    };

    const listItemStyle: React.CSSProperties = {
        marginBottom: '8px',
        position: 'relative',
        paddingLeft: '20px',
    };

    const listItemBefore: React.CSSProperties = {
        content: '">"',
        position: 'absolute',
        left: '0',
        color: 'var(--primary)',
    };

    return (
        <div style={{ height: '100%', overflowY: 'auto', paddingRight: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                <img src={about.photoUrl} alt={about.name} style={{ width: 100, height: 100, border: '3px solid var(--primary)', marginRight: '20px', imageRendering: 'pixelated' }}/>
                <div>
                    <h1 style={{ margin: 0, fontSize: '18px' }}>{about.name}</h1>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '18px' }}>{about.tagline}</p>
                </div>
            </div>

            <div style={sectionStyle}>
                <h2 style={h2Style}>Statement</h2>
                <p style={{ lineHeight: 1.6 }}>{about.professionalStatement}</p>
            </div>
            
            <div style={sectionStyle}>
                <h2 style={h2Style}>Achievements</h2>
                <ul style={listStyle}>
                    {about.achievements.map((item, index) => (
                        <li key={index} style={listItemStyle}>
                            <span style={listItemBefore}></span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AboutApp;