import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, PenLine, FileText, Folder, CheckSquare, MessageCircle, ChevronRight } from 'lucide-react';
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
  contextTime?: string;
  isNewContext?: boolean;
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

export function FloatingMiraChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'mira',
      content: 'Hi! I noticed you\'re working on your cooking diary. Would you like me to help organize your recipes into categories?',
      context: 'Cooking Diary',
      contextType: 'moment',
      contextTime: '2:30 PM',
      isNewContext: true
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
      sender: 'mira',
      content: 'I see you\'ve switched to your Morning Pages. How can I help you with your reflection today?',
      context: 'Morning Pages',
      contextType: 'moment',
      contextTime: '3:45 PM',
      isNewContext: true
    },
    {
      id: '7',
      sender: 'user',
      content: 'Help me organize my thoughts about today\'s goals'
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
    <>
      {/* Toggle Button - Draggable when closed */}
      {!isOpen && (
        <motion.button
          drag
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={{
            left: -((typeof window !== 'undefined' ? window.innerWidth : 1920) - 200),
            right: (typeof window !== 'undefined' ? window.innerWidth : 1920) - 200,
            top: -((typeof window !== 'undefined' ? window.innerHeight : 1080) / 2 - 50),
            bottom: (typeof window !== 'undefined' ? window.innerHeight : 1080) / 2 - 50
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed w-14 h-14 rounded-full bg-[#3A4C44] hover:bg-[#4A5C54] text-white shadow-lg hover:shadow-xl transition-all z-50 flex items-center justify-center cursor-move"
          style={{ 
            boxShadow: '0 4px 12px rgba(58, 76, 68, 0.3)',
            top: '50%',
            right: '1rem',
            transform: 'translateY(-50%)'
          }}
        >
          <MessageCircle size={24} strokeWidth={2.5} />
          
          {/* Active indicator */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#9FA896] rounded-full border-2 border-white"
          />
        </motion.button>
      )}

      {/* Side Panel - Vertical layout when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 bg-white rounded-2xl border border-[#DDE3DA]/60 shadow-lg flex flex-col overflow-hidden"
            style={{ boxShadow: '0 8px 32px rgba(58, 76, 68, 0.15)' }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#DDE3DA]/50 bg-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <MiraAvatar state={miraState} size={36} />
                    {/* Active indicator */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#9FA896] rounded-full border-2 border-white"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-[#3D3D3D]">Mira</h3>
                      <Sparkles size={13} className="text-[#9FA896]" strokeWidth={2} />
                    </div>
                    <p className="text-xs text-[#8B8680]">Your AI Collaborator</p>
                  </div>
                </div>
                
                {/* Collapse button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-[#F8F4ED] text-[#697768] transition-colors"
                  title="Collapse panel"
                >
                  <ChevronRight size={20} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 min-h-0 relative bg-white">
              <ScrollArea className="h-full">
                <div className="px-5 py-4 space-y-4">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <div key={message.id} className="space-y-2.5">
                        {/* Context divider with title and time */}
                        {message.context && (
                          <>
                            {message.isNewContext && index > 0 && (
                              <div className="py-3">
                                <div className="border-t border-[#DDE3DA]/40" />
                              </div>
                            )}
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="flex justify-center"
                            >
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#F3EDE3] to-[#EDE6DB] border border-[#D4C5B0]/40 shadow-sm">
                                <div className="flex items-center gap-1.5">
                                  {(() => {
                                    const IconComponent = getTypeIcon(message.contextType);
                                    return <IconComponent size={12} strokeWidth={2} className="flex-shrink-0 text-[#9B7D5F]" />;
                                  })()}
                                  <span className="text-xs font-medium text-[#7A6550]">{message.context}</span>
                                </div>
                                {message.contextTime && (
                                  <>
                                    <div className="w-px h-3 bg-[#D4C5B0]/50" />
                                    <span className="text-xs text-[#9B8A75]">{message.contextTime}</span>
                                  </>
                                )}
                              </div>
                            </motion.div>
                          </>
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
                              max-w-[82%] px-4 py-3 rounded-2xl text-sm
                              ${message.sender === 'mira' 
                                ? 'bg-[#E8E5DD] border border-[#DDE3DA]' 
                                : 'bg-[#F8F4ED] border border-[#DDE3DA]/40'
                              }
                            `}
                          >
                            <p className="text-[#3D3D3D] leading-relaxed">{message.content}</p>
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
                  className="px-5 py-3 bg-[#E8E5DD]/50 border-t border-[#DDE3DA]/30 flex-shrink-0"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#9FA896] rounded-full animate-pulse" />
                    <p className="text-xs text-[#697768] font-medium">✨ Added a next step to your Moment</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="p-5 border-t border-[#DDE3DA]/50 bg-white flex-shrink-0">
              {/* Next Step button */}
              <div className="mb-3">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGenerate('next-step')}
                  className="w-full flex items-center justify-center gap-2 px-4 h-10 rounded-xl bg-[#3A4C44] hover:bg-[#4A5C54] transition-all text-sm text-white font-semibold shadow-md hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3A4C44] focus-visible:outline-offset-2"
                >
                  <Sparkles size={16} strokeWidth={2.5} />
                  <span>Next Step Suggestions</span>
                </motion.button>
              </div>

              {/* Input field */}
              <div className="relative group">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                  placeholder="Ask Mira anything…"
                  className="w-full pl-4 pr-11 py-3 rounded-xl bg-[#F8F4ED]/50 border border-[#DDE3DA]/60 hover:border-[#A8B5A1]/50 focus:outline-none focus:border-[#3A4C44] focus:ring-2 focus:ring-[#3A4C44]/20 focus:bg-white transition-all text-sm text-[#3D3D3D] placeholder:text-[#8B8680]"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-[#3A4C44] hover:bg-[#4A5C54] text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!inputValue.trim()}
                >
                  <Send size={14} strokeWidth={2.5} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
