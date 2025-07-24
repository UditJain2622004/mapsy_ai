import { motion } from "framer-motion";

export default function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ width: '100%', height: 6, background: '#eee', borderRadius: 3, marginBottom: 32 }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${((step + 1) / total) * 100}%` }}
        transition={{ duration: 0.5 }}
        style={{ height: 6, background: 'linear-gradient(90deg, #A259FF, #4A00E0)', borderRadius: 3 }}
      />
    </div>
  );
} 