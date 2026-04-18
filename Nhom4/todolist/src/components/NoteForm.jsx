import React, { useState } from 'react';

export default function NoteForm() {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const newNote = {
      id: Date.now(),
      content: input.trim(),
      createdAt: new Date().toLocaleString('vi-VN'),
      icon: getIcon(input)
    };

    notes.unshift(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    
    // Dispatch custom event to update parent components
    window.dispatchEvent(new Event('notesUpdated'));
    
    setInput('');
  };

  const getIcon = (text) => {
    const icons = ['📚', '⚡', '🔗', '🌙', '💾'];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="note-input"
        placeholder="Nhập ghi chú mới..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="btn-add">
        + Thêm
      </button>
    </form>
  );
}
