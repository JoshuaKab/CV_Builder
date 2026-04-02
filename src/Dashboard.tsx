import React from 'react';
import { motion } from 'motion/react';
import { Logo } from './components/Logo';
import { Plus, Edit3, Download, FileText, Sparkles, Layout } from 'lucide-react';

interface DashboardProps {
  onCreateNew: () => void;
  onEditExisting: () => void;
  onExport: () => void;
  onCareerCoach: () => void;
  onTailor: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  onCreateNew, 
  onEditExisting, 
  onExport,
  onCareerCoach,
  onTailor
}) => {
  return (
    <div className="min-h-screen bg-slate-50 p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-6">
            <Logo size="md" />
            <div className="space-y-2">
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Your Dashboard</h1>
              <p className="text-slate-500 font-medium">Manage your professional documents and career growth.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={onTailor} className="btn-secondary flex items-center gap-2 px-8 py-4">
              <Sparkles size={20} className="text-brand-600" />
              <span>Tailor for Job</span>
            </button>
            <button onClick={onCreateNew} className="btn-primary flex items-center gap-2 px-8 py-4">
              <Plus size={20} />
              <span>Create New CV</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bento-card p-10 flex flex-col justify-between group cursor-pointer"
            onClick={onEditExisting}
          >
            <div className="space-y-6">
              <div className="p-4 bg-brand-50 text-brand-600 rounded-3xl w-fit group-hover:scale-110 transition-transform">
                <Edit3 size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Edit Current CV</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Continue where you left off and refine your professional story.</p>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-2 text-brand-600 font-black text-xs uppercase tracking-widest">
              <span>Resume Editing</span>
              <div className="h-px flex-1 bg-brand-100" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bento-card p-10 flex flex-col justify-between group cursor-pointer"
            onClick={onExport}
          >
            <div className="space-y-6">
              <div className="p-4 bg-purple-50 text-purple-600 rounded-3xl w-fit group-hover:scale-110 transition-transform">
                <Download size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Export & Share</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Download your CV in PDF or Word format, optimized for ATS.</p>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-2 text-purple-600 font-black text-xs uppercase tracking-widest">
              <span>Ready to Apply</span>
              <div className="h-px flex-1 bg-purple-100" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bento-card p-10 flex flex-col justify-between group cursor-pointer"
            onClick={onCareerCoach}
          >
            <div className="space-y-6">
              <div className="p-4 bg-amber-50 text-amber-600 rounded-3xl w-fit group-hover:scale-110 transition-transform">
                <Sparkles size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">AI Career Coach</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Get a personalized roadmap, strategic advice, and interview prep.</p>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-2 text-amber-600 font-black text-xs uppercase tracking-widest">
              <span>AI Powered</span>
              <div className="h-px flex-1 bg-amber-100" />
            </div>
          </motion.div>
        </div>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layout size={20} className="text-slate-400" />
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest">Recent Documents</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bento-card p-6 flex items-center justify-between hover:bg-white transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-100 text-slate-500 rounded-2xl">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Main Professional CV</h4>
                  <p className="text-xs text-slate-400 font-medium">Last edited 2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-brand-600 transition-colors"><Edit3 size={18} /></button>
                <button className="p-2 text-slate-400 hover:text-purple-600 transition-colors"><Download size={18} /></button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
