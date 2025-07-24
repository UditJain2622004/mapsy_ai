import React, { useState, useEffect } from "react";

type Props = {
  open: boolean;
  onAdd: (val: string) => void;
  onClose: () => void;
};

export default function CustomInterestModal({ open, onAdd, onClose }: Props) {
  const [value, setValue] = useState("");
  useEffect(() => { if (open) setValue(""); }, [open]);
  if (!open) return null;
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/20 z-[1000] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 min-w-[320px] flex flex-col items-center">
        <div className="font-bold text-xl mb-4 text-[#A259FF]">Add Custom Interest</div>
        <input
          autoFocus
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Type your interest..."
          className="px-4 py-3 rounded-lg border-2 border-[#A259FF] text-base w-full mb-5 outline-none"
        />
        <div className="flex gap-3 w-full justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#eee] text-[#555] font-semibold text-base cursor-pointer"
          >Cancel</button>
          <button
            onClick={() => { if (value.trim()) { onAdd(value.trim()); }}}
            className={`px-5 py-2 rounded-lg bg-gradient-to-r from-[#A259FF] to-[#4A00E0] text-white font-bold text-base cursor-pointer transition-opacity ${!value.trim() ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={!value.trim()}
          >Add</button>
        </div>
      </div>
    </div>
  );
} 