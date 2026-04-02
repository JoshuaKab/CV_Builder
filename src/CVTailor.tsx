import React, { useState } from 'react';
import { CVData } from './types';
import { tailorCV } from './geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  FileText, 
  Loader2, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Target, 
  Zap, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface CVTailorProps {
  cvData: CVData;
  onTailored: (tailoredData: CVData) => void;
  onClose: () => void;
}

export const CVTailor: React.FC<CVTailorProps> = ({ cvData, onTailored, onClose }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTailor = async () => {
    if (!jobDescription.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    try {
      const tailored = await tailorCV(cvData, jobDescription);
      if (tailored) {
        onTailored(tailored);
      } else {
        setError("Failed to tailor CV. Please try again with a different description.");
      }
    } catch (error) {
      console.error("Tailoring failed", error);
      setError("An error occurred while tailoring your CV.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-4xl rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25)] overflow-hidden border border-slate-200/50"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] h-[80vh]">
          {/* Left Side: Info */}
          <div className="bg-slate-950 p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 blur-[100px] rounded-full -mr-32 -mt-32" />
            
            <div className="relative z-10 space-y-12">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-2xl">
                  <Target size={24} className="text-brand-400" />
                </div>
                <h2 className="text-2xl font-black tracking-tighter">AI CV Tailoring</h2>
              </div>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="p-2 bg-brand-500/20 text-brand-400 rounded-xl h-fit">
                    <Zap size={18} />
                  </div>
                  <div>
                    <h4 className="font-black text-lg tracking-tight mb-1">ATS Optimization</h4>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">We'll inject relevant keywords from the job description to help you pass automated filters.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl h-fit">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 className="font-black text-lg tracking-tight mb-1">Strategic Alignment</h4>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">Your experience descriptions will be subtly rewritten to highlight the skills this employer values most.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 bg-green-500/20 text-green-400 rounded-xl h-fit">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="font-black text-lg tracking-tight mb-1">Impact Focused</h4>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">We'll prioritize achievements that demonstrate your fit for this specific role.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 p-6 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                "Tailoring your CV for every application can increase your interview callback rate by up to 3x."
              </p>
            </div>
          </div>

          {/* Right Side: Input */}
          <div className="p-12 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Step 1 of 1</span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Paste Job Description</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 flex flex-col space-y-6">
              <div className="flex-1 relative">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full h-full p-8 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:border-brand-500 focus:ring-0 transition-all resize-none font-medium text-slate-700 leading-relaxed placeholder:text-slate-300"
                  placeholder="Paste the full job posting here, including requirements, responsibilities, and company info..."
                />
                {isGenerating && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-[2rem] space-y-4 z-20">
                    <div className="relative">
                      <div className="absolute inset-0 bg-brand-500/20 blur-2xl rounded-full animate-pulse" />
                      <Loader2 className="w-10 h-10 text-brand-600 animate-spin relative z-10" />
                    </div>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Tailoring your CV...</p>
                  </div>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-4">
                <button 
                  onClick={onClose}
                  className="flex-1 py-5 px-8 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleTailor}
                  disabled={isGenerating || !jobDescription.trim()}
                  className="flex-[2] py-5 px-8 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
                >
                  <span>Generate Tailored CV</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
