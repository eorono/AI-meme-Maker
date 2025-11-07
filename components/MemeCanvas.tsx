
import React, { forwardRef } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface MemeCanvasProps {
  imageSrc: string;
  caption: string;
  isLoading: boolean;
}

const MemeCanvas = forwardRef<HTMLDivElement, MemeCanvasProps>(({ imageSrc, caption, isLoading }, ref) => {
  return (
    <div ref={ref} className="w-full max-w-lg aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
      {imageSrc ? (
        <>
          <img src={imageSrc} alt="Meme preview" className="max-h-full max-w-full object-contain" />
          {caption && (
            <p 
              className="absolute bottom-4 left-4 right-4 text-center text-white text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase break-words"
              style={{ textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 0px 0 #000, -2px 0px 0 #000, 0px 2px 0 #000, 0px -2px 0 #000' }}
            >
              {caption}
            </p>
          )}
          {isLoading && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10">
              <LoadingSpinner />
              <p className="text-white mt-4 text-lg">AI is remastering your image...</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-gray-400 text-center p-4">
          <p>Your masterpiece will appear here.</p>
          <p className="text-sm">Start by uploading an image or choosing a template.</p>
        </div>
      )}
    </div>
  );
});

export default MemeCanvas;
