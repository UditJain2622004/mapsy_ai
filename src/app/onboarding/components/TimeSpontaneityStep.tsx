import React from "react";

type Props = {
  time: number;
  setTime: (val: number) => void;
  spontaneity: string;
  setSpontaneity: (val: string) => void;
  onNext: () => void;
  onSkip: () => void;
};

const spontaneityOptions = [
  { value: 'very', label: 'Very spontaneous', emoji: '🟢' },
  { value: 'curious', label: 'Curious explorer', emoji: '🟡' },
  { value: 'planner', label: 'Planner', emoji: '🔴' },
];

export default function TimeSpontaneityStep({ time, setTime, spontaneity, setSpontaneity, onNext, onSkip }: Props) {
  return (
    <>
      <div className="text-4xl mb-3">⏳</div>
      <h2 className="font-space-grotesk font-bold text-2xl mb-2">How do you like to explore?</h2>
      <p className="text-base mb-4">Tell us how much time you usually have to discover things nearby.</p>
      <div className="mb-6">
        <div className="font-semibold mb-2">How much time do you usually have?</div>
        <input
          type="range"
          min={15}
          max={180}
          step={15}
          value={time}
          onChange={e => setTime(Number(e.target.value))}
          className="w-56 accent-[#A259FF]"
        />
        <div className="mt-1 font-medium text-[#A259FF]">
          {time < 60
            ? `${time} mins`
            : `${Math.floor(time / 60)} hr${Math.floor(time / 60) > 1 ? 's' : ''}${time % 60 ? ` ${time % 60} mins` : ''}`}
        </div>
        <div className="text-sm text-[#6B4EFF] mt-1">We’ll show you things that fit your free time.</div>
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-2">How spontaneous are you?</div>
        <div className="flex gap-3 justify-center">
          {spontaneityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSpontaneity(option.value)}
              className={`px-5 py-3 text-base rounded-xl font-semibold flex items-center gap-2 border transition-all duration-200 ${spontaneity === option.value ? 'border-[#A259FF] bg-gradient-to-r from-[#A259FF22] to-[#4A00E022]' : 'border-[#eee] bg-white'}`}
            >
              <span className="text-lg">{option.emoji}</span> {option.label}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={onNext}
        className={`mt-8 px-8 py-3 text-lg font-bold rounded-xl border-none bg-gradient-to-r from-[#A259FF] to-[#4A00E0] text-white shadow-md transition-colors mb-4 ${(!spontaneity && !time) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={!spontaneity && !time}
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