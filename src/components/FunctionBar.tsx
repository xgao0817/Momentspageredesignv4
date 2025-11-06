import { motion } from 'motion/react';
import { 
  Bold, 
  Italic, 
  List, 
  Link2, 
  Image, 
  FileText, 
  Mic, 
  MessageCircle, 
  Sparkles,
  Undo2,
  Redo2
} from 'lucide-react';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export function FunctionBar() {
  const IconButton = ({ 
    icon: Icon, 
    label, 
    shortcut 
  }: { 
    icon: any; 
    label: string;
    shortcut?: string;
  }) => (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="p-2 rounded-lg hover:bg-white/80 transition-all text-[#3D3D3D] hover:text-[#697768] h-9 w-9 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#697768] focus-visible:outline-offset-2"
            aria-label={label}
          >
            <Icon size={16} strokeWidth={2} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-2">
            <span>{label}</span>
            {shortcut && (
              <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 rounded">{shortcut}</kbd>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <motion.div
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.12 }}
      className="inline-flex items-center gap-1 px-3 py-1 rounded-[22px] bg-white/90 backdrop-blur-md border border-[rgba(164,150,137,0.25)] shadow-[0_8px_24px_rgba(105,119,104,0.12)]"
      style={{ height: '44px' }}
    >
      {/* Group 1: Text style (icons 1-3) */}
      <div className="flex items-center gap-2">
        <IconButton icon={Bold} label="Bold" shortcut="⌘B" />
        <IconButton icon={Italic} label="Italic" shortcut="⌘I" />
        <IconButton icon={List} label="Bullet list" shortcut="⌘⇧8" />
      </div>
      
      {/* Separator 1 */}
      <div className="w-px h-6 bg-[rgba(164,150,137,0.25)] mx-1" />
      
      {/* Group 2: Insert (icons 4-7) */}
      <div className="flex items-center gap-2">
        <IconButton icon={Link2} label="Insert link" shortcut="⌘K" />
        <IconButton icon={Image} label="Insert photo" />
        <IconButton icon={FileText} label="Insert file" />
        <IconButton icon={Mic} label="Voice note" />
      </div>
      
      {/* Separator 2 */}
      <div className="w-px h-6 bg-[rgba(164,150,137,0.25)] mx-1" />
      
      {/* Group 3: AI tools (icons 8-9) */}
      <div className="flex items-center gap-2">
        <IconButton icon={MessageCircle} label="Open Mira" shortcut="⌘/" />
        <IconButton icon={Sparkles} label="Insert AI Card" shortcut="⌥A" />
      </div>
      
      {/* Separator 3 */}
      <div className="w-px h-6 bg-[rgba(164,150,137,0.25)] mx-1" />
      
      {/* Group 4: Utility (icons 10-11) */}
      <div className="flex items-center gap-2">
        <IconButton icon={Undo2} label="Undo" shortcut="⌘Z" />
        <IconButton icon={Redo2} label="Redo" shortcut="⌘⇧Z" />
      </div>
    </motion.div>
  );
}
