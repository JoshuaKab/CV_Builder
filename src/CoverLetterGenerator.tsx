import React, { useState } from 'react';
import { CVData } from './types';
import { generateCoverLetter } from './geminiService';
import { FileText, Sparkles, Loader2, Copy, Check, Download, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CoverLetterGeneratorProps {
  cvData: CVData;
}

export const CoverLetterGenerator: React.FC<CoverLetterGeneratorProps> = ({ cvData }) => {
  const [targetJob, setTargetJob] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!targetJob) return;
    setIsGenerating(true);
    try {
      const result = await generateCoverLetter(cvData, targetJob);
      if (result) {
        setCoverLetter(result);
      }
    } catch (error) {
      console.error('Failed to generate cover letter:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bento-card p-10 h-full flex flex-col">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl shadow-lg shadow-purple-100">
            <Zap size={24} fill="currentColor" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">AI Cover Letter</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Tailored to your CV</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="space-y-2">
          <label className="label-premium">Target Job Title / Description</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={targetJob}
              onChange={(e) => setTargetJob(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer at Google"
              className="input-premium flex-1"
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !targetJob}
              className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-2xl text-sm font-bold hover:bg-purple-700 disabled:opacity-50 transition-all active:scale-95 shadow-lg shadow-purple-600/10"
            >
              {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              <span>Generate</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[400px] relative">
        <AnimatePresence mode="wait">
          {coverLetter ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="h-full flex flex-col"
            >
              <div className="flex justify-between items-center mb-3 px-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Draft created by AI</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all active:scale-95 shadow-sm"
                    title="Download as PDF"
                  >
                    <Download size={14} />
                    <span>PDF</span>
                  </button>
                  <button
                    onClick={handleCopy}
                    className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="flex-1 p-8 bg-slate-50/50 rounded-3xl border border-slate-200 focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none resize-none text-slate-700 text-sm leading-relaxed font-serif print:hidden transition-all duration-300"
                placeholder="Edit your cover letter here..."
              />
              {/* Printable version */}
              <div className="hidden print:block print:p-12 print:text-slate-900 print:text-base print:leading-relaxed print:font-serif whitespace-pre-wrap">
                {coverLetter}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-slate-400 space-y-6 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/20"
            >
              <div className="p-6 bg-white rounded-full shadow-sm border border-slate-100">
                <FileText size={48} className="opacity-10" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm font-bold text-slate-500">Ready to generate?</p>
                <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed">Enter a job title above and let AI craft your professional cover letter.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
