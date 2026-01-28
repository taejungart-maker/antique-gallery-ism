import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminFABProps {
  onClick: () => void;
}

export function AdminFAB({ onClick }: AdminFABProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-2xl flex items-center justify-center z-40 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
    </motion.button>
  );
}