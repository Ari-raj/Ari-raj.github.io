import React, { useRef, useState, useContext, useEffect } from 'react';
import type { WindowInstance } from '../types';
import { DesktopContext } from '../App';

interface DraggableState {
  isDragging: boolean;
  offset: { x: number; y: number };
}

const Window: React.FC<{ instance: WindowInstance; children: React.ReactNode; }> = ({ instance, children }) => {
  const { closeWindow, focusWindow, windows, playSound } = useContext(DesktopContext);
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(instance.position);

  const maxZ = windows.reduce((max, win) => Math.max(max, win.zIndex), 0);
  const isFocused = instance.zIndex === maxZ;

  const [dragState, setDragState] = useState<DraggableState>({
    isDragging: false,
    offset: { x: 0, y: 0 },
  });

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.window-control') || (e.target as HTMLElement).closest('.no-drag')) {
        return;
    }
    focusWindow(instance.id);
    const windowRect = ref.current?.getBoundingClientRect();
    if (windowRect) {
      setDragState({
        isDragging: true,
        offset: {
          x: e.clientX - windowRect.left,
          y: e.clientY - windowRect.top,
        },
      });
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (dragState.isDragging) {
      setPosition({
        x: e.clientX - dragState.offset.x,
        y: e.clientY - dragState.offset.y,
      });
    }
  };

  const onMouseUp = () => {
    setDragState({ ...dragState, isDragging: false });
  };
  
  const handleClose = () => {
      playSound('close');
      closeWindow(instance.id);
  };

  useEffect(() => {
    if (dragState.isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragState.isDragging]);


  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${instance.size.width}px`,
        height: `${instance.size.height}px`,
        backgroundColor: 'var(--surface)',
        border: '3px solid',
        borderTopColor: isFocused ? 'var(--glow)' : 'var(--border-color-light)',
        borderLeftColor: isFocused ? 'var(--glow)' : 'var(--border-color-light)',
        borderBottomColor: 'var(--border-color-dark)',
        borderRightColor: 'var(--border-color-dark)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: instance.zIndex,
        boxShadow: isFocused ? `0 0 20px var(--glow), 0 0 30px var(--secondary)` : '8px 8px 0px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.2s, border-color 0.2s',
      }}
      onClick={() => focusWindow(instance.id)}
    >
      <div
        onMouseDown={onMouseDown}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '4px 8px',
          height: '36px',
          backgroundColor: isFocused ? 'var(--primary)' : 'var(--surface-light)',
          color: isFocused ? '#000' : 'var(--text-primary)',
          cursor: 'move',
          borderBottom: '3px solid var(--border-color-dark)',
          userSelect: 'none',
          fontFamily: 'var(--font-heading)',
          fontSize: '10px',
          textShadow: '1px 1px var(--border-color-dark)'
        }}
      >
        <img src={instance.iconUrl} alt="" style={{width: 20, height: 20, marginRight: 8}}/>
        <span style={{ flexGrow: 1, textShadow: 'none' }}>{instance.title}</span>
        <button
          className="window-control"
          onClick={handleClose}
          style={{
            width: 24, height: 24, background: '#a0a0c0', border: '2px solid',
            borderColor: 'var(--border-color-light) var(--border-color-dark) var(--border-color-dark) var(--border-color-light)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000',
            fontFamily: 'var(--font-body)', fontWeight: 'bold'
          }}
          title="Close"
        >&times;</button>
      </div>
      <div style={{ flexGrow: 1, padding: '16px', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
};

export default Window;
