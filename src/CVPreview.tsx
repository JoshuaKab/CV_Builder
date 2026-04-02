import React from 'react';
import { CVData } from './types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
}

const ContactInfo = ({ personalInfo, className = "" }: { personalInfo: CVData['personalInfo'], className?: string }) => (
  <div className={`flex flex-wrap gap-y-2 gap-x-6 text-sm ${className}`}>
    {personalInfo.email && (
      <div className="flex items-center gap-1.5">
        <Mail size={14} className="opacity-70" />
        <span>{personalInfo.email}</span>
      </div>
    )}
    {personalInfo.phone && (
      <div className="flex items-center gap-1.5">
        <Phone size={14} className="opacity-70" />
        <span>{personalInfo.phone}</span>
      </div>
    )}
    {personalInfo.location && (
      <div className="flex items-center gap-1.5">
        <MapPin size={14} className="opacity-70" />
        <span>{personalInfo.location}</span>
      </div>
    )}
    {personalInfo.linkedin && (
      <div className="flex items-center gap-1.5">
        <Linkedin size={14} className="opacity-70" />
        <span>{personalInfo.linkedin}</span>
      </div>
    )}
    {personalInfo.website && (
      <div className="flex items-center gap-1.5">
        <Globe size={14} className="opacity-70" />
        <span>{personalInfo.website}</span>
      </div>
    )}
  </div>
);

const ModernTemplate = ({ data }: { data: CVData }) => {
  const { personalInfo, experiences, educations, skills, projects } = data;
  return (
    <div className="bg-white p-16 min-h-[1056px] w-full max-w-[816px] mx-auto text-slate-800 print:p-0 print:m-0">
      <header className="mb-16">
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 text-slate-900 leading-none">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="h-2 w-24 bg-brand-600 mb-8" />
        <ContactInfo personalInfo={personalInfo} className="text-slate-500 font-bold uppercase tracking-widest text-[10px]" />
      </header>

      <div className="grid grid-cols-[1fr_2.5fr] gap-16">
        <aside className="space-y-12">
          {skills.length > 0 && skills[0] !== '' && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Expertise</h2>
              <div className="flex flex-col gap-3">
                {skills.map((skill, index) => (
                  <div key={index} className="text-xs font-bold text-slate-700 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-600 rounded-full" />
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {educations.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Education</h2>
              <div className="space-y-8">
                {educations.map((edu) => (
                  <div key={edu.id} className="space-y-2">
                    <h3 className="text-sm font-black text-slate-900 leading-tight">{edu.degree || 'Degree'}</h3>
                    <div className="text-[11px] font-bold text-brand-600 uppercase tracking-wider">{edu.school || 'School Name'}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        <main className="space-y-16">
          {personalInfo.summary && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">Profile</h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-[15px] font-medium">{personalInfo.summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Experience</h2>
              <div className="space-y-12">
                {experiences.map((exp) => (
                  <div key={exp.id} className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">{exp.position || 'Position'}</h3>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-brand-600">{exp.company || 'Company Name'}</div>
                    <p className="text-slate-600 text-[14px] leading-relaxed whitespace-pre-wrap font-medium">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Projects</h2>
              <div className="space-y-10">
                {projects.map((project) => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">{project.name}</h3>
                      {project.link && <span className="text-[10px] font-bold text-brand-600 uppercase tracking-widest">{project.link}</span>}
                    </div>
                    <p className="text-slate-600 text-[14px] leading-relaxed whitespace-pre-wrap font-medium">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

const ClassicTemplate = ({ data }: { data: CVData }) => {
  const { personalInfo, experiences, educations, skills, projects } = data;
  return (
    <div className="bg-white p-16 min-h-[1056px] w-full max-w-[816px] mx-auto text-slate-900 font-serif print:p-0 print:m-0">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex justify-center flex-wrap gap-x-6 text-xs text-slate-500 font-sans uppercase tracking-widest">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        <div className="w-full h-px bg-slate-200 mt-8" />
      </header>

      {personalInfo.summary && (
        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 text-center">Executive Summary</h2>
          <p className="text-slate-700 leading-relaxed text-[15px] text-center max-w-2xl mx-auto italic">{personalInfo.summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-8 border-b border-slate-100 pb-2">Professional Experience</h2>
          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-lg font-bold text-slate-900">{exp.company}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="text-sm italic text-slate-600 mb-3">{exp.position}</div>
                <p className="text-slate-700 text-[14px] leading-relaxed whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-8 border-b border-slate-100 pb-2">Key Projects</h2>
          <div className="space-y-8">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-lg font-bold text-slate-900">{project.name}</span>
                  {project.link && <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{project.link}</span>}
                </div>
                <p className="text-slate-700 text-[14px] leading-relaxed whitespace-pre-wrap">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-12">
        {educations.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 border-b border-slate-100 pb-2">Education</h2>
            <div className="space-y-6">
              {educations.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-900">{edu.school}</div>
                  <div className="text-sm italic text-slate-600">{edu.degree}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && skills[0] !== '' && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 border-b border-slate-100 pb-2">Core Competencies</h2>
            <div className="text-sm text-slate-700 leading-loose">
              {skills.join(' • ')}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const MinimalTemplate = ({ data }: { data: CVData }) => {
  const { personalInfo, experiences, educations, skills, projects } = data;
  return (
    <div className="bg-white p-20 min-h-[1056px] w-full max-w-[816px] mx-auto text-slate-700 font-sans print:p-0 print:m-0">
      <header className="mb-20">
        <h1 className="text-7xl font-light tracking-tighter text-slate-900 mb-6 leading-none">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      <div className="space-y-20">
        {personalInfo.summary && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">About</h2>
            <p className="text-lg font-medium leading-relaxed text-slate-600 max-w-2xl">{personalInfo.summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Experience</h2>
            <div className="space-y-16">
              {experiences.map((exp) => (
                <div key={exp.id} className="grid grid-cols-[1fr_3fr] gap-12">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 pt-1">
                    {exp.startDate} – {exp.endDate}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{exp.position}</h3>
                    <p className="text-sm font-black uppercase tracking-widest text-brand-600">{exp.company}</p>
                    <p className="text-[15px] leading-relaxed text-slate-500 whitespace-pre-wrap">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Projects</h2>
            <div className="space-y-16">
              {projects.map((project) => (
                <div key={project.id} className="grid grid-cols-[1fr_3fr] gap-12">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 pt-1">
                    {project.link || 'Project'}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{project.name}</h3>
                    <p className="text-[15px] leading-relaxed text-slate-500 whitespace-pre-wrap">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-20">
          {educations.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Education</h2>
              <div className="space-y-8">
                {educations.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <p className="font-bold text-slate-900">{edu.degree}</p>
                    <p className="text-sm text-slate-500">{edu.school}</p>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && skills[0] !== '' && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Skills</h2>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {skills.map((skill, i) => (
                  <span key={i} className="text-sm font-bold text-slate-600 uppercase tracking-widest">{skill}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

const CreativeTemplate = ({ data }: { data: CVData }) => {
  const { personalInfo, experiences, educations, skills, projects } = data;
  return (
    <div className="bg-white min-h-[1056px] w-full max-w-[816px] mx-auto text-slate-800 flex print:m-0">
      {/* Sidebar */}
      <aside className="w-[35%] bg-slate-950 text-white p-12 flex flex-col">
        <div className="mb-16">
          <h1 className="text-4xl font-black leading-[0.9] tracking-tighter mb-6 uppercase">{personalInfo.fullName || 'Your Name'}</h1>
          <div className="h-1.5 w-12 bg-brand-500" />
        </div>

        <div className="flex-1 space-y-16">
          <section className="space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-400">Contact</h2>
            <div className="space-y-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              {personalInfo.email && <div className="flex items-center gap-3"><Mail size={14} className="text-brand-500" /> {personalInfo.email}</div>}
              {personalInfo.phone && <div className="flex items-center gap-3"><Phone size={14} className="text-brand-500" /> {personalInfo.phone}</div>}
              {personalInfo.location && <div className="flex items-center gap-3"><MapPin size={14} className="text-brand-500" /> {personalInfo.location}</div>}
            </div>
          </section>

          {skills.length > 0 && skills[0] !== '' && (
            <section className="space-y-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-400">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {educations.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-400">Education</h2>
              <div className="space-y-8">
                {educations.map((edu) => (
                  <div key={edu.id} className="space-y-2">
                    <p className="text-sm font-black leading-tight">{edu.degree}</p>
                    <p className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">{edu.school}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-[65%] p-16 space-y-16 bg-white">
        {personalInfo.summary && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Profile</h2>
            <p className="text-slate-600 leading-relaxed text-[15px] font-medium">{personalInfo.summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Experience</h2>
            <div className="space-y-12">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-8 border-l-2 border-slate-50">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-500 border-4 border-white shadow-sm" />
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{exp.position}</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-brand-600 mb-4">{exp.company}</p>
                  <p className="text-[14px] text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Projects</h2>
            <div className="space-y-12">
              {projects.map((project) => (
                <div key={project.id} className="relative pl-8 border-l-2 border-slate-50">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-500 border-4 border-white shadow-sm" />
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{project.name}</h3>
                    {project.link && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{project.link}</span>}
                  </div>
                  <p className="text-[14px] text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

const ExecutiveTemplate = ({ data }: { data: CVData }) => {
  const { personalInfo, experiences, educations, skills, projects } = data;
  return (
    <div className="bg-white p-16 min-h-[1056px] w-full max-w-[816px] mx-auto text-slate-900 font-serif border-t-[12px] border-slate-900 print:p-0 print:m-0 print:border-t-0">
      <header className="mb-12 border-b-2 border-slate-100 pb-12">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900">{personalInfo.fullName || 'Your Name'}</h1>
          <div className="text-right space-y-1 text-xs font-sans font-bold text-slate-400 uppercase tracking-widest">
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.email && <div>{personalInfo.email}</div>}
          </div>
        </div>
        {personalInfo.summary && (
          <p className="text-lg leading-relaxed text-slate-600 italic max-w-3xl">{personalInfo.summary}</p>
        )}
      </header>

      <div className="space-y-12">
        {experiences.length > 0 && (
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900 mb-8 flex items-center gap-4">
              Professional Experience
              <div className="h-px flex-1 bg-slate-100" />
            </h2>
            <div className="space-y-10">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div className="text-sm font-bold text-brand-600 uppercase tracking-widest">{exp.company}</div>
                  <p className="text-slate-700 text-[14px] leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-16">
          <div className="space-y-12">
            {educations.length > 0 && (
              <section>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900 mb-6">Education</h2>
                <div className="space-y-6">
                  {educations.map((edu) => (
                    <div key={edu.id} className="space-y-1">
                      <div className="font-bold text-slate-900">{edu.degree}</div>
                      <div className="text-sm text-slate-600">{edu.school}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{edu.startDate} – {edu.endDate}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          <div className="space-y-12">
            {skills.length > 0 && skills[0] !== '' && (
              <section>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900 mb-6">Core Skills</h2>
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-700 font-medium">
                  {skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-slate-300 rounded-full" />
                      {skill}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TechnicalTemplate = ({ data }: { data: CVData }) => {
  const { personalInfo, experiences, educations, skills, projects } = data;
  return (
    <div className="bg-white p-12 min-h-[1056px] w-full max-w-[816px] mx-auto text-slate-800 font-mono text-[13px] print:p-0 print:m-0">
      <header className="mb-10 border-b-2 border-slate-900 pb-8">
        <h1 className="text-4xl font-black mb-4 tracking-tighter">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-slate-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </header>

      <div className="space-y-10">
        {personalInfo.summary && (
          <section>
            <h2 className="text-sm font-black bg-slate-900 text-white px-3 py-1 w-fit mb-4">01. SUMMARY</h2>
            <p className="leading-relaxed text-slate-600">{personalInfo.summary}</p>
          </section>
        )}

        {skills.length > 0 && skills[0] !== '' && (
          <section>
            <h2 className="text-sm font-black bg-slate-900 text-white px-3 py-1 w-fit mb-4">02. TECH_STACK</h2>
            <div className="grid grid-cols-3 gap-2">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-brand-600">&gt;</span>
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <h2 className="text-sm font-black bg-slate-900 text-white px-3 py-1 w-fit mb-6">03. EXPERIENCE</h2>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex justify-between font-black text-slate-900">
                    <span>{exp.position} @ {exp.company}</span>
                    <span>[{exp.startDate} - {exp.endDate}]</span>
                  </div>
                  <p className="leading-relaxed text-slate-600 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-sm font-black bg-slate-900 text-white px-3 py-1 w-fit mb-6">04. PROJECTS</h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="space-y-1">
                  <div className="flex justify-between font-black text-slate-900">
                    <span>{project.name}</span>
                    {project.link && <span className="text-brand-600">{project.link}</span>}
                  </div>
                  <p className="leading-relaxed text-slate-600 whitespace-pre-wrap">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const BoldTemplate = ({ data }: { data: CVData }) => {
  const { personalInfo, experiences, educations, skills, projects } = data;
  return (
    <div className="bg-white min-h-[1056px] w-full max-w-[816px] mx-auto text-slate-900 flex print:m-0">
      <div className="w-24 bg-brand-600 flex flex-col items-center py-12 gap-12">
        <div className="w-12 h-12 rounded-full bg-white/20" />
        <div className="w-12 h-12 rounded-full bg-white/20" />
        <div className="w-12 h-12 rounded-full bg-white/20" />
      </div>
      <div className="flex-1 p-16 space-y-12">
        <header>
          <h1 className="text-7xl font-black tracking-tighter uppercase leading-none mb-6">{personalInfo.fullName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-6 text-xs font-black uppercase tracking-widest text-slate-400">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </header>

        <div className="grid grid-cols-[2fr_1fr] gap-16">
          <div className="space-y-12">
            {personalInfo.summary && (
              <section>
                <h2 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-4">
                  Profile
                  <div className="h-1 flex-1 bg-slate-900" />
                </h2>
                <p className="text-lg leading-relaxed font-medium text-slate-600">{personalInfo.summary}</p>
              </section>
            )}

            {experiences.length > 0 && (
              <section>
                <h2 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-4">
                  Experience
                  <div className="h-1 flex-1 bg-slate-900" />
                </h2>
                <div className="space-y-10">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-2xl font-black tracking-tight">{exp.position}</h3>
                        <span className="text-xs font-black text-brand-600 uppercase tracking-widest">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <div className="text-sm font-black uppercase tracking-widest text-slate-400">{exp.company}</div>
                      <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-12">
            {skills.length > 0 && skills[0] !== '' && (
              <section>
                <h2 className="text-xl font-black uppercase tracking-tight mb-6">Skills</h2>
                <div className="flex flex-col gap-3">
                  {skills.map((skill, i) => (
                    <div key={i} className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-black uppercase tracking-widest text-slate-600">
                      {skill}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {educations.length > 0 && (
              <section>
                <h2 className="text-xl font-black uppercase tracking-tight mb-6">Education</h2>
                <div className="space-y-6">
                  {educations.map((edu) => (
                    <div key={edu.id} className="space-y-1">
                      <div className="font-black text-slate-900 leading-tight">{edu.degree}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{edu.school}</div>
                      <div className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{edu.startDate} – {edu.endDate}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CVPreview: React.FC<CVPreviewProps> = ({ data }) => {
  switch (data.templateId) {
    case 'classic':
      return <ClassicTemplate data={data} />;
    case 'minimal':
      return <MinimalTemplate data={data} />;
    case 'creative':
      return <CreativeTemplate data={data} />;
    case 'executive':
      return <ExecutiveTemplate data={data} />;
    case 'technical':
      return <TechnicalTemplate data={data} />;
    case 'bold':
      return <BoldTemplate data={data} />;
    case 'modern':
    default:
      return <ModernTemplate data={data} />;
  }
};
