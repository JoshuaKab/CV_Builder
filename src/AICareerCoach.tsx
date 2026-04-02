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
  TrendingUp,
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
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-950 text-white rounded-2xl shadow-xl shadow-slate-200/50 -rotate-3">
            <Sparkles size={24} fill="currentColor" className="text-brand-400" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">AI Career Coach</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Personalized Strategy for {onboardingData.jobTitle}</p>
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
              <div className="space-y-8">
                {roadmap.roadmap.map((step, index) => (
                  <div key={index} className="flex gap-8 group">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-black text-lg relative z-10 group-hover:scale-110 transition-transform shadow-xl shadow-slate-200/50 -rotate-3">
                        {index + 1}
                      </div>
                      {index !== roadmap.roadmap.length - 1 && (
                        <div className="w-0.5 flex-1 bg-slate-100 my-4" />
                      )}
                    </div>
                    <div className="flex-1 pb-12">
                      <div className="bento-card p-8 hover:border-brand-200 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-2xl font-black text-slate-900 tracking-tight">{step.step}</h4>
                          <span className="px-4 py-1.5 bg-brand-50 text-brand-600 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
                            {step.timeframe}
                          </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-medium mb-6 text-lg">{step.description}</p>
                        
                        <div className="space-y-3">
                          <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Key Milestones</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {step.milestones.map((milestone, mIdx) => (
                              <div key={mIdx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <CheckCircle2 size={16} className="text-brand-500 shrink-0" />
                                <span className="text-sm font-bold text-slate-700">{milestone}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roadmap.skillsDevelopment.map((item, index) => (
                  <div key={index} className="bento-card p-8 flex flex-col gap-6 group hover:border-brand-200 transition-all duration-500">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl shadow-lg ${
                          item.importance === 'High' ? 'bg-red-50 text-red-600 shadow-red-100' :
                          item.importance === 'Medium' ? 'bg-amber-50 text-amber-600 shadow-amber-100' :
                          'bg-blue-50 text-blue-600 shadow-blue-100'
                        }`}>
                          <Award size={24} />
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-slate-900 tracking-tight">{item.skill}</h4>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${
                            item.importance === 'High' ? 'text-red-500' :
                            item.importance === 'Medium' ? 'text-amber-500' :
                            'text-blue-500'
                          }`}>
                            {item.importance} Priority
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current Gap</h5>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed">{item.gap}</p>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recommended Resources</h5>
                        <div className="flex flex-wrap gap-2">
                          {item.resources.map((resource, rIdx) => (
                            <div key={rIdx} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2">
                              <BookOpen size={12} className="text-brand-500" />
                              {resource}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'advice' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                      <Target size={20} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Job Search</h3>
                  </div>
                  {roadmap.strategy.jobSearch.map((item, i) => (
                    <div key={i} className="bento-card p-6 border-l-4 border-l-blue-500 hover:translate-x-1 transition-transform">
                      <p className="text-slate-700 font-medium leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                      <Compass size={20} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Networking</h3>
                  </div>
                  {roadmap.strategy.networking.map((item, i) => (
                    <div key={i} className="bento-card p-6 border-l-4 border-l-purple-500 hover:translate-x-1 transition-transform">
                      <p className="text-slate-700 font-medium leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                      <TrendingUp size={20} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Growth</h3>
                  </div>
                  {roadmap.strategy.growthOpportunities.map((item, i) => (
                    <div key={i} className="bento-card p-6 border-l-4 border-l-amber-500 hover:translate-x-1 transition-transform">
                      <p className="text-slate-700 font-medium leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'interview' && (
              <div className="space-y-8">
                {roadmap.interviewPrep.map((item, index) => (
                  <div key={index} className="bento-card overflow-hidden group hover:border-brand-200 transition-all duration-500">
                    <div className="p-8 bg-white border-b border-slate-100">
                      <div className="flex gap-6">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-black shrink-0">
                          {index + 1}
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 leading-tight tracking-tight">
                          {item.question}
                        </h4>
                      </div>
                    </div>
                    <div className="p-8 bg-slate-50/50 space-y-6">
                      <div className="space-y-3">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Sample Answer</h5>
                        <p className="text-slate-700 font-medium leading-relaxed text-lg bg-white p-6 rounded-2xl border border-slate-100 shadow-sm italic">
                          "{item.sampleAnswer}"
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Key Points to Hit</h5>
                        <div className="flex flex-wrap gap-3">
                          {item.keyPoints.map((point, pIdx) => (
                            <div key={pIdx} className="flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-xl text-sm font-bold border border-brand-100">
                              <CheckCircle2 size={14} />
                              {point}
                            </div>
                          ))}
                        </div>
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
