import React from "react";

type Props = {
  onAllow: () => void;
  onSkip: () => void;
};

export default function LocationStep({ onAllow, onSkip }: Props) {
  return (
    <>
      <div className="text-4xl mb-3">📍</div>
      <h2 className="font-space-grotesk font-bold text-xl mb-2">To show what’s happening around you, we need your location.</h2>
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-lg text-[#A259FF]">🛡️</span>
        <span className="text-lg text-[#A259FF]">🔒</span>
        <span className="text-sm text-[#555]">We only access your location while you're using the app. Never stored, never shared.</span>
      </div>
      {/* Map preview with animated pin */}
      <div className="w-[220px] h-[120px] mx-auto mb-4 relative bg-gradient-to-r from-[#F8FAFF] to-[#A259FF22] rounded-2xl overflow-hidden flex items-center justify-center">
        {/* Simple SVG map lines */}
        <svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0">
          <rect x="10" y="20" width="200" height="80" rx="16" fill="#E9E6F7" />
          <path d="M30 60 Q60 40 110 60 T190 60" stroke="#A259FF" strokeWidth="2" fill="none" />
          <circle cx="60" cy="60" r="6" fill="#A259FF" opacity="0.2" />
          <circle cx="160" cy="70" r="5" fill="#A259FF" opacity="0.2" />
        </svg>
        {/* Animated pin */}
        <div className="absolute left-[100px] top-10 z-10">
          <div className="w-6 h-6 flex items-center justify-center animate-bounce">
            <span className="text-2xl">📍</span>
          </div>
        </div>
      </div>
      <button
        onClick={onAllow}
        className="mt-8 px-8 py-3 text-lg font-bold rounded-xl border-none bg-gradient-to-r from-[#A259FF] to-[#4A00E0] text-white shadow-md cursor-pointer transition-colors mb-4"
      >
        Enable Location Access
      </button>
      <button
        onClick={onSkip}
        className="text-sm text-[#A259FF] opacity-70 underline cursor-pointer font-medium p-0"
      >
        I’ll do it later
      </button>
      <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } } .animate-bounce { animation: bounce 1.2s infinite; }`}</style>
    </>
  );
} 