import React from "react";

type Props = {
  handleCalendarAllow: () => void;
  handleCalendarSkip: () => void;
  handleNotifyAllow: () => void;
  handleNotifySkip: () => void;
};

export default function CalendarNotificationStep({ handleCalendarAllow, handleCalendarSkip, handleNotifyAllow, handleNotifySkip }: Props) {
  return (
    <div className="flex flex-col gap-6 items-center mb-2">
      {/* Calendar Access Card */}
      <div className="bg-[#F8FAFF] rounded-2xl shadow-md p-6 w-80 flex flex-col items-center mb-2">
        <div className="text-3xl mb-2">📅</div>
        <div className="font-bold text-lg mb-1">Want even smarter suggestions?</div>
        <div className="text-sm text-[#555] mb-4">Let us check your calendar for free time blocks.</div>
        <div className="flex gap-3">
          <button
            onClick={handleCalendarAllow}
            className="px-5 py-2 rounded-lg border-none bg-gradient-to-r from-[#A259FF] to-[#4A00E0] text-white font-bold text-base cursor-pointer"
          >Allow Access</button>
          <button
            onClick={handleCalendarSkip}
            className="px-5 py-2 rounded-lg border-2 border-[#A259FF] bg-transparent text-[#A259FF] font-bold text-base cursor-pointer"
          >No thanks</button>
        </div>
      </div>
      {/* Divider */}
      <div className="font-semibold text-[#A259FF] text-sm my-2">or</div>
      {/* Notifications Card */}
      <div className="bg-[#F8FAFF] rounded-2xl shadow-md p-6 w-80 flex flex-col items-center">
        <div className="text-3xl mb-2">🔔</div>
        <div className="font-bold text-lg mb-1">Get notified when something exciting is happening nearby</div>
        <div className="text-sm text-[#555] mb-4"></div>
        <div className="flex gap-3">
          <button
            onClick={handleNotifyAllow}
            className="px-5 py-2 rounded-lg border-none bg-gradient-to-r from-[#A259FF] to-[#4A00E0] text-white font-bold text-base cursor-pointer"
          >Yes, notify me!</button>
          <button
            onClick={handleNotifySkip}
            className="px-5 py-2 rounded-lg border-2 border-[#A259FF] bg-transparent text-[#A259FF] font-bold text-base cursor-pointer"
          >Maybe later</button>
        </div>
      </div>
    </div>
  );
} 