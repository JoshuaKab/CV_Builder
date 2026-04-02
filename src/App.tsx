/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { CVPreview } from './CVPreview';
import { CoverLetterGenerator } from './CoverLetterGenerator';
import { CVWizard } from './CVWizard';
import { Dashboard } from './Dashboard';
import { Onboarding } from './Onboarding';
import { AICareerCoach } from './AICareerCoach';
import { CVTailor } from './CVTailor';
import { CVData, OnboardingData } from './types';
import { Download, FileText, Printer, Sparkles, FileEdit, Upload, Loader2, AlertCircle, ChevronDown, FileCode, ArrowLeft, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { parseCV } from './geminiService';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

const initialData: CVData = {
  templateId: 'modern',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  experiences: [],
  educations: [],
  skills: [],
  projects: [],
};

const templates = [
  { id: 'modern', name: 'Modern', color: 'bg-blue-600' },
  { id: 'classic', name: 'Classic', color: 'bg-slate-800' },
  { id: 'minimal', name: 'Minimal', color: 'bg-slate-400' },
  { id: 'creative', name: 'Creative', color: 'bg-purple-600' },
  { id: 'executive', name: 'Executive', color: 'bg-slate-900' },
  { id: 'technical', name: 'Technical', color: 'bg-emerald-600' },
  { id: 'bold', name: 'Bold', color: 'bg-orange-600' },
];

type View = 'onboarding' | 'dashboard' | 'wizard' | 'cover-letter' | 'career-coach';

export default function App() {
  const [view, setView] = useState<View>(() => {
    const savedOnboarding = localStorage.getItem('onboarding-data');
    return savedOnboarding ? 'dashboard' : 'onboarding';
  });

  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(() => {
    const saved = localStorage.getItem('onboarding-data');
    return saved ? JSON.parse(saved) : null;
  });

  const [cvData, setCvData] = useState<CVData>(() => {
    const saved = localStorage.getItem('cv-data');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...initialData, ...parsed };
    }
    return initialData;
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isTailorModalOpen, setIsTailorModalOpen] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('cv-data', JSON.stringify(cvData));
  }, [cvData]);

  useEffect(() => {
    if (onboardingData) {
      localStorage.setItem('onboarding-data', JSON.stringify(onboardingData));
    }
  }, [onboardingData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowExportOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data);
    setCvData(prev => ({ ...prev, onboarding: data }));
    setView('dashboard');
  };

  const handlePrint = () => {
    window.print();
    setShowExportOptions(false);
  };

  const handleTemplateChange = (id: string) => {
    setCvData({ ...cvData, templateId: id });
  };

  const exportToTxt = () => {
    const content = `
${cvData.personalInfo.fullName.toUpperCase()}
${cvData.personalInfo.email} | ${cvData.personalInfo.phone}
${cvData.personalInfo.location}
${cvData.personalInfo.linkedin} | ${cvData.personalInfo.website}

SUMMARY
${cvData.personalInfo.summary}

EXPERIENCE
${cvData.experiences.map(exp => `
${exp.position} at ${exp.company}
${exp.startDate} - ${exp.endDate}
${exp.description}
`).join('\n')}

EDUCATION
${cvData.educations.map(edu => `
${edu.degree}
${edu.school} | ${edu.startDate} - ${edu.endDate}
${edu.description}
`).join('\n')}

PROJECTS
${cvData.projects?.map(project => `
${project.name}
${project.link}
${project.description}
`).join('\n')}

SKILLS
${cvData.skills.join(', ')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    saveAs(blob, `${cvData.personalInfo.fullName.replace(/\s+/g, '_') || 'My'}_CV.txt`);
    setShowExportOptions(false);
  };

  const exportToDocx = async () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: cvData.personalInfo.fullName || 'Your Name',
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun(`${cvData.personalInfo.email} | ${cvData.personalInfo.phone} | ${cvData.personalInfo.location}`),
            ],
          }),
          new Paragraph({
            text: "SUMMARY",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: cvData.personalInfo.summary,
          }),
          new Paragraph({
            text: "EXPERIENCE",
            heading: HeadingLevel.HEADING_2,
          }),
          ...cvData.experiences.flatMap(exp => [
            new Paragraph({
              children: [
                new TextRun({ text: `${exp.position} at ${exp.company}`, bold: true }),
                new TextRun({ text: ` (${exp.startDate} - ${exp.endDate})`, italics: true }),
              ],
            }),
            new Paragraph({
              text: exp.description,
            }),
          ]),
          new Paragraph({
            text: "EDUCATION",
            heading: HeadingLevel.HEADING_2,
          }),
          ...cvData.educations.flatMap(edu => [
            new Paragraph({
              children: [
                new TextRun({ text: edu.degree, bold: true }),
                new TextRun({ text: ` - ${edu.school}`, italics: true }),
              ],
            }),
            new Paragraph({
              text: `${edu.startDate} - ${edu.endDate}`,
            }),
            new Paragraph({
              text: edu.description,
            }),
          ]),
          new Paragraph({
            text: "SKILLS",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: cvData.skills.join(', '),
          }),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${cvData.personalInfo.fullName.replace(/\s+/g, '_') || 'My'}_CV.docx`);
    setShowExportOptions(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const text = await file.text();
      const parsedData = await parseCV(text);
      
      if (parsedData) {
        const processedData: CVData = {
          ...cvData,
          ...parsedData,
          experiences: (parsedData.experiences || []).map((exp: any) => ({
            ...exp,
            id: exp.id || crypto.randomUUID()
          })),
          educations: (parsedData.educations || []).map((edu: any) => ({
            ...edu,
            id: edu.id || crypto.randomUUID()
          })),
          projects: (parsedData.projects || []).map((proj: any) => ({
            ...proj,
            id: proj.id || crypto.randomUUID()
          })),
        };
        setCvData(processedData);
        setView('wizard');
      } else {
        setUploadError("Could not extract information from the file. Please try a different format.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("An error occurred while reading the file.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (view === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (view === 'dashboard') {
    return (
      <Dashboard 
        onCreateNew={() => {
          setCvData(initialData);
          setView('wizard');
        }}
        onEditExisting={() => setView('wizard')}
        onExport={() => setView('wizard')}
        onCareerCoach={() => setView('career-coach')}
        onTailor={() => setIsTailorModalOpen(true)}
      />
    );
  }

  if (view === 'career-coach') {
    return (
      <div className="min-h-screen bg-slate-50 p-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <button 
            onClick={() => setView('dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          <AICareerCoach onboardingData={onboardingData!} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-brand-100 selection:text-brand-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-slate-200/40 px-8 py-4 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView('dashboard')}
            className="p-2.5 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400 hover:text-slate-900"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 p-2.5 rounded-2xl shadow-xl shadow-slate-200/50 rotate-3">
              <FileText className="text-white" size={22} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-extrabold tracking-tighter text-slate-900 leading-none">CV<span className="text-brand-500">Builder</span></h1>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1.5">Editing: {cvData.personalInfo.fullName || 'Untitled'}</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {/* View Selector */}
          <div className="flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/40">
            <button
              onClick={() => setView('wizard')}
              className={`flex items-center gap-2.5 px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                view === 'wizard'
                  ? 'bg-white text-slate-900 shadow-[0_4px_12px_rgba(0,0,0,0.05)] ring-1 ring-slate-200/50'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
              }`}
            >
              <FileEdit size={16} />
              <span>Wizard</span>
            </button>
            <button
              onClick={() => setView('cover-letter')}
              className={`flex items-center gap-2.5 px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                view === 'cover-letter'
                  ? 'bg-white text-slate-900 shadow-[0_4px_12px_rgba(0,0,0,0.05)] ring-1 ring-slate-200/50'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
              }`}
            >
              <Sparkles size={16} className={view === 'cover-letter' ? 'text-purple-500' : ''} />
              <span>Cover Letter</span>
            </button>
          </div>

          {/* Template Selector */}
          <div className="flex items-center gap-1.5">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTemplateChange(t.id)}
                className={`group relative px-3 py-1.5 rounded-xl transition-all duration-300 ${
                  cvData.templateId === t.id ? 'bg-slate-100' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${t.color} ${cvData.templateId === t.id ? 'scale-125' : 'group-hover:scale-110'} transition-transform`} />
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${
                    cvData.templateId === t.id ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'
                  }`}>
                    {t.name}
                  </span>
                </div>
                {cvData.templateId === t.id && (
                  <motion.div layoutId="template-active" className="absolute -bottom-1 left-3 right-3 h-0.5 bg-brand-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".txt,.md,.doc,.docx,.pdf"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="btn-secondary"
          >
            {isUploading ? <Loader2 size={18} className="animate-spin text-brand-500" /> : <Upload size={18} className="text-slate-400" />}
            <span className="hidden sm:inline">{isUploading ? 'Parsing...' : 'Import'}</span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowExportOptions(!showExportOptions)}
              className="btn-primary"
            >
              <Download size={18} />
              <span>Export</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${showExportOptions ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showExportOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-64 bg-white border border-slate-200/60 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden z-[100] p-2"
                >
                  <div className="px-4 py-3 mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Select Format</span>
                  </div>
                  <button
                    onClick={handlePrint}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-slate-700 hover:bg-slate-50 rounded-2xl transition-all group"
                  >
                    <div className="p-2 bg-red-50 text-red-500 rounded-xl group-hover:bg-red-100 transition-colors">
                      <Printer size={18} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-bold">PDF Document</span>
                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Professional Print</span>
                    </div>
                  </button>
                  <button
                    onClick={exportToDocx}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-slate-700 hover:bg-slate-50 rounded-2xl transition-all group"
                  >
                    <div className="p-2 bg-blue-50 text-blue-500 rounded-xl group-hover:bg-blue-100 transition-colors">
                      <FileCode size={18} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-bold">Word Document</span>
                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Editable DOCX</span>
                    </div>
                  </button>
                  <button
                    onClick={exportToTxt}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-slate-700 hover:bg-slate-50 rounded-2xl transition-all group"
                  >
                    <div className="p-2 bg-slate-50 text-slate-500 rounded-xl group-hover:bg-slate-100 transition-colors">
                      <FileText size={18} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-bold">Plain Text</span>
                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Raw TXT File</span>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {uploadError && (
        <div className="max-w-[1600px] mx-auto px-8 mt-6 print:hidden">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-3xl flex items-center gap-4 text-sm shadow-sm"
          >
            <AlertCircle size={20} />
            <span className="font-bold tracking-tight">{uploadError}</span>
            <button onClick={() => setUploadError(null)} className="ml-auto p-2 hover:bg-red-100 rounded-xl transition-colors">
              <AlertCircle size={18} className="rotate-45" />
            </button>
          </motion.div>
        </div>
      )}

      <main className="max-w-[1700px] mx-auto p-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-start print:p-0 print:block">
        {/* Editor/Wizard Column */}
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="print:hidden h-full"
        >
          {view === 'wizard' ? (
            <CVWizard data={cvData} onChange={setCvData} onComplete={() => {}} />
          ) : (
            <div className="sticky top-28">
              <CoverLetterGenerator cvData={cvData} />
            </div>
          )}
        </motion.div>

        {/* Preview Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`print:w-full print:max-w-none ${view === 'cover-letter' ? 'print:hidden' : ''}`}
        >
          <div className="sticky top-28">
            <div className="flex items-center justify-between mb-6 px-4 print:hidden">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 rounded-full bg-slate-200" />
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Live Preview</h2>
              </div>
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-100 border border-slate-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-100 border border-slate-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-100 border border-slate-200" />
              </div>
            </div>
            <div className="bg-white p-12 rounded-[3rem] border border-slate-200/50 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] print:p-0 print:bg-transparent print:border-none print:shadow-none overflow-hidden">
              <CVPreview data={cvData} />
            </div>
          </div>
        </motion.div>
      </main>

      {/* Print Styles */}
      <AnimatePresence>
        {isTailorModalOpen && (
          <CVTailor 
            cvData={cvData} 
            onTailored={(tailored) => {
              setCvData(tailored);
              setIsTailorModalOpen(false);
              setView('wizard');
            }}
            onClose={() => setIsTailorModalOpen(false)}
          />
        )}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { 
            margin: 0; 
            size: A4;
          }
          body { 
            background-color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:m-0 { margin: 0 !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-none { border: none !important; }
          .print\\:w-full { width: 100% !important; }
          .print\\:max-w-none { max-width: none !important; }
          
          /* Ensure the preview takes up the whole page */
          main { 
            display: block !important; 
            padding: 0 !important;
            margin: 0 !important;
          }
          .lg\\:grid-cols-\\[1fr_1fr\\] {
            display: block !important;
          }
          
          /* Hide everything except the preview column */
          main > div:first-child {
            display: none !important;
          }
          main > div:last-child {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .sticky {
            position: static !important;
          }
          .rounded-\\[3rem\\] {
            border-radius: 0 !important;
          }
          .shadow-\\[0_30px_80px_-20px_rgba\\(0,0,0,0\\.08\\)\\] {
            box-shadow: none !important;
          }
          .border-slate-200\\/50 {
            border: none !important;
          }
          /* Hide the "Live Preview" header during print */
          main > div:last-child > div > div:first-child {
            display: none !important;
          }
        }
      `}} />
    </div>
  );
}

