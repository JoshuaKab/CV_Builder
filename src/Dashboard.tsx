import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './components/Logo';
import { Plus, Edit3, Download, FileText, Sparkles, Layout, MoreVertical, Eye, Copy, Trash2, ExternalLink, X, Share2 } from 'lucide-react';
import { CVData } from './types';
import { CVPreview } from './CVPreview';

interface DashboardProps {
  cvData: CVData;
  onCreateNew: () => void;
  onEditExisting: () => void;
  onExport: () => void;
  onCareerCoach: () => void;
  onTailor: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  cvData,
  onCreateNew, 
  onEditExisting, 
  onExport,
  onCareerCoach,
  onTailor,
  onDelete,
  onDuplicate
}) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);

  const lastEdited = "2 hours ago"; // In a real app, this would be from metadata
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layout size={20} className="text-slate-400" />
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest">Recent Documents</h2>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">1 Document</span>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bento-card p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-white transition-all group relative overflow-hidden"
            >
              <div className="flex items-center gap-6">
                <div className="p-4 bg-slate-100 text-slate-500 rounded-2xl group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                  <FileText size={28} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-black text-xl text-slate-900">{cvData.personalInfo.fullName || 'Main Professional CV'}</h4>
                    <span className="px-2 py-0.5 bg-slate-100 text-[10px] font-black text-slate-500 rounded-md uppercase tracking-wider group-hover:bg-brand-100 group-hover:text-brand-700 transition-colors">
                      {cvData.templateId}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1"><Edit3 size={12} /> Edited {lastEdited}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span className="flex items-center gap-1"><Layout size={12} /> {cvData.experiences.length} Experiences</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 md:mt-0">
                <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100">
                  <button 
                    onClick={onEditExisting}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-white hover:text-brand-600 rounded-xl transition-all"
                  >
                    <Edit3 size={16} />
                    <span>Edit</span>
                  </button>
                  <button 
                    onClick={onExport}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-white hover:text-purple-600 rounded-xl transition-all"
                  >
                    <Download size={16} />
                    <span>Export</span>
                  </button>
                </div>
                
                  <button 
                    onClick={() => setShowPreview(true)}
                    className="p-3 text-slate-400 hover:bg-slate-100 rounded-2xl transition-all"
                    title="Quick Preview"
                  >
                    <Eye size={20} />
                  </button>
                  
                  <div className="relative">
                  <button 
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-3 text-slate-400 hover:bg-slate-100 rounded-2xl transition-all"
                  >
                    <MoreVertical size={20} />
                  </button>
                  
                  <AnimatePresence>
                    {showMenu && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setShowMenu(false)} 
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute right-0 bottom-full mb-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-20 overflow-hidden p-2"
                        >
                          <button 
                            onClick={() => { setShowPreview(true); setShowMenu(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all"
                          >
                            <Eye size={16} />
                            <span>Quick Preview</span>
                          </button>
                          <button 
                            onClick={() => { onTailor(); setShowMenu(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-xl transition-all"
                          >
                            <Sparkles size={16} />
                            <span>Tailor for Job</span>
                          </button>
                          <button 
                            onClick={() => { onDuplicate(); setShowMenu(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all"
                          >
                            <Copy size={16} />
                            <span>Duplicate</span>
                          </button>
                          <button 
                            onClick={() => { alert('Share link copied to clipboard!'); setShowMenu(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-xl transition-all"
                          >
                            <Share2 size={16} />
                            <span>Share Link</span>
                          </button>
                          <div className="h-px bg-slate-100 my-1 mx-2" />
                          <button 
                            onClick={() => { onDelete(); setShowMenu(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Quick Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowPreview(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-50 text-brand-600 rounded-2xl">
                    <Eye size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Quick Preview</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{cvData.templateId} Template</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={onEditExisting}
                    className="btn-secondary px-6"
                  >
                    <Edit3 size={18} />
                    <span>Open in Editor</span>
                  </button>
                  <button 
                    onClick={() => setShowPreview(false)}
                    className="p-3 text-slate-400 hover:bg-slate-100 rounded-2xl transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
                <div className="max-w-[816px] mx-auto shadow-2xl rounded-2xl overflow-hidden bg-white">
                  <CVPreview data={cvData} />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
