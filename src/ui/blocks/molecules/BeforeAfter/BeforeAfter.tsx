'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt?: string;
  width?: number;
  height?: number;
  showShutter?: boolean;
  className?: string;
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  alt = 'Before and after comparison',
  width = 600,
  height = 400,
  showShutter = true,
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.preventDefault();
      updatePosition(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && e.touches[0]) {
      updatePosition(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (!showShutter) {
    return (
      <div className={`flex flex-col md:flex-row gap-6 ${className}`}>
        {/* Before */}
        <div className="flex-1">
          <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 shadow-md">
            <Image
              src={beforeImage}
              alt={`${beforeLabel} - ${alt}`}
              width={width}
              height={height}
              className="w-full h-auto object-cover"
              draggable={false}
            />
          </div>
          {beforeLabel && (
            <p className="mt-3 text-sm font-semibold text-center text-gray-600 uppercase tracking-wide">
              {beforeLabel}
            </p>
          )}
        </div>

        {/* After */}
        <div className="flex-1">
          <div className="relative overflow-hidden rounded-lg border-2 border-blue-400 shadow-md">
            <Image
              src={afterImage}
              alt={`${afterLabel} - ${alt}`}
              width={width}
              height={height}
              className="w-full h-auto object-cover"
              draggable={false}
            />
          </div>
          {afterLabel && (
            <p className="mt-3 text-sm font-semibold text-center text-blue-600 uppercase tracking-wide">
              {afterLabel}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} bg-surface ${className}`}
      style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={afterImage}
          alt={`${afterLabel} - ${alt}`}
          width={width}
          height={height}
          priority
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Before Image (Overlay with clip) */}
      <div
        className="absolute inset-0 pointer-events-none transition-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={`${beforeLabel} - ${alt}`}
          width={width}
          height={height}
          priority
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Shutter Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl transition-none z-10"
        style={{
          left: `${sliderPosition}%`,
          transform: 'translateX(-50%)',
        }}
      >
        {/* Handle Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-12 h-12 shadow-2xl flex items-center justify-center border-2 border-gray-200">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Before Label */}
      {beforeLabel && (
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-md text-sm font-semibold pointer-events-none shadow-lg">
          {beforeLabel}
        </div>
      )}

      {/* After Label */}
      {afterLabel && (
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-md text-sm font-semibold pointer-events-none shadow-lg">
          {afterLabel}
        </div>
      )}

      {/* Bottom instruction */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-medium pointer-events-none shadow-lg flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
        <span>Drag to compare</span>
      </div>
    </div>
  );
};

export default BeforeAfter;
