import React from "react";

type Interest = { value: string; label: string; emoji: string; bg: string };

type Props = {
  interestOptions: Interest[];
  selectedInterests: string[];
  toggleInterest: (val: string) => void;
  addCustomInterest: () => void;
  onNext: () => void;
  onSkip: () => void;
};

export default function InterestStep({ interestOptions, selectedInterests, toggleInterest, addCustomInterest, onNext, onSkip }: Props) {
  return (
    <>
      <div className="text-4xl mb-3">🧩</div>
      <h2 className="font-space-grotesk font-bold text-2xl mb-2">What are you into?</h2>
      <p className="text-base mb-4">Choose your favorite topics — we’ll use these to recommend events, offers, and places you’ll love.</p>
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        {interestOptions.map((interest) => {
          const selected = selectedInterests.includes(interest.value);
          return (
            <button
              key={interest.value}
              onClick={() => toggleInterest(interest.value)}
              className={`px-5 py-3 text-lg rounded-2xl font-semibold min-w-[60px] flex items-center gap-2 relative transition-all duration-200 ${selected ? 'bg-gradient-to-r from-[#A259FF] to-[#4A00E0] text-white shadow-lg scale-105' : ''}`}
              style={!selected ? { background: interest.bg, color: '#222', boxShadow: '0 1px 4px #eee' } : {}}
            >
              <span className="text-xl">{interest.emoji}</span> {interest.label}
              {selected && (
                <span className="absolute top-1 right-2 text-base bg-white rounded-full text-[#A259FF] shadow px-1 transition-opacity">✔️</span>
              )}
            </button>
          );
        })}
        <button
          onClick={addCustomInterest}
          className="px-5 py-3 text-lg rounded-2xl font-semibold min-w-[60px] flex items-center gap-2 border-2 border-dashed border-[#A259FF] bg-[#F8FAFF] text-[#A259FF] transition-colors"
        >
          ➕ Add Custom Interest
        </button>
      </div>
      <button
        onClick={onNext}
        className={`mt-8 px-8 py-3 text-lg font-bold rounded-xl border-none bg-gradient-to-r from-[#A259FF] to-[#4A00E0] text-white shadow-md transition-colors mb-4 ${selectedInterests.length < 3 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={selectedInterests.length < 3}
      >
        Continue
      </button>
      <button
        onClick={onSkip}
        className="text-sm text-[#A259FF] opacity-70 underline cursor-pointer font-medium p-0"
      >
        Skip this
      </button>
    </>
  );
} 