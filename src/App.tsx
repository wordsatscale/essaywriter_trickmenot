import React from 'react';
import Header from './components/Header';
import EssayGenerator from './components/EssayGenerator';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden">
        <Header />
        <EssayGenerator />
      </div>
    </div>
  );
}

export default App;