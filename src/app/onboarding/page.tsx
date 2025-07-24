"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import WelcomeStep from "./components/WelcomeStep";
import InterestStep from "./components/InterestStep";
import TimeSpontaneityStep from "./components/TimeSpontaneityStep";
import LocationStep from "./components/LocationStep";
import CalendarNotificationStep from "./components/CalendarNotificationStep";
import CustomInterestModal from "./components/CustomInterestModal";
import ProgressBar from "./ProgressBar";

const interestOptions = [
  { value: 'car', label: 'Car Racing', emoji: '🏎', bg: 'linear-gradient(90deg, #F8D800 60%, #FDEB71 100%)' },
  { value: 'food', label: 'Food & Restaurants', emoji: '🍜', bg: 'linear-gradient(90deg, #FFB6C1 60%, #FFD6E0 100%)' },
  { value: 'music', label: 'Live Music', emoji: '🎵', bg: 'linear-gradient(90deg, #A259FF 60%, #C2A0FD 100%)' },
  { value: 'architecture', label: 'Architecture', emoji: '🏛', bg: 'linear-gradient(90deg, #B2F7EF 60%, #E0F9FF 100%)' },
  { value: 'art', label: 'Art & Culture', emoji: '🎨', bg: 'linear-gradient(90deg, #FFB347 60%, #FFD580 100%)' },
  { value: 'shopping', label: 'Shopping', emoji: '🛍️', bg: 'linear-gradient(90deg, #FDCB82 60%, #FFF6E0 100%)' },
  { value: 'adventure', label: 'Adventures', emoji: '🧗', bg: 'linear-gradient(90deg, #A0E7E5 60%, #B4F8C8 100%)' },
  { value: 'gems', label: 'Local Hidden Gems', emoji: '✨', bg: 'linear-gradient(90deg, #FEC8D8 60%, #FFDFD3 100%)' },
];

const TOTAL_STEPS = 5;

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [spontaneity, setSpontaneity] = useState<string>("");
  const [locationGranted, setLocationGranted] = useState<boolean>(false);
  const router = useRouter();
  const [customInterests, setCustomInterests] = useState<string[]>([]);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [time, setTime] = useState(60); // default 1 hr
  const [locationReminder, setLocationReminder] = useState(false);
  const [calendarAllowed, setCalendarAllowed] = useState(false);
  const [notifyAllowed, setNotifyAllowed] = useState(false);

  // Handlers
  const toggleInterest = (value: string) => {
    setSelectedInterests((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };
  const addCustomInterest = () => setShowCustomModal(true);
  const handleAddCustomInterest = (interest: string) => {
    setCustomInterests((prev) => [...prev, interest]);
    setSelectedInterests((prev) => [...prev, interest]);
    setShowCustomModal(false);
  };
  const handleNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const handleSkip = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const handleLocation = () => { setLocationGranted(true); handleNext(); };
  const handleLocationSkip = () => { setLocationReminder(true); handleNext(); };
  const handleFinish = () => { router.push("/"); };
  const handleCalendarAllow = () => { setCalendarAllowed(true); handleFinish(); };
  const handleCalendarSkip = () => { setCalendarAllowed(false); handleFinish(); };
  const handleNotifyAllow = () => { setNotifyAllowed(true); handleFinish(); };
  const handleNotifySkip = () => { setNotifyAllowed(false); handleFinish(); };

  // Step content
  let stepContent = null;
  if (step === 0) {
    stepContent = (
      <WelcomeStep onNext={handleNext} onSkip={handleFinish} />
    );
  } else if (step === 1) {
    stepContent = (
      <InterestStep
        interestOptions={[...interestOptions, ...customInterests.map(ci => ({ value: ci, label: ci, emoji: '➕', bg: 'linear-gradient(90deg, #E0C3FC 60%, #8EC5FC 100%)' }))]}
        selectedInterests={selectedInterests}
        toggleInterest={toggleInterest}
        addCustomInterest={addCustomInterest}
        onNext={selectedInterests.length >= 3 ? handleNext : () => {}}
        onSkip={handleSkip}
      />
    );
  } else if (step === 2) {
    stepContent = (
      <TimeSpontaneityStep
        time={time}
        setTime={setTime}
        spontaneity={spontaneity}
        setSpontaneity={setSpontaneity}
        onNext={(spontaneity || time) ? handleNext : () => {}}
        onSkip={handleSkip}
      />
    );
  } else if (step === 3) {
    stepContent = (
      <LocationStep onAllow={handleLocation} onSkip={handleLocationSkip} />
    );
  } else if (step === 4) {
    stepContent = (
      <CalendarNotificationStep
        handleCalendarAllow={handleCalendarAllow}
        handleCalendarSkip={handleCalendarSkip}
        handleNotifyAllow={handleNotifyAllow}
        handleNotifySkip={handleNotifySkip}
      />
    );
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F8FAFF] via-[#A259FF] to-[#4A00E0] font-space-grotesk relative"
    >
      <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }`}</style>
      <CustomInterestModal open={showCustomModal} onAdd={handleAddCustomInterest} onClose={() => setShowCustomModal(false)} />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col items-center justify-center flex-1"
        >
          {stepContent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Onboarding; 