
'use client'

import { useResume } from './Editor'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Trash2, PlusCircle, User, Briefcase, GraduationCap, Star, Heart, ArrowLeft, ArrowRight } from 'lucide-react'
import type { ChangeEvent } from 'react'
import { AIGenerator } from './AIGenerator'
import { useState, useCallback, memo } from 'react'
import { Progress } from '@/components/ui/progress'

const PersonalInfoForm = memo(function PersonalInfoForm() {
  const { resumeData, setResumeData } = useResume();
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    setResumeData(prev => ({
      ...prev,
      [keys[0]]: { ...prev.personalInfo, [keys[1]]: value },
    }));
  };

  return (
    <div className="space-y-4 p-2">
      <div><Label htmlFor="personalInfo.name">Full Name</Label><Input id="personalInfo.name" name="personalInfo.name" value={resumeData.personalInfo.name} onChange={handleChange} /></div>
      <div><Label htmlFor="personalInfo.title">Title</Label><Input id="personalInfo.title" name="personalInfo.title" value={resumeData.personalInfo.title} onChange={handleChange} /></div>
      <div><Label htmlFor="personalInfo.phone">Phone</Label><Input id="personalInfo.phone" name="personalInfo.phone" value={resumeData.personalInfo.phone} onChange={handleChange} /></div>
      <div><Label htmlFor="personalInfo.email">Email</Label><Input id="personalInfo.email" name="personalInfo.email" value={resumeData.personalInfo.email} onChange={handleChange} /></div>
      <div><Label htmlFor="personalInfo.location">Location</Label><Input id="personalInfo.location" name="personalInfo.location" value={resumeData.personalInfo.location} onChange={handleChange} /></div>
      <div><Label htmlFor="personalInfo.linkedin">LinkedIn</Label><Input id="personalInfo.linkedin" name="personalInfo.linkedin" value={resumeData.personalInfo.linkedin} onChange={handleChange} /></div>
      <div><Label htmlFor="personalInfo.website">Website</Label><Input id="personalInfo.website" name="personalInfo.website" value={resumeData.personalInfo.website} onChange={handleChange} /></div>
    </div>
  );
});

const SummaryForm = memo(function SummaryForm() {
  const { resumeData, setResumeData } = useResume();
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData(prev => ({ ...prev, summary: e.target.value }));
  };
  const onSuggestionSelect = useCallback((suggestion: string) => {
    setResumeData(prev => ({ ...prev, summary: suggestion }));
  }, [setResumeData]);

  return (
    <div className="space-y-4 p-2">
      <Label>Professional Summary</Label>
      <Textarea name="summary" value={resumeData.summary} onChange={handleChange} rows={8} />
      <AIGenerator fieldName="summary" onSuggestionSelect={onSuggestionSelect} />
    </div>
  );
});

const ExperienceForm = memo(function ExperienceForm() {
    const { resumeData, setResumeData } = useResume();

    const handleArrayChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => {
            const newArray = [...prev.experience];
            newArray[index] = { ...newArray[index], [name]: value };
            return { ...prev, experience: newArray };
        });
    };

    const addArrayItem = () => {
        const newItem = { id: `exp-${Date.now()}`, title: '', company: '', location: '', startDate: '', endDate: '', description: '' };
        setResumeData(prev => ({ ...prev, experience: [...prev.experience, newItem] }));
    };

    const removeArrayItem = (index: number) => {
        setResumeData(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
    };
    
    return (
        <div className="space-y-4 p-2">
            {resumeData.experience.map((exp, expIndex) => (
                <Card key={exp.id}>
                    <CardContent className="p-4 space-y-4 relative">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeArrayItem(expIndex)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        <div><Label>Title</Label><Input name="title" value={exp.title} onChange={(e) => handleArrayChange(expIndex, e)} /></div>
                        <div><Label>Company</Label><Input name="company" value={exp.company} onChange={(e) => handleArrayChange(expIndex, e)} /></div>
                        <div><Label>Location</Label><Input name="location" value={exp.location} onChange={(e) => handleArrayChange(expIndex, e)} /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><Label>Start Date</Label><Input name="startDate" value={exp.startDate} onChange={(e) => handleArrayChange(expIndex, e)} /></div>
                            <div><Label>End Date</Label><Input name="endDate" value={exp.endDate} onChange={(e) => handleArrayChange(expIndex, e)} /></div>
                        </div>
                        <div><Label>Description</Label><Textarea name="description" value={exp.description} onChange={(e) => handleArrayChange(expIndex, e)} rows={4} /></div>
                    </CardContent>
                </Card>
            ))}
            <Button variant="outline" onClick={addArrayItem}><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
        </div>
    );
});

const EducationForm = memo(function EducationForm() {
    const { resumeData, setResumeData } = useResume();

    const handleArrayChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => {
            const newArray = [...prev.education];
            newArray[index] = { ...newArray[index], [name]: value };
            return { ...prev, education: newArray };
        });
    };

    const addArrayItem = () => {
        const newItem = { id: `edu-${Date.now()}`, school: '', degree: '', location: '', startDate: '', endDate: '' };
        setResumeData(prev => ({ ...prev, education: [...prev.education, newItem] }));
    };

    const removeArrayItem = (index: number) => {
        setResumeData(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
    };

    return (
        <div className="space-y-4 p-2">
            {resumeData.education.map((edu, eduIndex) => (
                <Card key={edu.id}>
                    <CardContent className="p-4 space-y-4 relative">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeArrayItem(eduIndex)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        <div><Label>School</Label><Input name="school" value={edu.school} onChange={(e) => handleArrayChange(eduIndex, e)} /></div>
                        <div><Label>Degree</Label><Input name="degree" value={edu.degree} onChange={(e) => handleArrayChange(eduIndex, e)} /></div>
                        <div><Label>Location</Label><Input name="location" value={edu.location} onChange={(e) => handleArrayChange(eduIndex, e)} /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><Label>Start Date</Label><Input name="startDate" value={edu.startDate} onChange={(e) => handleArrayChange(eduIndex, e)} /></div>
                            <div><Label>End Date</Label><Input name="endDate" value={edu.endDate} onChange={(e) => handleArrayChange(eduIndex, e)} /></div>
                        </div>
                    </CardContent>
                </Card>
            ))}
            <Button variant="outline" onClick={addArrayItem}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
        </div>
    );
});

const SkillsForm = memo(function SkillsForm() {
    const { resumeData, setResumeData } = useResume();

    const handleArrayChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => {
            const newArray = [...prev.skills];
            newArray[index] = { ...newArray[index], [name]: value };
            return { ...prev, skills: newArray };
        });
    };

    const addArrayItem = () => {
        const newItem = { id: `skill-${Date.now()}`, name: '' };
        setResumeData(prev => ({ ...prev, skills: [...prev.skills, newItem] }));
    };

    const removeArrayItem = (index: number) => {
        setResumeData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
    };

    const onSuggestionSelect = useCallback((suggestion: string) => {
        const newSkill = { id: `skill-${Date.now()}`, name: suggestion };
        setResumeData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
    }, [setResumeData]);

    return (
        <div className="space-y-4 p-2">
            <Label>Skills</Label>
            <div className="grid grid-cols-2 gap-4">
                {resumeData.skills.map((skill, skillIndex) => (
                    <div key={skill.id} className="flex items-center gap-2">
                        <Input name="name" value={skill.name} onChange={(e) => handleArrayChange(skillIndex, e)} />
                        <Button variant="ghost" size="icon" onClick={() => removeArrayItem(skillIndex)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                ))}
            </div>
            <Button variant="outline" onClick={addArrayItem}><PlusCircle className="mr-2 h-4 w-4" /> Add Skill</Button>
            <AIGenerator fieldName="skills" onSuggestionSelect={onSuggestionSelect} />
        </div>
    );
});

const HobbiesForm = memo(function HobbiesForm() {
    const { resumeData, setResumeData } = useResume();

    const handleArrayChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => {
            const newArray = [...prev.hobbies];
            newArray[index] = { ...newArray[index], [name]: value };
            return { ...prev, hobbies: newArray };
        });
    };

    const addArrayItem = () => {
        const newItem = { id: `hobby-${Date.now()}`, name: '' };
        setResumeData(prev => ({ ...prev, hobbies: [...prev.hobbies, newItem] }));
    };

    const removeArrayItem = (index: number) => {
        setResumeData(prev => ({ ...prev, hobbies: prev.hobbies.filter((_, i) => i !== index) }));
    };

    const onSuggestionSelect = useCallback((suggestion: string) => {
        const newHobby = { id: `hobby-${Date.now()}`, name: suggestion };
        setResumeData(prev => ({ ...prev, hobbies: [...prev.hobbies, newHobby] }));
    }, [setResumeData]);

    return (
        <div className="space-y-4 p-2">
            <Label>Hobbies</Label>
            <div className="grid grid-cols-2 gap-4">
                {resumeData.hobbies.map((hobby, hobbyIndex) => (
                    <div key={hobby.id} className="flex items-center gap-2">
                        <Input name="name" value={hobby.name} onChange={(e) => handleArrayChange(hobbyIndex, e)} />
                        <Button variant="ghost" size="icon" onClick={() => removeArrayItem(hobbyIndex)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                ))}
            </div>
            <Button variant="outline" onClick={addArrayItem}><PlusCircle className="mr-2 h-4 w-4" /> Add Hobby</Button>
            <AIGenerator fieldName="hobbies" onSuggestionSelect={onSuggestionSelect} />
        </div>
    );
});

const steps = [
  { id: 'personal-info', name: 'Personal Info', icon: User, Component: PersonalInfoForm },
  { id: 'summary', name: 'Summary', icon: Briefcase, Component: SummaryForm },
  { id: 'experience', name: 'Experience', icon: Briefcase, Component: ExperienceForm },
  { id: 'education', name: 'Education', icon: GraduationCap, Component: EducationForm },
  { id: 'skills', name: 'Skills', icon: Star, Component: SkillsForm },
  { id: 'hobbies', name: 'Hobbies', icon: Heart, Component: HobbiesForm },
];

export default function ResumeForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].Component;
  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
            <CurrentIcon className="text-primary" />
            {steps[currentStep].name}
          </h2>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <div className="space-y-4">
        <CurrentStepComponent />
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={nextStep} disabled={currentStep === steps.length - 1}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
