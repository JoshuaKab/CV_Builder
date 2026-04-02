import React, { useState } from 'react';
import { CVData, PersonalInfo, Experience, Education, Project } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Sparkles, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronLeft,
  Loader2,
  Check
} from 'lucide-react';
import { suggestSummary, improveExperience, suggestSkills } from './geminiService';

interface CVWizardProps {
  data: CVData;
  onChange: (data: CVData) => void;
  onComplete: () => void;
}

const steps = [
  { id: 'personal', title: 'Personal Info', icon: User },
  { id: 'summary', title: 'Professional Summary', icon: FileText },
  { id: 'experience', title: 'Work Experience', icon: Briefcase },
  { id: 'education', title: 'Education', icon: GraduationCap },
  { id: 'skills', title: 'Skills', icon: Wrench },
  { id: 'projects', title: 'Projects', icon: FolderGit2 },
];

export const CVWizard: React.FC<CVWizardProps> = ({ data, onChange, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePersonalInfoChange = (info: Partial<PersonalInfo>) => {
    onChange({ ...data, personalInfo: { ...data.personalInfo, ...info } });
  };

  const handleAddExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    onChange({ ...data, experiences: [...data.experiences, newExp] });
  };

  const handleUpdateExperience = (id: string, updates: Partial<Experience>) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)),
    });
  };

  const handleRemoveExperience = (id: string) => {
    onChange({ ...data, experiences: data.experiences.filter((exp) => exp.id !== id) });
  };

  const handleAddEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    onChange({ ...data, educations: [...data.educations, newEdu] });
  };

  const handleUpdateEducation = (id: string, updates: Partial<Education>) => {
    onChange({
      ...data,
      educations: data.educations.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu)),
    });
  };

  const handleRemoveEducation = (id: string) => {
    onChange({ ...data, educations: data.educations.filter((edu) => edu.id !== id) });
  };

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      link: '',
    };
    onChange({ ...data, projects: [...data.projects, newProject] });
  };

  const handleUpdateProject = (id: string, updates: Partial<Project>) => {
    onChange({
      ...data,
      projects: data.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    });
  };

  const handleRemoveProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter((p) => p.id !== id) });
  };

  const handleAIImproveExperience = async (id: string) => {
    const exp = data.experiences.find(e => e.id === id);
    if (!exp || !exp.position || !exp.company || !exp.description) return;
    
    setIsGenerating(true);
    try {
      const improved = await improveExperience(exp.position, exp.company, exp.description);
      handleUpdateExperience(id, { description: improved });
    } catch (error) {
      console.error("AI Improvement failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAISuggestSummary = async () => {
    if (!data.onboarding) return;
    setIsGenerating(true);
    try {
      const summary = await suggestSummary(data.onboarding, data.skills);
      handlePersonalInfoChange({ summary });
    } catch (error) {
      console.error("AI Summary generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAISuggestSkills = async () => {
    if (!data.onboarding) return;
    setIsGenerating(true);
    try {
      const skillsText = await suggestSkills(data.onboarding);
      // Simple parsing of the bullet points
      const suggested = skillsText.split('\n')
        .filter(line => line.includes('-') || line.includes('•'))
        .map(line => line.replace(/^[-•]\s*/, '').trim())
        .filter(Boolean);
      onChange({ ...data, skills: [...new Set([...data.skills, ...suggested])] });
    } catch (error) {
      console.error("AI Skills suggestion failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case 'personal':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="label-premium">Full Name</label>
                <input
                  type="text"
                  value={data.personalInfo.fullName}
                  onChange={(e) => handlePersonalInfoChange({ fullName: e.target.value })}
                  className="input-premium w-full"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="label-premium">Email Address</label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange({ email: e.target.value })}
                  className="input-premium w-full"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="label-premium">Phone Number</label>
                <input
                  type="tel"
                  value={data.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange({ phone: e.target.value })}
                  className="input-premium w-full"
                  placeholder="+1 234 567 890"
                />
              </div>
              <div className="space-y-2">
                <label className="label-premium">Location</label>
                <input
                  type="text"
                  value={data.personalInfo.location}
                  onChange={(e) => handlePersonalInfoChange({ location: e.target.value })}
                  className="input-premium w-full"
                  placeholder="New York, NY"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="label-premium">LinkedIn Profile</label>
                <input
                  type="text"
                  value={data.personalInfo.linkedin}
                  onChange={(e) => handlePersonalInfoChange({ linkedin: e.target.value })}
                  className="input-premium w-full"
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div className="space-y-2">
                <label className="label-premium">Portfolio / Website</label>
                <input
                  type="text"
                  value={data.personalInfo.website}
                  onChange={(e) => handlePersonalInfoChange({ website: e.target.value })}
                  className="input-premium w-full"
                  placeholder="johndoe.com"
                />
              </div>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label className="label-premium">Professional Summary</label>
              <button 
                onClick={handleAISuggestSummary}
                disabled={isGenerating}
                className="flex items-center gap-2 text-xs font-black text-brand-600 uppercase tracking-widest hover:text-brand-700 disabled:opacity-50"
              >
                {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                <span>Generate with AI</span>
              </button>
            </div>
            <textarea
              value={data.personalInfo.summary}
              onChange={(e) => handlePersonalInfoChange({ summary: e.target.value })}
              className="input-premium w-full h-48 resize-none"
              placeholder="Briefly describe your professional background and key achievements..."
            />
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Work History</h3>
              <button onClick={handleAddExperience} className="btn-secondary py-2 px-4 flex items-center gap-2">
                <Plus size={16} />
                <span>Add Experience</span>
              </button>
            </div>
            <div className="space-y-6">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4 relative group">
                  <button 
                    onClick={() => handleRemoveExperience(exp.id)}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="label-premium">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(exp.id, { company: e.target.value })}
                        className="input-premium w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="label-premium">Position</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => handleUpdateExperience(exp.id, { position: e.target.value })}
                        className="input-premium w-full"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="label-premium">Start Date</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => handleUpdateExperience(exp.id, { startDate: e.target.value })}
                        className="input-premium w-full"
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="label-premium">End Date</label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => handleUpdateExperience(exp.id, { endDate: e.target.value })}
                        className="input-premium w-full"
                        placeholder="MM/YYYY or Present"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="label-premium">Description</label>
                      <button 
                        onClick={() => handleAIImproveExperience(exp.id)}
                        disabled={isGenerating || !exp.description}
                        className="flex items-center gap-2 text-[10px] font-black text-brand-600 uppercase tracking-widest hover:text-brand-700 disabled:opacity-50"
                      >
                        {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                        <span>Improve with AI</span>
                      </button>
                    </div>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleUpdateExperience(exp.id, { description: e.target.value })}
                      className="input-premium w-full h-32 resize-none"
                      placeholder="Describe your responsibilities and achievements..."
                    />
                  </div>
                </div>
              ))}
              {data.experiences.length === 0 && (
                <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium">No experience added yet.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Academic Background</h3>
              <button onClick={handleAddEducation} className="btn-secondary py-2 px-4 flex items-center gap-2">
                <Plus size={16} />
                <span>Add Education</span>
              </button>
            </div>
            <div className="space-y-6">
              {data.educations.map((edu) => (
                <div key={edu.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4 relative group">
                  <button 
                    onClick={() => handleRemoveEducation(edu.id)}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="label-premium">School / University</label>
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => handleUpdateEducation(edu.id, { school: e.target.value })}
                        className="input-premium w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="label-premium">Degree / Field of Study</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleUpdateEducation(edu.id, { degree: e.target.value })}
                        className="input-premium w-full"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="label-premium">Start Date</label>
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => handleUpdateEducation(edu.id, { startDate: e.target.value })}
                        className="input-premium w-full"
                        placeholder="YYYY"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="label-premium">End Date</label>
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={(e) => handleUpdateEducation(edu.id, { endDate: e.target.value })}
                        className="input-premium w-full"
                        placeholder="YYYY or Expected"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {data.educations.length === 0 && (
                <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium">No education added yet.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Skills & Expertise</h3>
              <button 
                onClick={handleAISuggestSkills}
                disabled={isGenerating}
                className="flex items-center gap-2 text-xs font-black text-brand-600 uppercase tracking-widest hover:text-brand-700 disabled:opacity-50"
              >
                {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                <span>Suggest with AI</span>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a skill (e.g. React, Project Management)"
                  className="input-premium flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = e.currentTarget.value.trim();
                      if (val && !data.skills.includes(val)) {
                        onChange({ ...data, skills: [...data.skills, val] });
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-brand-50 text-brand-700 rounded-2xl text-sm font-bold flex items-center gap-2 border border-brand-100">
                    {skill}
                    <button onClick={() => onChange({ ...data, skills: data.skills.filter((_, i) => i !== index) })}>
                      <Trash2 size={14} className="text-brand-400 hover:text-brand-600" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Personal Projects</h3>
              <button onClick={handleAddProject} className="btn-secondary py-2 px-4 flex items-center gap-2">
                <Plus size={16} />
                <span>Add Project</span>
              </button>
            </div>
            <div className="space-y-6">
              {data.projects.map((project) => (
                <div key={project.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4 relative group">
                  <button 
                    onClick={() => handleRemoveProject(project.id)}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="label-premium">Project Name</label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => handleUpdateProject(project.id, { name: e.target.value })}
                        className="input-premium w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="label-premium">Project Link (Optional)</label>
                      <input
                        type="text"
                        value={project.link}
                        onChange={(e) => handleUpdateProject(project.id, { link: e.target.value })}
                        className="input-premium w-full"
                        placeholder="github.com/..."
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="label-premium">Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleUpdateProject(project.id, { description: e.target.value })}
                      className="input-premium w-full h-24 resize-none"
                    />
                  </div>
                </div>
              ))}
              {data.projects.length === 0 && (
                <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium">No projects added yet.</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Progress Header */}
      <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-50 text-brand-600 rounded-2xl shadow-lg shadow-brand-100">
            {React.createElement(steps[currentStep].icon, { size: 24 })}
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none">{steps[currentStep].title}</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Step {currentStep + 1} of {steps.length}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 w-8 rounded-full transition-all duration-500 ${
                i <= currentStep ? 'bg-brand-600' : 'bg-slate-100'
              }`} 
            />
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={steps[currentStep].id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="px-10 py-6 border-t border-slate-100 flex justify-between bg-white/50 backdrop-blur-sm">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-6 py-3 text-slate-600 font-bold text-sm hover:text-brand-600 disabled:opacity-0 transition-all"
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>
        <button
          onClick={nextStep}
          className="btn-primary px-8 py-3 flex items-center gap-2 group"
        >
          <span>{currentStep === steps.length - 1 ? 'Finish & Preview' : 'Next Step'}</span>
          {currentStep === steps.length - 1 ? <Check size={18} /> : <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
        </button>
      </div>
    </div>
  );
};
