import React, { useContext } from 'react';
import { ContentContext } from '../App';

const SkillsApp: React.FC = () => {
    const { content } = useContext(ContentContext);

    const categoryStyle: React.CSSProperties = {
        marginBottom: '20px',
    };

    const h3Style: React.CSSProperties = {
        paddingBottom: '8px',
        marginTop: '0',
        marginBottom: '12px',
        fontSize: '12px'
    };
    
    const listStyle: React.CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        listStyle: 'none',
        padding: 0,
        margin: 0
    };

    const listItemStyle: React.CSSProperties = {
        backgroundColor: 'var(--surface-light)',
        padding: '6px 12px',
        fontSize: '18px',
        color: 'var(--text-primary)',
        border: '2px solid var(--border-color-dark)'
    };

    return (
        <div style={{ height: '100%', overflowY: 'auto', paddingRight: '10px' }}>
            {Object.entries(content.skills).map(([category, skills]) => (
                <div key={category} style={categoryStyle}>
                    <h3 style={h3Style}>{category}</h3>
                    <ul style={listStyle}>
                        {skills.map((skill, index) => (
                            <li key={index} style={listItemStyle}>
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default SkillsApp;