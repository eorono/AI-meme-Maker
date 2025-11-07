
import React from 'react';

interface CaptionSuggestionsProps {
  captions: string[];
  onSelect: (caption: string) => void;
  isLoading: boolean;
  selectedCaption: string;
}

const CaptionSuggestions: React.FC<CaptionSuggestionsProps> = ({ captions, onSelect, isLoading, selectedCaption }) => {
  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-700 rounded-md"></div>
        ))}
      </div>
    );
  }

  if (captions.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-300 mb-3">Choose a caption:</h3>
      <div className="space-y-2">
        {captions.map((caption, index) => (
          <button
            key={index}
            onClick={() => onSelect(caption)}
            className={`w-full p-3 text-left rounded-md transition-colors duration-200 text-sm md:text-base ${
              selectedCaption === caption
                ? 'bg-cyan-600 text-white font-semibold'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {caption}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CaptionSuggestions;
