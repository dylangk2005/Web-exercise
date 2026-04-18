import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const [noteCount, setNoteCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const notes = JSON.parse(localStorage.getItem('notes') || '[]');
      setNoteCount(notes.length);
    };
    
    updateCount();
    
    // Listen for storage changes
    window.addEventListener('storage', updateCount);
    window.addEventListener('notesUpdated', updateCount);
    
    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('notesUpdated', updateCount);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <h1>📝 Ghi Chú Cá Nhân</h1>
        <div className="header-actions">
          <span className="note-count">{noteCount} ghi chú</span>
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            title={isDark ? 'Sáng' : 'Tối'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}
