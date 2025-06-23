import React from 'react';
import { PenTool } from 'lucide-react';

interface EssayFormProps {
  topic: string;
  setTopic: (value: string) => void;
  details: string;
  setDetails: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const EssayForm: React.FC<EssayFormProps> = ({
  topic,
  setTopic,
  details,
  setDetails,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
          Essay Topic <span className="text-gray-600">(Required)</span>
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your essay topic here"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5CBAE5] transition-all duration-200"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="details" className="block text-sm font-medium text-gray-700">
          Additional Details (optional)
        </label>
        <textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Add any additional context, requirements, or specific points you want included"
          className="w-full px-4 py-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-[#5CBAE5] resize-none transition-all duration-200"
        />
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !topic.trim()}
        className={`w-full flex items-center justify-center px-6 py-4 rounded-md font-semibold text-white transition-all duration-200 ${
          isLoading || !topic.trim()
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-[#5CBAE5] hover:bg-[#4BA9D4]'
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Essay...
          </>
        ) : (
          <>
            <PenTool className="mr-2 h-5 w-5" />
            Write Essay
          </>
        )}
      </button>
    </div>
  );
};

export default EssayForm