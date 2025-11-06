import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

interface AiCardProps {
  prefix: string;
  insight: string;
  todoItem: string;
  mode?: 'focus' | 'action';
  onDelete?: () => void;
  onAddTodo?: () => void;
  onClick?: () => void;
  onViewDetails?: () => void;
}

export function AiCard({ 
  prefix, 
  insight, 
  todoItem, 
  mode = 'action',
  onDelete,
  onAddTodo,
  onClick,
  onViewDetails
}: AiCardProps) {
  if (mode === 'focus') return null;

  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -1 }}
      onClick={onClick}
      className="my-4 rounded-xl cursor-pointer border border-[#B0BFA8]/40 bg-gradient-to-br from-[#F3F0E5] to-[#E0E5DD] hover:border-[#A8B5A1]/60 transition-all group relative overflow-hidden shadow-sm hover:shadow-md"
    >
      {/* Left gradient accent strip */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#9FA896] to-[#D4C4B0]" />
      
      <div className="pl-4 pr-3 py-3">
        <div className="flex-1 min-w-0">
          {/* Row 1: Mira prefix with action buttons on the right */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <p className="text-sm text-[#697768] font-medium flex-1 min-w-0">
              {prefix}
            </p>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails?.();
                  // Open in new tab
                  window.open('#', '_blank');
                }}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/60 hover:bg-white border border-[#B0BFA8]/40 hover:border-[#A8B5A1]/60 text-[#697768] hover:text-[#3D3D3D] transition-all"
              >
                View Full
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.();
                }}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/60 hover:bg-[#E5D5C8] border border-[#B0BFA8]/40 hover:border-[#D4C4B0]/60 text-[#8B8680] hover:text-[#9B6B5C] transition-all"
              >
                Dismiss
              </button>
            </div>
          </div>
          
          {/* Row 2: One-line insight */}
          <p className="text-sm text-[#3D3D3D] mb-2.5 leading-relaxed">
            {insight}
          </p>
          
          {/* Row 3: Todo action with Add button */}
          <div className="flex items-center gap-2 bg-white/60 border border-[#B0BFA8]/40 rounded-lg p-3 -mx-1">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-4 h-4 rounded border-2 border-[#A8B5A1] flex-shrink-0" />
              <p className="text-sm text-[#3D3D3D] truncate font-medium">{todoItem}</p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddTodo?.();
              }}
              className="flex-shrink-0 h-9 px-3 rounded-lg border border-[#697768]/40 bg-white hover:bg-gradient-to-r hover:from-[#697768] hover:to-[#9FA896] hover:text-white hover:border-transparent transition-all text-[#697768] text-sm font-medium flex items-center gap-1.5 shadow-sm"
              title="Add to To-Do"
            >
              <Plus size={14} strokeWidth={2.5} />
              <span>Add to To-Do</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
