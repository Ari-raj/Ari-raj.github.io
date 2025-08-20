
import React, { useState, useCallback, createContext, useMemo } from 'react';
import type { WindowInstance, AppId, Content } from './types';
import { INITIAL_CONTENT, APP_CONFIG } from './constants';
import useLocalStorage from './hooks/useLocalStorage';
import TopBar from './components/Header';
import Dock from './components/Footer';
import HomePage from './pages/HomePage';
import BootSequence from './components/BootSequence';
import { playSound } from './utils/sounds';

// --- Contexts ---
export const ContentContext = createContext<{
  content: Content;
  setContent: React.Dispatch<React.SetStateAction<Content>>;
}>({ content: INITIAL_CONTENT, setContent: () => {} });

export const DesktopContext = createContext<{
  windows: WindowInstance[];
  openWindow: (appId: AppId, data?: any) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  adminPassword:  string;
  setAdminPassword: React.Dispatch<React.SetStateAction<string>>;
  playSound: (sound: 'open' | 'close' | 'click') => void;
  activeWindowTitle: string | null;
}>({ windows: [], openWindow: () => {}, closeWindow: () => {}, focusWindow: () => {}, adminPassword: 'admin', setAdminPassword: () => {}, playSound: () => {}, activeWindowTitle: null });


const App: React.FC = () => {
  const [content, setContent] = useLocalStorage<Content>('portfolio-content', INITIAL_CONTENT);
  const [adminPassword, setAdminPassword] = useLocalStorage<string>('admin-password', 'admin');
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(100);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  const openWindow = useCallback((appId: AppId, data?: any) => {
    playSound('open');
    if (APP_CONFIG[appId]?.isExternal) return;

    if (appId === 'admin' && !isAuthenticated) {
      appId = 'login';
    }

    const newWindow: WindowInstance = {
      id: `${appId}-${Date.now()}`,
      appId,
      title: APP_CONFIG[appId].title,
      iconUrl: APP_CONFIG[appId].iconUrl,
      position: { x: Math.random() * 200 + 150, y: Math.random() * 100 + 50 },
      size: APP_CONFIG[appId].defaultSize,
      zIndex: maxZIndex + 1,
      data,
    };
    setMaxZIndex(maxZIndex + 1);
    setWindows(prev => [...prev, newWindow]);
  }, [maxZIndex, isAuthenticated]);

  const closeWindow = useCallback((id: string) => {
    // sound is now played from the window component itself
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    if (windows.find(w => w.id === id)?.zIndex === maxZIndex) return;
    
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZIndex } : w));
  }, [maxZIndex, windows]);

  const onLoginSuccess = () => {
    setIsAuthenticated(true);
    const loginWindow = windows.find(w => w.appId === 'login');
    if (loginWindow) {
      closeWindow(loginWindow.id);
    }
    openWindow('admin');
  };

  const activeWindowTitle = useMemo(() => {
    if (windows.length === 0) return null;
    const topWindow = windows.reduce((top, win) => (win.zIndex > top.zIndex ? win : top), windows[0]);
    return topWindow.title;
  }, [windows]);

  if (isBooting) {
    return <BootSequence onBootComplete={() => setIsBooting(false)} />;
  }

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      <DesktopContext.Provider value={{ windows, openWindow, closeWindow, focusWindow, adminPassword, setAdminPassword, playSound, activeWindowTitle }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <TopBar />
          <div style={{ display: 'flex', flexGrow: 1, height: 'calc(100vh - 40px)' }}>
            <Dock />
            <HomePage onLoginSuccess={onLoginSuccess} />
          </div>
        </div>
      </DesktopContext.Provider>
    </ContentContext.Provider>
  );
};

export default App;
