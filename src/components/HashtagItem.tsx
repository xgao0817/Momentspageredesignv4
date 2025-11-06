import { motion } from 'motion/react';
import { Sparkles, Pin, Trash2, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { useState } from 'react';

// 大地色系色调调色板
const hashtagColors = [
  '#9B6B5C', // 陶土橙
  '#697768', // 森林绿
  '#B8956A', // 黄铜金
  '#A68B6A', // 赭石色
  '#7B8B6F', // 橄榄绿
  '#6B7B8B', // 蓝灰色
  '#8B7355', // 暖棕色
  '#9FA896', // 鼠尾草绿
  '#A07B6B', // 粉土色
  '#6B8E7F', // 海泡石绿
];

// 基于hashtag名称生成一致的颜色
function getHashtagColor(hashtag: string): string {
  const cleanTag = hashtag.replace('#', '');
  let hash = 0;
  for (let i = 0; i < cleanTag.length; i++) {
    hash = cleanTag.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % hashtagColors.length;
  return hashtagColors[index];
}

interface Moment {
  title: string;
  date: string;
  actionCount?: number;
}

interface HashtagItemProps {
  hashtag: string;
  moments?: Moment[];
  isAiGenerated?: boolean;
  onClick?: () => void;
  onPin?: () => void;
  onDelete?: () => void;
}

export function HashtagItem({
  hashtag,
  moments = [],
  isAiGenerated = false,
  onClick,
  onPin,
  onDelete
}: HashtagItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-0.5">
      {/* Hashtag Header */}
      <div className="group rounded-lg hover:bg-[#F0EFF2]/60 transition-all overflow-hidden">
        <div 
          className="px-3 py-1.5 flex items-center justify-between gap-1.5 cursor-pointer"
          onClick={() => {
            setIsExpanded(!isExpanded);
            onClick?.();
          }}
        >
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <span className="text-xs font-medium italic truncate">
              <span style={{ color: getHashtagColor(hashtag) }}>#</span>
              <span className="text-[#3D3D3D]"> {hashtag.replace('#', '')}</span>
            </span>
            <span className="text-xs text-[#8B8680]">({moments.length})</span>
          </div>
          {moments.length > 0 && (
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="flex-shrink-0"
            >
              <ChevronRight size={12} strokeWidth={2} className="opacity-40 text-[#8B8680]" />
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Moments List - styled like MomentCard */}
      {isExpanded && moments.length > 0 && (
        <div className="space-y-0">
          {moments.map((moment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="group relative min-h-[64px] px-3 py-2.5 rounded-lg cursor-pointer transition-all bg-transparent hover:bg-[#F0EFF2]/50 border border-[#DDE3DA]/40 hover:border-[#B0BFA8]/50"
            >
              {/* Line 1: Title with actions */}
              <div className="flex items-start justify-between gap-1.5 mb-1">
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <h4 className="text-sm truncate text-[#3D3D3D] flex-1">{moment.title}</h4>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPin?.();
                    }}
                    className="p-1 rounded hover:bg-white text-[#8B8680] hover:text-[#697768] transition-colors"
                    title="Pin"
                  >
                    <Pin size={12} strokeWidth={2} />
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
              </div>
              
              {/* Line 2: Date only */}
              <div className="flex items-center justify-between text-xs text-[#8B8680]">
                <span className="truncate">{moment.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
