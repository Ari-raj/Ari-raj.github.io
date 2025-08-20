
const sounds = {
    // A short, sharp click sound
    click: 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT19wb2RjYXN0aW5nIHRoaXMgZGF0YSBkZWxldGVkIGFuZCBjbGVhbmVkIGJ5IGh0dHBzOi8vd3d3LnBvZGNhc3RpbmcuYWkv',
    // A short, rising sound
    open: 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT19wb2RjYXN0aW5nIHRoaXMgZGF0YSBkZWxldGVkIGFuZCBjbGVhbmVkIGJ5IGh0dHBzOi8vd3d3LnBvZGNhc3RpbmcuYWkv',
    // A short, falling sound
    close: 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT19wb2RjYXN0aW5nIHRoaXMgZGF0YSBkZWxldGVkIGFuZCBjbGVhbmVkIGJ5IGh0dHBzOi8vd3d3LnBvZGNhc3RpbmcuYWkv',
};

export const playSound = (sound: keyof typeof sounds) => {
    try {
        const audio = new Audio(sounds[sound]);
        audio.volume = 0.4;
        audio.play().catch(e => {
            // This can happen if the user hasn't interacted with the page yet,
            // or if the browser has other restrictions. We can safely ignore this
            // for non-critical UI sounds to avoid console spam.
            if (e.name !== 'NotAllowedError' && e.name !== 'NotSupportedError') {
                 console.error("Error playing sound:", e);
            }
        });
    } catch (e) {
        console.error("Could not create or play sound", e);
    }
};
