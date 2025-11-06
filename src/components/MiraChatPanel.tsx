import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, Target, Rocket, Building, Send, Sparkles, PenLine, FileText, Folder, CheckSquare } from 'lucide-react';
import { MiraAvatar } from './MiraAvatar';
import { ScrollArea } from './ui/scroll-area';
import { useState } from 'react';

type ItemType = 'moment' | 'note' | 'project' | 'task';

interface Message {
  id: string;
  sender: 'user' | 'mira';
  content: string;
  context?: string;
  contextType?: ItemType;
}

// Helper function to get icon based on type
const getTypeIcon = (type?: ItemType) => {
  switch (type) {
    case 'moment':
      return PenLine;
    case 'note':
      return FileText;
    case 'project':
      return Folder;
    case 'task':
      return CheckSquare;
    default:
      return PenLine;
  }
};

export function MiraChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'mira',
      content: 'Hi! I noticed you\'re working on your cooking diary. Would you like me to help organize your recipes into categories?',
      context: 'Cooking Diary',
      contextType: 'moment'
    },
    {
      id: '2',
      sender: 'user',
      content: 'Yes, that would be great!'
    },
    {
      id: '3',
      sender: 'mira',
      content: 'Perfect! I\'ve added an AI card with a suggested next step to your moment. You can add it to your to-do list with one click.'
    },
    {
      id: '4',
      sender: 'user',
      content: 'Can you also suggest some Mediterranean recipes I should try?'
    },
    {
      id: '5',
      sender: 'mira',
      content: 'Absolutely! Based on your pesto experience, I\'d recommend trying Greek Tzatziki sauce, Turkish Muhammara (roasted red pepper dip), or a classic Italian Caprese salad. All use fresh herbs and simple ingredients!'
    },
    {
      id: '6',
      sender: 'user',
      content: 'The Muhammara sounds interesting!'
    },
    {
      id: '7',
      sender: 'mira',
      content: 'Great choice! Muhammara is a delicious Syrian/Turkish dip made with roasted red peppers, walnuts, pomegranate molasses, and spices. Would you like me to create a new moment for this recipe?'
    },
    {
      id: '8',
      sender: 'user',
      content: 'Yes please! And can you add it to my cooking project?'
    },
    {
      id: '9',
      sender: 'mira',
      content: 'Done! I\'ve created a new moment called "Muhammara Recipe" and added it to your Mediterranean Cooking project. I\'ve also added a shopping list card with the ingredients you\'ll need. Check it out!'
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [miraState, setMiraState] = useState<'idle' | 'thinking' | 'speaking'>('idle');
  const [showFeedback, setShowFeedback] = useState(false);

  const handleGenerate = (type: string) => {
    setMiraState('thinking');
    setShowFeedback(true);
    
    // Simulate card insertion
    setTimeout(() => {
      setMessages([...messages, {
        id: Date.now().toString(),
        sender: 'mira',
        content: `I've added a ${type} suggestion to your moment. Check it out!`
      }]);
      setMiraState('idle');
      setTimeout(() => setShowFeedback(false), 3000);
    }, 1000);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue
    }]);
    setInputValue('');
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#F3F0E5]/90 via-white/60 to-[#E0E5DD]/70 backdrop-blur-xl rounded-2xl border border-[#DDE3DA]/60 shadow-lg shadow-[#697768]/5">
      {/* Decorative gradient bar */}
      <div className="h-1 bg-gradient-to-r from-[#9FA896] via-[#A8B5A1] to-[#D4C4B0]" />
      
      {/* Header */}
      <div className="relative px-5 py-4 border-b border-[#DDE3DA]/50 bg-white/30 flex-shrink-0">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#A8B5A1]/5 to-transparent pointer-events-none" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <MiraAvatar state={miraState} size={32} />
              {/* Active indicator */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#9FA896] rounded-full border-2 border-white"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-[#3D3D3D] font-semibold">Mira</h3>
                <Sparkles size={13} className="text-[#9FA896]" strokeWidth={2} />
              </div>
              <p className="text-xs text-[#8B8680]">Your AI Collaborator</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-xl hover:bg-white/60 transition-all text-[#8B8680] hover:text-[#697768] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#697768]">
              <Maximize2 size={15} strokeWidth={2} />
            </button>
            <button className="p-2 rounded-xl hover:bg-white/60 transition-all text-[#8B8680] hover:text-[#9B6B5C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#697768]">
              <X size={15} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area - with proper overflow */}
      <div className="flex-1 min-h-0 relative">
        <ScrollArea className="h-full">
          <div className="px-5 py-4 space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <div key={message.id} className="space-y-2.5">
                  {message.context && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex justify-center"
                    >
                      <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-[#A8B5A1]/20 to-[#D4C4B0]/20 text-[#697768] border border-[#B0BFA8]/40 font-medium shadow-sm flex items-center gap-1.5">
                        {(() => {
                          const IconComponent = getTypeIcon(message.contextType);
                          return <IconComponent size={12} strokeWidth={2} className="flex-shrink-0" />;
                        })()}
                        {message.context}
                      </span>
                    </motion.div>
                  )}
                  
                  <motion.div
                    initial={{ scale: 0.96, opacity: 0, y: 8 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={`
                      flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}
                    `}
                  >
                    <div
                      className={`
                        max-w-[82%] px-4 py-3 rounded-2xl text-sm relative
                        ${message.sender === 'mira' 
                          ? 'bg-gradient-to-br from-[#E0E5DD] to-[#F3F0E5]/70 border border-[#B0BFA8]/30 shadow-sm' 
                          : 'bg-white/90 border border-[#DDE3DA]/40 shadow-md'
                        }
                      `}
                    >
                      {/* Subtle shine effect for Mira's messages */}
                      {message.sender === 'mira' && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl pointer-events-none" />
                      )}
                      <p className="text-[#3D3D3D] leading-relaxed relative z-10">{message.content}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>

      {/* Feedback message */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="px-5 py-3 bg-gradient-to-r from-[#A8B5A1]/15 to-[#D4C4B0]/10 border-t border-[#B0BFA8]/30 flex-shrink-0"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#9FA896] rounded-full animate-pulse" />
              <p className="text-xs text-[#697768] font-medium">✨ Added a next step to your Moment</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="p-5 border-t border-[#DDE3DA]/50 bg-gradient-to-br from-white/50 to-[#E0E5DD]/40 backdrop-blur-sm flex-shrink-0">
        {/* Single action button */}
        <div className="mb-3">
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGenerate('next-step')}
            className="w-full flex items-center justify-center gap-2 px-4 h-10 rounded-xl bg-gradient-to-r from-[#697768] to-[#9FA896] hover:shadow-lg hover:shadow-[#697768]/30 transition-all text-sm text-white font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#697768] focus-visible:outline-offset-2 shadow-md"
          >
            <Sparkles size={16} strokeWidth={2.5} />
            <span>Next Step Suggestions</span>
          </motion.button>
        </div>

        {/* Input field - enhanced */}
        <div className="relative group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Ask Mira anything…"
            className="w-full pl-4 pr-11 py-3 rounded-xl bg-white/90 border border-[#DDE3DA]/60 hover:border-[#A8B5A1]/50 focus:outline-none focus:border-[#697768] focus:ring-2 focus:ring-[#697768]/20 focus:bg-white transition-all text-sm text-[#3D3D3D] placeholder:text-[#8B8680] shadow-sm"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-to-br from-[#697768] to-[#9FA896] text-white hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!inputValue.trim()}
          >
            <Send size={14} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
