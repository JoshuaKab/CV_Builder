import React, { useState } from 'react';
import { OnboardingData } from './types';
import { motion } from 'motion/react';
import { Logo } from './components/Logo';
import { Briefcase, TrendingUp, Building2, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [data, setData] = useState<OnboardingData>({
    jobTitle: '',
    experienceLevel: 'Entry',
    industry: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.jobTitle && data.industry) {
      onComplete(data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bento-card p-12 space-y-8"
      >
        <div className="flex flex-col items-center gap-6 mb-12">
          <Logo size="lg" />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Let's Personalize Your CV</h1>
          <p className="text-slate-500 text-sm">Tell us a bit about your career goals so we can help you better.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="label-premium flex items-center gap-2">
              <Briefcase size={14} className="text-brand-600" />
              Target Job Title
            </label>
            <input
              type="text"
              required
              value={data.jobTitle}
              onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
              placeholder="e.g. Senior Product Designer"
              className="input-premium w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="label-premium flex items-center gap-2">
              <TrendingUp size={14} className="text-brand-600" />
              Experience Level
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(['Entry', 'Mid', 'Senior', 'Lead'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setData({ ...data, experienceLevel: level })}
                  className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all border ${
                    data.experienceLevel === level
                      ? 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-600/20'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="label-premium flex items-center gap-2">
              <Building2 size={14} className="text-brand-600" />
              Industry
            </label>
            <input
              type="text"
              required
              value={data.industry}
              onChange={(e) => setData({ ...data, industry: e.target.value })}
              placeholder="e.g. Technology, Healthcare, Finance"
              className="input-premium w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-4 flex items-center justify-center gap-2 group"
          >
            <span>Start Building My CV</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
