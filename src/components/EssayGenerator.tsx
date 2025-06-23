import React, { useState, useRef } from 'react';
import { Copy, CheckCheck } from 'lucide-react';
import EssayForm from './EssayForm';
import { generateEssay } from '../services/essayService';
import MarkdownOutput from './MarkdownOutput';

const EssayGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [details, setDetails] = useState('');
  const [essay, setEssay] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleGenerateEssay = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic for your essay');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await generateEssay(topic, details);
      setEssay(result);
      setWordCount(result.split(/\s+/).filter(Boolean).length);
    } catch (error) {
      console.error('Error generating essay:', error);
      setError(error instanceof Error ? error.message : 'Sorry, there was an error generating your essay. Please try again.');
      setEssay('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (essay) {
      try {
        await navigator.clipboard.writeText(essay);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        // Fallback method for copying
        const textArea = document.createElement('textarea');
        textArea.value = essay;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Fallback copy failed:', err);
        }
        document.body.removeChild(textArea);
      }
    }
  };

  const handleClearForm = () => {
    setTopic('');
    setDetails('');
    setEssay('');
    setWordCount(0);
    setError(null);
  };

  return (
    <div className="p-6">
      {!essay ? (
        <>
          <EssayForm
            topic={topic}
            setTopic={setTopic}
            details={details}
            setDetails={setDetails}
            onGenerate={handleGenerateEssay}
            isLoading={isLoading}
          />
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
              {error}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleClearForm}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 rounded-md text-gray-800 font-medium"
            >
              ← Back
            </button>
            <div className="text-gray-600">Words: {wordCount} / 1500</div>
          </div>
          
          <div 
            ref={outputRef} 
            className="bg-white border border-gray-200 rounded-lg p-4 max-h-[600px] overflow-y-auto"
          >
            <MarkdownOutput content={essay} />
          </div>
          
          <div className="flex justify-end mt-4">
            <button
              onClick={handleCopy}
              className={`flex items-center justify-center px-6 py-3 rounded-md font-semibold text-white transition-all duration-200 ${
                copied ? 'bg-green-600' : 'bg-[#D94C37] hover:bg-[#C13C2D]'
              }`}
            >
              {copied ? (
                <>
                  <CheckCheck className="mr-2 h-5 w-5" />
                  COPIED!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-5 w-5" />
                  COPY
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EssayGenerator;