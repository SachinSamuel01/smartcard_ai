import React from 'react';
import VoiceToText from './components/voicetotext';
import PdfTextExtractor from './components/pdftotext';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Voice to Text Application</h1>
        <VoiceToText />
        <PdfTextExtractor />
      </header>
    </div>
  );
}

export default App;