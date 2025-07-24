import React from "react";

export default function WelcomeStep({ onNext, onSkip, step = 1, totalSteps = 4 }: { onNext: () => void; onSkip: () => void; step?: number; totalSteps?: number }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center bg-gradient-to-br from-[#F8FAFF] via-[#A259FF] to-[#4A00E0] overflow-x-hidden">
      {/* Progress bar with dots at the very top */}
      <div className="w-full flex flex-col items-center pt-6">
        <div className="flex items-center gap-2 mb-1">
          {[...Array(totalSteps)].map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full ${i < step ? 'bg-white' : 'bg-white/30'} transition-all`}
            />
          ))}
        </div>
        <span className="text-xs text-white/80">Step {step} of {totalSteps}</span>
      </div>
      {/* Skip for now */}
      <button
        onClick={onSkip}
        className="absolute top-6 right-8 text-sm text-white/80 hover:underline z-10"
      >
        Skip for now
      </button>
      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        {/* Hero image placeholder */}
        <div className="w-[340px] h-[340px] rounded-3xl bg-gradient-to-br from-[#A259FF] to-[#4A00E0] flex items-center justify-center mb-10 shadow-2xl relative">
          {/* Replace below with your SVG or Lottie if available */}
          <svg width="220" height="220" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="180" height="180" rx="36" fill="#7C3AED" fillOpacity="0.7" />
            <circle cx="90" cy="90" r="60" fill="#A259FF" fillOpacity="0.3" />
            <circle cx="90" cy="90" r="40" fill="#fff" fillOpacity="0.08" />
            <path d="M90 120c-12-20-30-20-30-40a30 30 0 1160 0c0 20-18 20-30 40z" fill="#fff" fillOpacity="0.18" />
            <circle cx="90" cy="70" r="6" fill="#fff" />
            <circle cx="120" cy="100" r="4" fill="#fff" />
            <circle cx="60" cy="110" r="3" fill="#fff" />
          </svg>
          {/* Pin icons */}
          <span className="absolute left-10 top-10 text-3xl">📍</span>
          <span className="absolute right-10 top-16 text-2xl">📍</span>
          <span className="absolute left-16 bottom-10 text-xl">📍</span>
          <span className="absolute right-14 bottom-14 text-xl">📍</span>
        </div>
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-6 leading-tight text-white">
          Never miss something <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">amazing</span> again ✨
        </h1>
        {/* Subheadline */}
        <p className="text-2xl text-center text-white mb-8 font-medium">
          Discover hidden events, local offers, and cool places<br />
          around you — based on what <span className="font-bold text-yellow-300 italic">*you*</span> love <span className="align-middle">🎯</span>
        </p>
        {/* CTA */}
        <button
          onClick={onNext}
          className="mt-2 px-10 py-4 text-xl font-bold rounded-2xl border-none bg-white text-[#A259FF] shadow-lg hover:bg-[#F8FAFF] transition-colors flex items-center gap-2"
        >
          Get Started <span className="ml-1">🚀</span>
        </button>
      </div>
      {/* Footer */}
      <div className="w-full flex flex-col items-center pb-6">
        <div className="flex items-center gap-8 text-white/80 text-lg mb-1">
          <span className="flex items-center gap-1"><span className="text-yellow-300">★</span> 4.9 rating</span>
          <span className="flex items-center gap-1"><span className="text-blue-200">👥</span> 50k+ users</span>
          <span className="flex items-center gap-1"><span className="text-green-200">🛡️</span> Privacy first</span>
        </div>
        <div className="text-base text-white/60 flex items-center gap-1">
          <span>👆</span> Tap to continue your journey
        </div>
      </div>
    </div>
  );
} 