import React from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', showText = true }) => {
  const iconSizes = {
    sm: 18,
    md: 24,
    lg: 40,
  };

  const containerPadding = {
    sm: 'p-1.5',
    md: 'p-2.5',
    lg: 'p-4',
  };

  const borderRadius = {
    sm: 'rounded-xl',
    md: 'rounded-2xl',
    lg: 'rounded-[2rem]',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const subtextSizes = {
    sm: 'text-[8px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div 
        whileHover={{ rotate: 0, scale: 1.05 }}
        className={`relative bg-slate-950 ${containerPadding[size]} ${borderRadius[size]} shadow-2xl shadow-slate-200/50 -rotate-3 transition-transform duration-500`}
      >
        <FileText className="text-white" size={iconSizes[size]} />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1 -right-1 text-brand-400"
        >
          <Sparkles size={iconSizes[size] * 0.6} fill="currentColor" />
        </motion.div>
      </motion.div>
      
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizes[size]} font-black tracking-tighter text-slate-900 leading-none flex items-center`}>
            CV
            <span className="text-brand-500 ml-0.5">Builder</span>
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full ml-1 self-end mb-1" />
          </h1>
          <span className={`${subtextSizes[size]} font-bold text-slate-400 uppercase tracking-[0.3em] mt-1.5`}>
            AI Career Suite
          </span>
        </div>
      )}
    </div>
  );
};
