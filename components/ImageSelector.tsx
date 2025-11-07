
import React, { useRef } from 'react';
import { TRENDING_TEMPLATES } from '../constants';
import type { MemeTemplate } from '../types';
import { UploadIcon } from './icons/UploadIcon';

interface ImageSelectorProps {
  onImageSelect: (file: File) => void;
  onTemplateSelect: (template: MemeTemplate) => void;
  disabled: boolean;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onImageSelect, onTemplateSelect, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
      <h2 className="text-xl font-bold text-cyan-300 mb-4">1. Choose an Image</h2>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        disabled={disabled}
      />
      <button
        onClick={handleUploadClick}
        disabled={disabled}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-700 border border-gray-600 font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <UploadIcon />
        Upload Your Own Image
      </button>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-600"></div>
        <span className="flex-shrink mx-4 text-gray-400">OR</span>
        <div className="flex-grow border-t border-gray-600"></div>
      </div>

      <h3 className="text-lg font-semibold text-gray-300 mb-3">Select a trending template</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {TRENDING_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateSelect(template)}
            disabled={disabled}
            className="aspect-video rounded-md overflow-hidden transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <img src={template.url} alt={template.name} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageSelector;
