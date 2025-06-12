import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grip, Trash, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type SectionProps = {
  section: {
    id: string;
    type: string;
    title: string;
    content: Record<string, any>;
  };
  onDragStart: () => void;
  onUpdate: (content: Record<string, any>) => void;
  onDelete: () => void;
  showAISuggestions?: boolean;
};

const ResumeSection = ({ section, onDragStart, onUpdate, onDelete, showAISuggestions = false }: SectionProps) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleFieldChange = (field: string, value: any) => {
    const newContent = { ...section.content, [field]: value };
    onUpdate(newContent);
  };

  const handleJobChange = (jobIndex: number, field: string, value: any) => {
    const jobs = [...(section.content.jobs || [])];
    jobs[jobIndex] = { ...jobs[jobIndex], [field]: value };
    onUpdate({ ...section.content, jobs });
  };

  const handleAddJob = () => {
    const jobs = [...(section.content.jobs || [])];
    jobs.push({
      id: `job-${Date.now()}`,
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    onUpdate({ ...section.content, jobs });
  };

  const handleDeleteJob = (jobIndex: number) => {
    const jobs = [...(section.content.jobs || [])];
    jobs.splice(jobIndex, 1);
    onUpdate({ ...section.content, jobs });
  };

  const handleEducationChange = (eduIndex: number, field: string, value: any) => {
    const institutions = [...(section.content.institutions || [])];
    institutions[eduIndex] = { ...institutions[eduIndex], [field]: value };
    onUpdate({ ...section.content, institutions });
  };

  const handleAddEducation = () => {
    const institutions = [...(section.content.institutions || [])];
    institutions.push({
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    onUpdate({ ...section.content, institutions });
  };

  const handleAISuggest = (field: string, currentValue: string) => {
    const aiSuggestions: Record<string, string[]> = {
      name: ["John Smith", "Jonathan Doe", "J. Doe"],
      email: ["john.professional@email.com", "j.doe@company.co", "contact@johndoe.dev"],
      description: [
        "Led cross-functional team in developing scalable cloud architecture that reduced infrastructure costs by 35% while increasing system reliability.",
        "Spearheaded the redesign of legacy code base using modern patterns, resulting in 40% faster performance and improved developer productivity.",
        "Managed end-to-end development lifecycle for mission-critical applications serving over 1 million users, maintaining 99.9% uptime."
      ],
      summary: [
        "Seasoned software engineer with 7+ years of experience building robust applications using React, Node.js and AWS. Passionate about clean code, performance optimization, and creating exceptional user experiences.",
        "Results-driven software professional with expertise in full-stack development and cloud infrastructure. Proven track record of delivering high-quality solutions that drive business growth while mentoring junior developers.",
        "Innovative full-stack developer specialized in modern JavaScript frameworks with a strong focus on creating scalable, maintainable codebases and optimizing development workflows."
      ]
    };

    return aiSuggestions[field] || ["AI suggestion not available for this field"];
  };

  return (
    <Card 
      className="resumaker-module" 
      draggable 
      onDragStart={onDragStart}
    >
      <CardHeader className="p-3 flex flex-row items-center justify-between border-b">
        <div className="flex items-center">
          <Grip className="h-4 w-4 text-muted-foreground mr-2 cursor-grab" />
          <h3 className="text-sm font-medium">{section.title}</h3>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={toggleCollapse}>
            {collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive" onClick={onDelete}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className={cn("p-3 transition-all", collapsed && "hidden")}>
        {/* Contact section */}
        {section.type === 'contact' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between">
                <label className="text-xs text-muted-foreground">Name</label>
                {showAISuggestions && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4 text-primary">
                        <Sparkles className="h-3 w-3" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="end">
                      <div className="p-2 border-b">
                        <p className="text-sm font-medium">AI Suggestions</p>
                        <p className="text-xs text-muted-foreground">Choose one of these alternatives</p>
                      </div>
                      <div className="p-2 space-y-1">
                        {handleAISuggest('name', section.content.name).map((suggestion, idx) => (
                          <Button 
                            key={idx} 
                            variant="ghost" 
                            size="sm" 
                            className="w-full justify-start text-xs"
                            onClick={() => {
                              handleFieldChange('name', suggestion);
                              toast({
                                title: "Suggestion applied",
                                description: "Name updated with AI suggestion"
                              });
                            }}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
              <input 
                type="text" 
                className="w-full px-2 py-1 border border-border rounded-md text-sm" 
                value={section.content.name || ''} 
                onChange={(e) => handleFieldChange('name', e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <input 
                type="email" 
                className="w-full px-2 py-1 border border-border rounded-md text-sm" 
                value={section.content.email || ''} 
                onChange={(e) => handleFieldChange('email', e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Phone</label>
              <input 
                type="tel" 
                className="w-full px-2 py-1 border border-border rounded-md text-sm" 
                value={section.content.phone || ''} 
                onChange={(e) => handleFieldChange('phone', e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Location</label>
              <input 
                type="text" 
                className="w-full px-2 py-1 border border-border rounded-md text-sm" 
                value={section.content.location || ''} 
                onChange={(e) => handleFieldChange('location', e.target.value)}
              />
            </div>
          </div>
        )}
        
        {/* Summary section */}
        {section.type === 'summary' && (
          <div>
            <div className="flex justify-between items-center">
              <label className="text-xs text-muted-foreground">Professional Summary</label>
              {showAISuggestions && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-6 text-xs">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI Suggestions
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-0" align="end">
                    <div className="p-2 border-b">
                      <p className="text-sm font-medium">AI Suggested Summaries</p>
                      <p className="text-xs text-muted-foreground">Choose one of these polished professional summaries</p>
                    </div>
                    <div className="p-2 space-y-2">
                      {handleAISuggest('summary', section.content.text).map((suggestion, idx) => (
                        <div key={idx} className="border rounded-md p-2">
                          <p className="text-xs">{suggestion}</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full mt-1 text-xs"
                            onClick={() => {
                              handleFieldChange('text', suggestion);
                              toast({
                                title: "Suggestion applied",
                                description: "Summary updated with AI suggestion"
                              });
                            }}
                          >
                            Use This Summary
                          </Button>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            <textarea 
              className="w-full px-2 py-1 border border-border rounded-md text-sm mt-1" 
              rows={4}
              value={section.content.text || ''}
              onChange={(e) => handleFieldChange('text', e.target.value)}
            />
          </div>
        )}
        
        {/* Experience section */}
        {section.type === 'experience' && (
          <div className="space-y-4">
            {(section.content.jobs || []).map((job: any, index: number) => (
              <div key={job.id || index} className="border border-border rounded-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-muted-foreground">Experience #{index + 1}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive h-6"
                    onClick={() => handleDeleteJob(index)}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Job Title</label>
                    <input 
                      type="text" 
                      className="w-full px-2 py-1 border border-border rounded-md text-sm" 
                      value={job.title || ''} 
                      onChange={(e) => handleJobChange(index, 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Company</label>
                    <input 
                      type="text" 
                      className="w-full px-2 py-1 border border-border rounded-md text-sm" 
                      value={job.company || ''} 
                      onChange={(e) => handleJobChange(index, 'company', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Start Date</label>
                    <input 
                      type="text" 
                      className="w-full px-2 py-1 border border-border rounded-md text-sm" 
                      value={job.startDate || ''} 
                      onChange={(e) => handleJobChange(index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">End Date</label>
                    <input 
                      type="text" 
                      className="w-full px-2 py-1 border border-border rounded-md text-sm" 
                      value={job.endDate || ''} 
                      onChange={(e) => handleJobChange(index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label className="text-xs text-muted-foreground">Description</label>
                  <textarea 
                    className="w-full px-2 py-1 border border-border rounded-md text-sm mt-1" 
                    rows={3}
                    value={job.description || ''}
                    onChange={(e) => handleJobChange(index, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
            
            <Button size="sm" variant="outline" className="w-full" onClick={handleAddJob}>
              <Plus className="h-3 w-3 mr-1" />
              Add Job
            </Button>
          </div>
        )}
        
        {/* Education section */}
        {section.type === 'education' && (
          <div className="space-y-4">
            {(section.content.institutions || []).map((edu: any, index: number) => (
              <div key={edu.id || index} className="border border-border rounded-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-muted-foreground">Education #{index + 1}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive h-6"
                    onClick={() => {
                      const institutions = [...(section.content.institutions || [])];
                      institutions.splice(index, 1);
                      onUpdate({ ...section.content, institutions });
                    }}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Degree</label>
                    <input 
                      type="text" 
                      className="w-full px-2 py-1 border border-border rounded-md text-sm" 
                      value={edu.degree || ''} 
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Institution</label>
                    <input 
                      type="text" 
                      className="w-full px-2 py-1 border border-border rounded-md text-sm" 
                      value={edu.institution || ''} 
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Start Date</label>
                    <input 
                      type="text" 
                      className="w-full px-2 py-1 border border-border rounded-md text-sm" 
                      value={edu.startDate || ''} 
                      onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">End Date</label>
                    <input 
                      type="text" 
                      className="w-full px-2 py-1 border border-border rounded-md text-sm" 
                      value={edu.endDate || ''} 
                      onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button size="sm" variant="outline" className="w-full" onClick={handleAddEducation}>
              <Plus className="h-3 w-3 mr-1" />
              Add Education
            </Button>
          </div>
        )}
        
        {/* Other section types */}
        {(section.type !== 'contact' && section.type !== 'summary' && section.type !== 'experience' && section.type !== 'education') && (
          <div className="h-20 flex items-center justify-center text-muted-foreground text-sm">
            {section.title} section editor placeholder
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeSection;
