import React, { useState, useContext } from 'react';
import { DesktopContext } from '../App';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { adminPassword } = useContext(DesktopContext);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      onLoginSuccess();
    } else {
      setError('Incorrect password.');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    backgroundColor: 'var(--surface-light)',
    border: '2px inset var(--border-color-dark)',
    color: 'var(--text-primary)',
    marginBottom: '16px',
    fontFamily: 'var(--font-body)',
    fontSize: '20px',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    borderStyle: 'solid',
    borderWidth: '3px',
    borderColor: 'var(--border-color-light) var(--border-color-dark) var(--border-color-dark) var(--border-color-light)',
    backgroundColor: 'var(--surface-light)',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    fontFamily: 'var(--font-heading)',
    fontSize: '12px',
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <h3 style={{ marginTop: 0, fontSize: '14px' }}>Admin Access</h3>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={inputStyle}
          autoFocus
        />
        <button type="submit" style={buttonStyle}>Login</button>
        {error && <p style={{ color: '#ff8a80', marginTop: '12px', fontSize: '18px' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginScreen;