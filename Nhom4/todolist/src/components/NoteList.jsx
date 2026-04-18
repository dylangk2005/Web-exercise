import React, { useState, useEffect } from 'react';

export default function NoteList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = () => {
      const saved = JSON.parse(localStorage.getItem('notes') || '[]');
      setNotes(saved);
    };

    loadNotes();

    // Listen for updates
    window.addEventListener('notesUpdated', loadNotes);
    return () => window.removeEventListener('notesUpdated', loadNotes);
  }, []);

  const handleDelete = (id) => {
    const updated = notes.filter(note => note.id !== id);
    setNotes(updated);
    localStorage.setItem('notes', JSON.stringify(updated));
    window.dispatchEvent(new Event('notesUpdated'));
  };

  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <p className="empty-state">Chưa có ghi chú nào. Hãy thêm ghi chú mới! 📌</p>
      ) : (
        notes.map(note => (
          <div key={note.id} className="note-item">
            <div className="note-content">
              <div className="note-header">
                <span className="note-icon">{note.icon}</span>
                <p className="note-text">{note.content}</p>
              </div>
              <span className="note-time">{note.createdAt}</span>
            </div>
            <button
              className="btn-delete"
              onClick={() => handleDelete(note.id)}
              title="Xóa ghi chú"
            >
              Xóa
            </button>
          </div>
        ))
      )}
    </div>
  );
}
