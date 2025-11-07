
import React, { useState } from 'react';
import { EditIcon } from './icons/EditIcon';

interface ImageEditorProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt.trim());
    }
  };

  return (
    <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
      <h2 className="text-xl font-bold text-cyan-300 mb-4">3. Edit With AI (Optional)</h2>
      <p className="text-gray-400 mb-4 text-sm">Describe a change you want to make to the <span className="font-bold">original</span> image, like "Add a retro filter" or "Make it look like a watercolor painting".</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Add a cat wearing sunglasses"
          disabled={isLoading}
          className="flex-grow bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="flex items-center justify-center gap-2 px-6 py-2 bg-teal-500 text-gray-900 font-bold rounded-lg hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          <EditIcon />
          {isLoading ? 'Applying edit...' : 'Apply Edit'}
        </button>
      </form>
    </div>
  );
};

export default ImageEditor;
