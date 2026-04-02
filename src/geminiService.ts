import { GoogleGenAI, Type } from "@google/genai";
import { CVData, OnboardingData } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const suggestSummary = async (onboarding: OnboardingData, skills: string[]) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a professional CV writer.
    Generate a concise and impactful professional summary (3–5 lines) based on:
    Job Title: ${onboarding.jobTitle}
    Experience Level: ${onboarding.experienceLevel}
    Key Skills: ${skills.join(', ')}
    Industry: ${onboarding.industry}
    Make it ATS-friendly, confident, and results-driven.`,
  });
  return response.text;
};

export const improveExperience = async (position: string, company: string, userInput: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Rewrite the following job experience into strong CV bullet points:
    Job Title: ${position}
    Company: ${company}
    Responsibilities: ${userInput}
    Rules:
    - Use action verbs
    - Include measurable achievements where possible
    - Keep each bullet under 20 words
    - Make it ATS-friendly`,
  });
  return response.text;
};

export const suggestSkills = async (onboarding: OnboardingData) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Suggest relevant skills for this role:
    Job Title: ${onboarding.jobTitle}
    Industry: ${onboarding.industry}
    Experience Level: ${onboarding.experienceLevel}
    Return:
    - 10 hard skills
    - 5 soft skills`,
  });
  return response.text;
};

export const getCVFeedback = async (cvData: CVData) => {
  const cvText = JSON.stringify(cvData);
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this CV content and provide improvement suggestions:
    ${cvText}
    Focus on:
    - Clarity
    - ATS optimization
    - Missing sections
    - Weak wording`,
  });
  return response.text;
};

export const tailorCV = async (cvData: CVData, jobDescription: string) => {
  const cvText = JSON.stringify(cvData);
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Tailor this CV for the following job description. 
    Return a JSON object matching the CVData schema. 
    Optimize keywords, align experience descriptions with the job requirements, and refine the summary to highlight relevant strengths.
    
    CV:
    ${cvText}
    
    Job Description:
    ${jobDescription}`,
    config: {
      responseMimeType: "application/json",
    },
  });
  
  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse tailored CV response", e);
    return null;
  }
};

export const getCareerRoadmap = async (onboarding: OnboardingData) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a comprehensive, personalized career roadmap and coaching suite for:
    Job Title: ${onboarding.jobTitle}
    Industry: ${onboarding.industry}
    Experience Level: ${onboarding.experienceLevel}
    
    Return a JSON object matching this schema:
    {
      "roadmap": [
        { 
          "step": "string", 
          "description": "string", 
          "timeframe": "string",
          "milestones": ["string"]
        }
      ],
      "skillsDevelopment": [
        {
          "skill": "string",
          "importance": "High" | "Medium" | "Low",
          "gap": "string",
          "resources": ["string"]
        }
      ],
      "strategy": {
        "jobSearch": ["string"],
        "networking": ["string"],
        "growthOpportunities": ["string"]
      },
      "interviewPrep": [
        {
          "question": "string",
          "sampleAnswer": "string",
          "keyPoints": ["string"]
        }
      ]
    }
    
    Requirements:
    - Provide at least 5 roadmap steps.
    - Identify at least 8 key skills with specific learning resources.
    - Provide at least 15 relevant interview questions with high-quality sample answers.
    - Ensure all advice is highly specific to the ${onboarding.jobTitle} role in the ${onboarding.industry} industry.`,
    config: {
      responseMimeType: "application/json",
    },
  });
  
  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse career roadmap response", e);
    return null;
  }
};

export const generateCoverLetter = async (cvData: CVData, targetJob: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a professional cover letter for the following job: "${targetJob}". 
    Use the following CV details for context:
    Name: ${cvData.personalInfo.fullName}
    Summary: ${cvData.personalInfo.summary}
    Experience: ${cvData.experiences.map((e: any) => `${e.position} at ${e.company}`).join(', ')}
    Skills: ${cvData.skills.join(', ')}
    
    The letter should be professional, engaging, and highlight relevant strengths.`,
  });
  return response.text;
};

export const parseCV = async (text: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Extract structured information from the following CV text and return it as a JSON object matching this schema:
    {
      "personalInfo": {
        "fullName": "string",
        "email": "string",
        "phone": "string",
        "location": "string",
        "linkedin": "string",
        "website": "string",
        "summary": "string"
      },
      "experiences": [
        {
          "company": "string",
          "position": "string",
          "startDate": "string",
          "endDate": "string",
          "description": "string"
        }
      ],
      "educations": [
        {
          "school": "string",
          "degree": "string",
          "startDate": "string",
          "endDate": "string",
          "description": "string"
        }
      ],
      "skills": ["string"]
    }
    
    CV Text:
    ${text}`,
    config: {
      responseMimeType: "application/json",
    },
  });
  
  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response as JSON", e);
    return null;
  }
};
