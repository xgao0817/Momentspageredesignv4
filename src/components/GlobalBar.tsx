import { motion } from 'motion/react';
import { Share2, Zap, Focus } from 'lucide-react';

interface GlobalBarProps {
  mode: 'focus' | 'action';
  onModeChange: (mode: 'focus' | 'action') => void;
}

export function GlobalBar({ mode, onModeChange }: GlobalBarProps) {
  return (
    <motion.div
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.12, delay: 0.05 }}
      className="inline-flex items-center gap-3"
    >
      {/* Mode Toggle - Refined Design */}
      <div className="relative inline-flex items-center gap-1.5 px-1.5 py-1.5 rounded-full bg-gradient-to-br from-[#F3F0E5] to-[#E0E5DD] border border-[rgba(164,150,137,0.2)] shadow-sm">
        {/* Sliding background */}
        <motion.div
          className="absolute h-[calc(100%-6px)] rounded-full bg-white shadow-sm border border-[rgba(164,150,137,0.25)]"
          animate={{
            left: mode === 'action' ? '6px' : 'calc(50% + 0px)',
            width: mode === 'action' ? 'calc(50% - 9px)' : 'calc(50% - 9px)'
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
        
        <button
          onClick={() => onModeChange('action')}
          className={`relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
            mode === 'action'
              ? 'text-[#697768]'
              : 'text-[#8B8680] hover:text-[#3D3D3D]'
          }`}
        >
          <Zap size={12} strokeWidth={2.5} />
          <span>Action</span>
        </button>
        
        <button
          onClick={() => onModeChange('focus')}
          className={`relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
            mode === 'focus'
              ? 'text-[#697768]'
              : 'text-[#8B8680] hover:text-[#3D3D3D]'
          }`}
        >
          <Focus size={12} strokeWidth={2.5} />
          <span>Focus</span>
        </button>
      </div>

      <button className="px-4 h-9 rounded-xl bg-gradient-to-r from-[#697768] to-[#9FA896] text-white hover:shadow-lg transition-all flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#697768] focus-visible:outline-offset-2 shadow-sm">
        <Share2 size={16} strokeWidth={2} />
        <span className="text-sm">Share</span>
      </button>
    </motion.div>
  );
}
