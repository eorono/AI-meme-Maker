
import React, { useState, useCallback, useRef } from 'react';
import type { MemeTemplate } from './types';
import { generateCaptions, editImage } from './services/geminiService';
import Header from './components/Header';
import ImageSelector from './components/ImageSelector';
import MemeCanvas from './components/MemeCanvas';
import CaptionSuggestions from './components/CaptionSuggestions';
import ImageEditor from './components/ImageEditor';
import { MagicWandIcon } from './components/icons/MagicWandIcon';

interface ImageData {
  data: string;
  mimeType: string;
}

const toBase64 = (file: File | Blob): Promise<ImageData> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const data = result.split(',')[1];
      const mimeType = result.split(',')[0].split(':')[1].split(';')[0];
      resolve({ data, mimeType });
    };
    reader.onerror = (error) => reject(error);
  });

export default function App() {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [captions, setCaptions] = useState<string[]>([]);
  const [selectedCaption, setSelectedCaption] = useState<string>('');
  const [isLoadingCaptions, setIsLoadingCaptions] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const memeCanvasRef = useRef<HTMLDivElement>(null);

  const resetState = () => {
    setEditedImage(null);
    setCaptions([]);
    setSelectedCaption('');
    setError(null);
  };

  const handleImageSelect = useCallback(async (file: File) => {
    try {
      const imageData = await toBase64(file);
      setOriginalImage(imageData);
      resetState();
    } catch (err) {
      console.error(err);
      setError('Failed to load image. Please try another one.');
    }
  }, []);

  const handleTemplateSelect = useCallback(async (template: MemeTemplate) => {
    try {
      const response = await fetch(template.url);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const imageData = await toBase64(blob);
      setOriginalImage(imageData);
      resetState();
    } catch (err) {
      console.error(err);
      setError(`Failed to load template: ${template.name}. Please try another one.`);
    }
  }, []);

  const handleGenerateCaptions = useCallback(async () => {
    if (!originalImage) return;
    setIsLoadingCaptions(true);
    setError(null);
    setCaptions([]);
    try {
      const generated = await generateCaptions(originalImage.data, originalImage.mimeType);
      setCaptions(generated);
    } catch (err) {
      console.error(err);
      setError('Could not generate captions. The AI might be camera shy. Please try again.');
    } finally {
      setIsLoadingCaptions(false);
    }
  }, [originalImage]);

  const handleImageEdit = useCallback(async (prompt: string) => {
    if (!originalImage) return;
    setIsEditingImage(true);
    setError(null);
    try {
      const newImageData = await editImage(originalImage.data, originalImage.mimeType, prompt);
      setEditedImage(newImageData);
    } catch (err) {
      console.error(err);
      setError('Could not edit the image. The AI is having a creative block. Please try again.');
    } finally {
      setIsEditingImage(false);
    }
  }, [originalImage]);
  
  const displayImage = editedImage ? `data:image/png;base64,${editedImage}` : (originalImage ? `data:${originalImage.mimeType};base64,${originalImage.data}` : '');

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col items-center justify-center bg-gray-800/50 p-4 rounded-2xl border border-gray-700 min-h-[300px] lg:min-h-[500px] sticky top-8 self-start">
            <MemeCanvas 
              imageSrc={displayImage} 
              caption={selectedCaption}
              isLoading={isEditingImage}
              ref={memeCanvasRef}
            />
          </div>
          <div className="flex flex-col gap-8">
            <ImageSelector 
              onImageSelect={handleImageSelect} 
              onTemplateSelect={handleTemplateSelect} 
              disabled={isLoadingCaptions || isEditingImage}
            />
            
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
                <strong className="font-bold">Oops! </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {originalImage && (
              <div className="flex flex-col gap-6 p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                <h2 className="text-xl font-bold text-cyan-300">2. Generate Captions</h2>
                <button
                  onClick={handleGenerateCaptions}
                  disabled={isLoadingCaptions || isEditingImage}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-cyan-500 text-gray-900 font-bold rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  <MagicWandIcon />
                  {isLoadingCaptions ? 'Conjuring witty captions...' : 'Magic Caption'}
                </button>

                <CaptionSuggestions 
                  captions={captions}
                  onSelect={setSelectedCaption}
                  isLoading={isLoadingCaptions}
                  selectedCaption={selectedCaption}
                />
              </div>
            )}

            {selectedCaption && (
               <ImageEditor 
                onSubmit={handleImageEdit}
                isLoading={isEditingImage}
               />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
