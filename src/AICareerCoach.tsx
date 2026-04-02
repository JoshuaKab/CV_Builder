import React, { useState, useEffect } from 'react';
import { OnboardingData, CareerRoadmap } from './types';
import { getCareerRoadmap } from './geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Target, 
  Lightbulb, 
  MessageSquare, 
  Loader2, 
  ChevronRight, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';

interface AICareerCoachProps {
  onboardingData: OnboardingData;
}

export const AICareerCoach: React.FC<AICareerCoachProps> = ({ onboardingData }) => {
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'roadmap' | 'skills' | 'advice' | 'interview'>('roadmap');

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      try {
        const data = await getCareerRoadmap(onboardingData);
        setRoadmap(data);
      } catch (error) {
        console.error("Failed to fetch career roadmap", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, [onboardingData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-500/20 blur-3xl rounded-full animate-pulse" />
          <Loader2 className="w-12 h-12 text-brand-600 animate-spin relative z-10" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Consulting AI Career Coach...</h3>
          <p className="text-slate-500 font-medium">Building your personalized roadmap for {onboardingData.jobTitle}</p>
        </div>
      </div>
    );
  }

  if (!roadmap) return null;

  const tabs = [
    { id: 'roadmap', label: 'Roadmap', icon: Compass },
    { id: 'skills', label: 'Skills', icon: Target },
    { id: 'advice', label: 'Strategy', icon: Lightbulb },
    { id: 'interview', label: 'Interview', icon: MessageSquare },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-900 text-white rounded-2xl shadow-xl shadow-slate-200/50">
            <Sparkles size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">AI Career Coach</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Personalized Strategy for {onboardingData.jobTitle}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/40 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-white text-slate-900 shadow-[0_4px_12px_rgba(0,0,0,0.05)] ring-1 ring-slate-200/50'
                : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'roadmap' && (
              <div className="space-y-6">
                {roadmap.roadmap.map((step, index) => (
                  <div key={index} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-sm relative z-10 group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      {index !== roadmap.roadmap.length - 1 && (
                        <div className="w-0.5 flex-1 bg-slate-100 my-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-10">
                      <div className="bento-card p-6 hover:border-brand-200 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-black text-slate-900 tracking-tight">{step.step}</h4>
                          <span className="px-3 py-1 bg-brand-50 text-brand-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                            {step.timeframe}
                          </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-medium">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roadmap.skillsToAcquire.map((skill, index) => (
                  <div key={index} className="bento-card p-6 flex items-center gap-4 group hover:border-brand-200 transition-colors">
                    <div className="p-3 bg-brand-50 text-brand-600 rounded-xl group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <Award size={20} />
                    </div>
                    <span className="font-black text-slate-900 tracking-tight">{skill}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'advice' && (
              <div className="space-y-4">
                {roadmap.strategicAdvice.map((advice, index) => (
                  <div key={index} className="bento-card p-6 flex gap-4 group hover:border-brand-200 transition-colors">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl h-fit">
                      <Lightbulb size={20} />
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">{advice}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'interview' && (
              <div className="space-y-6">
                {roadmap.interviewQuestions.map((item, index) => (
                  <div key={index} className="bento-card p-8 space-y-4 hover:border-brand-200 transition-colors">
                    <div className="flex gap-4">
                      <div className="p-2 bg-slate-100 text-slate-600 rounded-lg h-fit">
                        <MessageSquare size={18} />
                      </div>
                      <h4 className="text-xl font-black text-slate-900 leading-tight tracking-tight">
                        {item.question}
                      </h4>
                    </div>
                    <div className="pl-12">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 size={14} className="text-green-500" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Coach's Advice</span>
                        </div>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed italic">
                          "{item.advice}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Action */}
      <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-slate-900/20">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
            <BookOpen size={32} />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight">Ready to take the next step?</h3>
            <p className="text-slate-400 font-medium">Update your CV with these new skills and insights.</p>
          </div>
        </div>
        <button className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-black rounded-2xl transition-all flex items-center gap-3 group">
          <span>Update My CV</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
