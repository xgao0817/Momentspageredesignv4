import { motion } from 'motion/react';
import { Sparkles, Pin, Trash2 } from 'lucide-react';
import { Badge } from './ui/badge';

interface MomentCardProps {
  title: string;
  date: string;
  actionCount?: number;
  status?: string;
  recentAction?: string;
  isSelected?: boolean;
  isAiGenerated?: boolean;
  isPinned?: boolean;
  showActions?: boolean;
  onClick?: () => void;
  onPin?: () => void;
  onDelete?: () => void;
}

export function MomentCard({
  title,
  date,
  actionCount,
  status,
  recentAction,
  isSelected = false,
  isAiGenerated = false,
  isPinned = false,
  showActions = true,
  onClick,
  onPin,
  onDelete
}: MomentCardProps) {
  return (
    <motion.div
      className={`
        group relative min-h-[56px] px-3 py-2 cursor-pointer transition-all
        ${isSelected 
          ? 'bg-[#CED9CA] border border-[#A8B5A1]/70 rounded-lg' 
          : 'bg-transparent hover:bg-[#F0EFF2]/50 border-b border-[#DDE3DA]/40 hover:border-[#B0BFA8]/50'
        }
      `}
      style={isSelected ? { boxShadow: '0 2px 10px rgba(159, 168, 150, 0.35), 0 1px 4px rgba(159, 168, 150, 0.2)' } : {}}
      onClick={onClick}
    >
      {/* Line 1: Title with actions */}
      <div className="flex items-start justify-between gap-1.5 mb-0.5">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <h4 className="text-sm truncate text-[#3D3D3D] flex-1">{title}</h4>
          {isAiGenerated && (
            <Sparkles size={11} className="flex-shrink-0 text-[#9FA896] mt-0.5" />
          )}
        </div>
        {showActions && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPin?.();
              }}
              className={`p-1 rounded hover:bg-white transition-colors ${
                isPinned ? 'text-[#697768]' : 'text-[#8B8680] hover:text-[#697768]'
              }`}
              title={isPinned ? "Unpin" : "Pin"}
            >
              <Pin size={12} strokeWidth={2} fill={isPinned ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="p-1 rounded hover:bg-white text-[#8B8680] hover:text-[#9B6B5C] transition-colors"
              title="Delete"
            >
              <Trash2 size={12} strokeWidth={2} />
            </button>
          </div>
        )}
      </div>
      
      {/* Line 2: Date only */}
      <div className="flex items-center justify-between text-xs text-[#8B8680]">
        <span className="truncate">{date}</span>
      </div>
    </motion.div>
  );
}
