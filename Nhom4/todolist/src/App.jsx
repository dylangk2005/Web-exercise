import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './index.css';

export default function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main className="container">
          <NoteForm />
          <NoteList />
        </main>
      </div>
    </ThemeProvider>
  );
}
