import { ChevronRight, ChevronsDown, ChevronsUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  accentColor?: 'pinned' | 'recent' | 'categories' | 'interest' | 'themes' | 'ai-generated';
  showExpandAll?: boolean;
  isExpandedAll?: boolean;
  onExpandAll?: () => void;
  isSubSection?: boolean;
  onCollapseToggle?: (isCollapsed: boolean) => void;
}

export function SidebarSection({ 
  title, 
  children, 
  defaultOpen = true,
  accentColor,
  showExpandAll = false,
  isExpandedAll = false,
  onExpandAll,
  isSubSection = false,
  onCollapseToggle
}: SidebarSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    // For pinned/recent sections, notify parent about collapse state
    if (onCollapseToggle) {
      onCollapseToggle(!newIsOpen);
    }
  };

  const getIcon = () => {
    // For subsections, use rotating chevron
    if (isSubSection) {
      return (
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <ChevronRight size={12} strokeWidth={2} className="opacity-40" />
        </motion.div>
      );
    }
    // For main sections, also use rotating chevron
    return (
      <motion.div
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <ChevronRight size={12} strokeWidth={2} className="opacity-50" />
      </motion.div>
    );
  };

  const getColorStyles = () => {
    switch (accentColor) {
      case 'pinned':
        return {
          text: 'text-[#6B7869]',
          bg: 'bg-[#E0E5DD]',
          border: 'border-l-[#697768]'
        };
      case 'recent':
        return {
          text: 'text-[#6B7869]',
          bg: 'bg-[#E0E5DD]',
          border: 'border-l-[#9FA896]'
        };
      case 'categories':
        return {
          text: 'text-[#6B7869]',
          bg: 'bg-[#E0E5DD]',
          border: 'border-l-[#A8B5A1]'
        };
      case 'interest':
        return {
          text: 'text-[#3A4C44]',
          bg: 'bg-[#E8F3EC]/80',
          border: 'border-l-[#697768]'
        };
      case 'themes':
        return {
          text: 'text-[#6B5843]',
          bg: 'bg-[#F5EFE3]/80',
          border: 'border-l-[#B8956A]'
        };
      case 'ai-generated':
        return {
          text: 'text-[#5B6C5A]',
          bg: 'bg-[#EAF0E8]/80',
          border: 'border-l-[#9FA896]'
        };
      default:
        return {
          text: 'text-[#8B8680]',
          bg: 'bg-white/30',
          border: 'border-l-[#DDE3DA]'
        };
    }
  };

  const { text, bg, border } = getColorStyles();

  return (
    <div className={isSubSection ? "mb-2" : "mb-3"}>
      <button
        onClick={handleToggle}
        className={
          isSubSection 
            ? `group flex items-center justify-between w-full px-3 py-1 text-xs ${text} hover:opacity-80 transition-all mb-1`
            : `group flex items-center justify-between w-full px-3 py-1.5 text-xs uppercase tracking-wider ${text} hover:opacity-90 transition-all rounded-lg ${bg} border-l-4 ${border} mb-1.5`
        }
        style={isSubSection ? {} : { boxShadow: '0 1px 2px rgba(105, 119, 104, 0.06)' }}
        title={!isOpen ? `Expand ${title}` : `Collapse ${title}`}
      >
        <span className={isSubSection ? "font-bold" : "font-bold"}>
          {isSubSection && "– "}
          {title}
        </span>
        <span className="ml-auto">{getIcon()}</span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-0">
              {children}
              
              {/* View All button for pinned/recent sections */}
              {showExpandAll && !isExpandedAll && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onExpandAll?.();
                  }}
                  className="w-full px-3 py-2 text-xs text-[#697768] hover:text-[#6B7869] hover:bg-[#E0E5DD]/50 rounded-lg transition-all text-left font-medium"
                >
                  View All
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
