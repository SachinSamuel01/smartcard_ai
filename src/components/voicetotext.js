// import React from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const VoiceToText = () => {
//   const { transcript, resetTranscript, listening } = useSpeechRecognition();

//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     return <div>Your browser does not support speech recognition software!</div>;
//   }

//   const startListening = () => SpeechRecognition.startListening({ continuous: true });
//   const stopListening = () => SpeechRecognition.stopListening();

//   return (
//     <div>
//       <h2>Voice to Text</h2>
//       <div>
//         <button onClick={startListening}>Start Listening</button>
//         <button onClick={stopListening}>Stop Listening</button>
//         <button onClick={resetTranscript}>Reset</button>
//       </div>
//       <p>{listening ? "Listening..." : "Click 'Start Listening' to start"}</p>
//       <textarea value={transcript} readOnly />
//     </div>
//   );
// };

// export default VoiceToText;


import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

const VoiceToText = () => {
  const [response, setResponse] = useState('');
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Your browser does not support speech recognition software!</div>;
  }

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  const handleQuery = async () => {
    try {
      const res = await axios.post('http://localhost:5000/query', { query: transcript });
      setResponse(res.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Voice to Text</h2>
      <div>
        <button onClick={startListening}>Start Listening</button>
        <button onClick={stopListening}>Stop Listening</button>
        <button onClick={resetTranscript}>Reset</button>
        <button onClick={handleQuery}>Send Query</button>
      </div>
      <p>{listening ? "Listening..." : "Click 'Start Listening' to start"}</p>
      <textarea value={transcript} readOnly />
      <div>
        <h3>AI Response:</h3>
        <textarea value={response} readOnly style={{ width: '100%', height: '100px' }} />
      </div>
    </div>
  );
};

export default VoiceToText;