import { motion } from 'motion/react';
import { Bot } from 'lucide-react';

type MiraAvatarState = 'idle' | 'thinking' | 'speaking';

interface MiraAvatarProps {
  state?: MiraAvatarState;
  size?: number;
}

export function MiraAvatar({ state = 'idle', size = 40 }: MiraAvatarProps) {
  const getAnimation = () => {
    switch (state) {
      case 'thinking':
        return {
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6],
          transition: { duration: 1.5, repeat: Infinity }
        };
      case 'speaking':
        return {
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
          transition: { duration: 0.8, repeat: Infinity }
        };
      default:
        return {
          scale: [1, 1.02, 1],
          opacity: [0.7, 0.9, 0.7],
          transition: { duration: 2, repeat: Infinity }
        };
    }
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(135deg, var(--ai-gradient-start) 0%, var(--ai-gradient-end) 100%)',
          opacity: 0.2,
          filter: 'blur(8px)'
        }}
        animate={getAnimation()}
      />
      
      {/* Inner circle */}
      <div 
        className="absolute inset-0 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, var(--ai-gradient-start) 0%, var(--ai-gradient-end) 100%)'
        }}
      >
        <Bot size={size * 0.5} className="text-white" strokeWidth={2} />
      </div>
    </div>
  );
}
