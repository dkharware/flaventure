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
import { useState, useCallback } from 'react'
import { Progress } from '@/components/ui/progress'

const steps = [
  { id: 'personal-info', name: 'Personal Info', icon: User },
  { id: 'summary', name: 'Summary', icon: Briefcase },
  { id: 'experience', name: 'Experience', icon: Briefcase },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'skills', name: 'Skills', icon: Star },
  { id: 'hobbies', name: 'Hobbies', icon: Heart },
];

export default function ResumeForm() {
  const { resumeData, setResumeData } = useResume()
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const keys = name.split('.')
    if (keys.length === 2) {
      const [section, key] = keys
      setResumeData(prev => ({
        ...prev,
        [section]: {
          ...(prev as any)[section],
          [key]: value,
        },
      }))
    } else {
      setResumeData(prev => ({...prev, [name]: value}))
    }
  }

  const handleArrayChange = (section: 'experience' | 'education' | 'skills' | 'hobbies', index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setResumeData(prev => {
      const newArray = [...(prev as any)[section]]
      const itemToUpdate = {...newArray[index], [name]: value};
      newArray[index] = itemToUpdate;
      return { ...prev, [section]: newArray }
    })
  }
  
  const addArrayItem = (section: 'experience' | 'education' | 'skills' | 'hobbies') => {
    let newItem;
    const id = `${section}-${Date.now()}`;
    switch(section) {
      case 'experience':
        newItem = { id, title: '', company: '', location: '', startDate: '', endDate: '', description: '' };
        break;
      case 'education':
        newItem = { id, school: '', degree: '', location: '', startDate: '', endDate: '' };
        break;
      case 'skills':
        newItem = { id, name: '' };
        break;
      case 'hobbies':
        newItem = { id, name: '' };
        break;
    }
    setResumeData(prev => ({ ...prev, [section]: [...(prev as any)[section], newItem] }));
  }

  const removeArrayItem = (section: 'experience' | 'education' | 'skills' | 'hobbies', index: number) => {
    setResumeData(prev => ({ ...prev, [section]: (prev as any)[section].filter((_: any, i: number) => i !== index) }));
  }

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

  const onSummarySuggestionSelect = useCallback((suggestion: string) => {
    setResumeData(prev => ({...prev, summary: suggestion}));
  }, [setResumeData]);

  const onSkillsSuggestionSelect = useCallback((suggestion: string) => {
    const newSkill = {id: `skill-${Date.now()}`, name: suggestion };
    setResumeData(prev => ({...prev, skills: [...prev.skills, newSkill]}));
  }, [setResumeData]);

  const onHobbiesSuggestionSelect = useCallback((suggestion: string) => {
    const newHobby = {id: `hobby-${Date.now()}`, name: suggestion };
    setResumeData(prev => ({...prev, hobbies: [...prev.hobbies, newHobby]}));
  }, [setResumeData]);

  const progress = ((currentStep + 1) / steps.length) * 100;
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
        {steps[currentStep].id === 'personal-info' && (
           <div className="space-y-4 p-2">
            <div><Label htmlFor="personalInfo.name">Full Name</Label><Input id="personalInfo.name" name="personalInfo.name" value={resumeData.personalInfo.name} onChange={handleChange} /></div>
            <div><Label htmlFor="personalInfo.title">Title</Label><Input id="personalInfo.title" name="personalInfo.title" value={resumeData.personalInfo.title} onChange={handleChange} /></div>
            <div><Label htmlFor="personalInfo.phone">Phone</Label><Input id="personalInfo.phone" name="personalInfo.phone" value={resumeData.personalInfo.phone} onChange={handleChange} /></div>
            <div><Label htmlFor="personalInfo.email">Email</Label><Input id="personalInfo.email" name="personalInfo.email" value={resumeData.personalInfo.email} onChange={handleChange} /></div>
            <div><Label htmlFor="personalInfo.location">Location</Label><Input id="personalInfo.location" name="personalInfo.location" value={resumeData.personalInfo.location} onChange={handleChange} /></div>
            <div><Label htmlFor="personalInfo.linkedin">LinkedIn</Label><Input id="personalInfo.linkedin" name="personalInfo.linkedin" value={resumeData.personalInfo.linkedin} onChange={handleChange} /></div>
            <div><Label htmlFor="personalInfo.website">Website</Label><Input id="personalInfo.website" name="personalInfo.website" value={resumeData.personalInfo.website} onChange={handleChange} /></div>
          </div>
        )}

        {steps[currentStep].id === 'summary' && (
          <div className="space-y-4 p-2">
            <Label>Professional Summary</Label>
            <Textarea name="summary" value={resumeData.summary} onChange={handleChange} rows={8} />
            <AIGenerator
                fieldName="summary"
                onSuggestionSelect={onSummarySuggestionSelect}
              />
          </div>
        )}

        {steps[currentStep].id === 'experience' && (
          <div className="space-y-4 p-2">
            {resumeData.experience.map((exp, index) => (
              <Card key={exp.id}>
                <CardContent className="p-4 space-y-4 relative">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeArrayItem('experience', index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  <div><Label>Title</Label><Input name="title" value={exp.title} onChange={(e) => handleArrayChange('experience', index, e)} /></div>
                  <div><Label>Company</Label><Input name="company" value={exp.company} onChange={(e) => handleArrayChange('experience', index, e)} /></div>
                  <div><Label>Location</Label><Input name="location" value={exp.location} onChange={(e) => handleArrayChange('experience', index, e)} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Start Date</Label><Input name="startDate" value={exp.startDate} onChange={(e) => handleArrayChange('experience', index, e)} /></div>
                    <div><Label>End Date</Label><Input name="endDate" value={exp.endDate} onChange={(e) => handleArrayChange('experience', index, e)} /></div>
                  </div>
                  <div><Label>Description</Label><Textarea name="description" value={exp.description} onChange={(e) => handleArrayChange('experience', index, e)} rows={4} /></div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={() => addArrayItem('experience')}><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
          </div>
        )}

        {steps[currentStep].id === 'education' && (
           <div className="space-y-4 p-2">
            {resumeData.education.map((edu, index) => (
              <Card key={edu.id}>
                <CardContent className="p-4 space-y-4 relative">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeArrayItem('education', index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  <div><Label>School</Label><Input name="school" value={edu.school} onChange={(e) => handleArrayChange('education', index, e)} /></div>
                  <div><Label>Degree</Label><Input name="degree" value={edu.degree} onChange={(e) => handleArrayChange('education', index, e)} /></div>
                  <div><Label>Location</Label><Input name="location" value={edu.location} onChange={(e) => handleArrayChange('education', index, e)} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Start Date</Label><Input name="startDate" value={edu.startDate} onChange={(e) => handleArrayChange('education', index, e)} /></div>
                    <div><Label>End Date</Label><Input name="endDate" value={edu.endDate} onChange={(e) => handleArrayChange('education', index, e)} /></div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={() => addArrayItem('education')}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
          </div>
        )}

        {steps[currentStep].id === 'skills' && (
          <div className="space-y-4 p-2">
            <Label>Skills</Label>
            <div className="grid grid-cols-2 gap-4">
            {resumeData.skills.map((skill, index) => (
              <div key={skill.id} className="flex items-center gap-2">
                <Input name="name" value={skill.name} onChange={(e) => handleArrayChange('skills', index, e)} />
                <Button variant="ghost" size="icon" onClick={() => removeArrayItem('skills', index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            ))}
            </div>
            <Button variant="outline" onClick={() => addArrayItem('skills')}><PlusCircle className="mr-2 h-4 w-4" /> Add Skill</Button>
            <AIGenerator
                fieldName="skills"
                onSuggestionSelect={onSkillsSuggestionSelect}
              />
          </div>
        )}

        {steps[currentStep].id === 'hobbies' && (
          <div className="space-y-4 p-2">
             <Label>Hobbies</Label>
            <div className="grid grid-cols-2 gap-4">
              {resumeData.hobbies.map((hobby, index) => (
                <div key={hobby.id} className="flex items-center gap-2">
                  <Input name="name" value={hobby.name} onChange={(e) => handleArrayChange('hobbies', index, e)} />
                  <Button variant="ghost" size="icon" onClick={() => removeArrayItem('hobbies', index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={() => addArrayItem('hobbies')}><PlusCircle className="mr-2 h-4 w-4" /> Add Hobby</Button>
             <AIGenerator
                fieldName="hobbies"
                onSuggestionSelect={onHobbiesSuggestionSelect}
              />
          </div>
        )}
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
