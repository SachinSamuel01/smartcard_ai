import React, {useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack';
// import React, { useRef, useState } from 'react';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const PdfTextExtractor = () => {
    const [pdfText, setPdfText] = useState('');
    const fileInputRef = useRef(null);
  
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = async function () {
          const typedArray = new Uint8Array(this.result);
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
          let extractedText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            textContent.items.forEach(item => {
              extractedText += item.str + ' ';
            });
          }
          setPdfText(extractedText);
        };
        fileReader.readAsArrayBuffer(file);
      }
    };
  
    const handleReset = () => {
      setPdfText('');
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    };
  
    return (
      <div>
        <h2>PDF Text Extractor</h2>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="application/pdf" 
          ref={fileInputRef}
        />
        <button onClick={handleReset}>Reset</button>
        <div>
          <h3>Extracted Text:</h3>
          <textarea 
            value={pdfText} 
            readOnly 
            style={{ width: '100%', height: '300px' }} 
          />
        </div>
      </div>
    );
  };
  
  export default PdfTextExtractor;