import React, { useState } from 'react';

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    backgroundColor: 'var(--surface-light)',
    border: '2px inset var(--border-color-dark)',
    color: 'var(--text-primary)',
    marginBottom: '16px',
    fontFamily: 'var(--font-body)',
    fontSize: '18px'
};

const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    height: '120px',
    resize: 'vertical',
};

const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    borderStyle: 'solid',
    borderWidth: '3px',
    borderColor: 'var(--border-color-light) var(--border-color-dark) var(--border-color-dark) var(--border-color-light)',
    backgroundColor: 'var(--primary)',
    color: '#000',
    cursor: 'pointer',
    fontFamily: 'var(--font-heading)',
    fontSize: '12px',
    transition: 'opacity 0.2s',
};

const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '4px',
    fontFamily: 'var(--font-heading)',
    fontSize: '10px',
    color: 'var(--text-secondary)'
}

const ContactFormApp: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Thank you, ${name}! Your message has been sent.\n\nEmail: ${email}\nMessage: ${message}`);
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginTop: 0, fontSize: '14px' }}>Send a Message</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div>
                    <label style={labelStyle}>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <div>
                    <label style={labelStyle}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <div>
                    <label style={labelStyle}>Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={textareaStyle}
                        required
                    />
                </div>
                <button type="submit" style={buttonStyle}
                    onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
                    onMouseOut={e => e.currentTarget.style.opacity = '1'}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ContactFormApp;