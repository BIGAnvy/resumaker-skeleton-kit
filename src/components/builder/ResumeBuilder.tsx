
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Save, 
  Download, 
  Plus, 
  Sparkles, 
  Settings,
  Share2,
  AlertTriangle
} from 'lucide-react';
import ResumeSection from './ResumeSection';
import ResumePreview from './ResumePreview';
import LanguageSelector from './LanguageSelector';
import { useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import VersionHistory from '../version/VersionHistory';
import TagInput from '../inputs/TagInput';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ExportOptions from '../export/ExportOptions';
import ErrorFallback from '../ui/error-fallback';

type SectionType = {
  id: string;
  type: 'contact' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'custom';
  title: string;
  content: Record<string, any>;
};

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Demo data for UI skeleton
  const [sections, setSections] = useState<SectionType[]>([
    { 
      id: '1', 
      type: 'contact', 
      title: 'Contact Information', 
      content: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(123) 456-7890',
        location: 'New York, NY'
      } 
    },
    { 
      id: '2', 
      type: 'summary', 
      title: 'Professional Summary', 
      content: {
        text: 'Experienced software engineer with a passion for building scalable applications.'
      } 
    },
    { 
      id: '3', 
      type: 'experience', 
      title: 'Work Experience', 
      content: {
        jobs: [
          { 
            title: 'Senior Software Engineer', 
            company: 'Tech Corp', 
            location: 'Remote',
            startDate: 'Jan 2021', 
            endDate: 'Present',
            description: 'Leading development of cloud-native applications.'
          }
        ]
      } 
    }
  ]);
  
  const [resumeTitle, setResumeTitle] = useState('Software Engineer Resume');
  const [language, setLanguage] = useState('en-US');
  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [viewMode, setViewMode] = useState('desktop');
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
  const [hasError, setHasError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  const handleAddSection = (type: SectionType['type']) => {
    const newSection: SectionType = {
      id: `section-${Date.now()}`,
      type,
      title: getDefaultTitle(type),
      content: {}
    };
    
    setSections([...sections, newSection]);
    toast({
      title: "Section added",
      description: `Added ${getDefaultTitle(type)} section to your resume.`,
    });
  };

  const getDefaultTitle = (type: SectionType['type']): string => {
    const titles = {
      contact: 'Contact Information',
      summary: 'Professional Summary',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills',
      projects: 'Projects',
      custom: 'Custom Section'
    };
    return titles[type];
  };

  const handleDragStart = (sectionId: string) => {
    setDraggedSection(sectionId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('resumaker-droppable-active');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('resumaker-droppable-active');
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.currentTarget.classList.remove('resumaker-droppable-active');
    
    if (draggedSection) {
      const sectionsCopy = [...sections];
      const draggedItemIndex = sectionsCopy.findIndex(s => s.id === draggedSection);
      
      if (draggedItemIndex !== -1) {
        const [removed] = sectionsCopy.splice(draggedItemIndex, 1);
        sectionsCopy.splice(targetIndex, 0, removed);
        setSections(sectionsCopy);
      }
    }
    
    setDraggedSection(null);
  };
  
  const handleSave = () => {
    toast({
      title: "Resume saved",
      description: "Your resume has been saved successfully.",
    });
    setLastSaved(new Date());
  };

  const handleAIEnhance = () => {
    toast({
      title: "AI Enhancement",
      description: "Using AI to enhance your resume content...",
    });
    
    // This would actually call an AI service in a real app
    setTimeout(() => {
      toast({
        title: "Resume Enhanced",
        description: "AI suggestions have been applied to your resume.",
      });
    }, 1500);
  };
  
  const handleShare = () => {
    toast({
      title: "Share link created",
      description: "A shareable link has been copied to your clipboard.",
    });
  };
  
  // Simulate auto-saving
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      // In a real app, we'd check if there are changes before saving
      const now = new Date();
      setLastSaved(now);
    }, 60000); // Auto-save every minute
    
    return () => clearInterval(autoSaveInterval);
  }, []);
  
  // Simulate error for demo purposes
  const simulateError = () => {
    setHasError(true);
    setError(new Error("Failed to load template data. Please try again."));
  };
  
  const resetError = () => {
    setHasError(false);
    setError(null);
  };

  const availableTemplates = [
    { id: 'modern', name: 'Modern', color: '#6366F1' },
    { id: 'classic', name: 'Classic', color: '#10B981' },
    { id: 'minimalist', name: 'Minimalist', color: '#6B7280' },
    { id: 'creative', name: 'Creative', color: '#EC4899' },
    { id: 'professional', name: 'Professional', color: '#3B82F6' },
    { id: 'executive', name: 'Executive', color: '#8B5CF6' },
  ];
  
  // Example skills for tag input
  const skillsSuggestions = [
    "JavaScript", "React", "TypeScript", "HTML", "CSS", "Node.js", "Python",
    "SQL", "GraphQL", "AWS", "Docker", "Kubernetes", "CI/CD", "Git",
    "Agile", "Scrum", "Project Management", "Team Leadership", "Communication"
  ];

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold ml-2">Resume Builder</h1>
          <input
            type="text"
            placeholder="Resume Title"
            className="ml-4 bg-transparent border-b border-border focus:outline-none focus:border-primary px-2 py-1 text-lg"
            value={resumeTitle}
            onChange={(e) => setResumeTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleAIEnhance}>
            <Sparkles className="h-4 w-4 mr-2" />
            AI Enhance
          </Button>
          <LanguageSelector value={language} onChange={setLanguage} />
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
            <DialogTrigger asChild>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-0">
              <ExportOptions 
                documentType="resume" 
                documentTitle={resumeTitle} 
                onClose={() => setShowExportDialog(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)]">
        <div className="w-full lg:w-1/2 flex flex-col">
          <Tabs defaultValue="editor">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="flex-1 h-[calc(100vh-14rem)]">
              <div className="flex justify-between items-center mb-2">
                <VersionHistory 
                  documentType="resume" 
                  documentId="1" 
                  lastSaved={lastSaved}
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => simulateError()}
                >
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Simulate Error
                </Button>
              </div>
              
              {hasError ? (
                <ErrorFallback
                  error={error}
                  resetError={resetError}
                  message="Failed to load resume data"
                  severity="warning"
                  actionText="Retry Loading"
                  actionFn={resetError}
                />
              ) : (
                <ScrollArea className="h-full">
                  <div className="space-y-4 p-2">
                    {sections.map((section, index) => (
                      <div key={section.id}>
                        <div 
                          className="resumaker-droppable"
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, index)}
                        ></div>
                        
                        <ResumeSection 
                          section={section} 
                          onDragStart={() => handleDragStart(section.id)}
                          showAISuggestions={true}
                        />
                        
                        {index === sections.length - 1 && (
                          <div 
                            className="resumaker-droppable"
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, index + 1)}
                          ></div>
                        )}
                      </div>
                    ))}
                    
                    <Card className="mt-6">
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-2">Add Section</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleAddSection('experience')}>
                            <Plus className="h-3 w-3 mr-1" />
                            Experience
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleAddSection('education')}>
                            <Plus className="h-3 w-3 mr-1" />
                            Education
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleAddSection('skills')}>
                            <Plus className="h-3 w-3 mr-1" />
                            Skills
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleAddSection('projects')}>
                            <Plus className="h-3 w-3 mr-1" />
                            Projects
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleAddSection('custom')}>
                            <Plus className="h-3 w-3 mr-1" />
                            Custom
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="mt-4">
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-2">Skills Tags</h3>
                        <TagInput
                          tags={['JavaScript', 'React', 'TypeScript']}
                          onChange={(tags) => {
                            // In a real app, we'd update the skills section with these tags
                            console.log('Skills updated:', tags);
                          }}
                          suggestions={skillsSuggestions}
                          placeholder="Add a skill..."
                          maxTags={20}
                        />
                      </CardContent>
                    </Card>
                    
                    <Card className="mt-4">
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <h3 className="text-sm font-medium">Share Resume</h3>
                          <p className="text-xs text-muted-foreground">
                            Create a public link to share your resume
                          </p>
                        </div>
                        <Button size="sm" onClick={handleShare} variant="outline">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
            
            <TabsContent value="templates" className="h-[calc(100vh-14rem)]">
              <ScrollArea className="h-full">
                <div className="grid grid-cols-2 gap-4 p-2">
                  {availableTemplates.map((template) => (
                    <Card 
                      key={template.id} 
                      className={`cursor-pointer hover:border-primary transition-colors ${activeTemplate === template.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setActiveTemplate(template.id)}
                    >
                      <CardContent className="h-60 flex items-center justify-center p-4 relative">
                        <div className="absolute top-2 left-2">
                          <div 
                            className="h-3 w-3 rounded-full" 
                            style={{ backgroundColor: template.color }}
                          />
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{template.name}</p>
                          <p className="text-sm text-muted-foreground">Template Preview</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
        
        <Separator orientation="vertical" className="hidden lg:block" />
        
        <div className="w-full lg:w-1/2 h-full">
          <div className="bg-card rounded-lg border border-border h-full overflow-hidden">
            <div className="bg-muted p-2 flex items-center justify-between">
              <span className="text-sm font-medium">Preview</span>
              <div className="flex space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <span className="h-2 w-2 rounded-full mr-2" style={{ 
                        backgroundColor: availableTemplates.find(t => t.id === activeTemplate)?.color 
                      }}></span>
                      {availableTemplates.find(t => t.id === activeTemplate)?.name || 'Template'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2" align="end">
                    <div className="grid grid-cols-2 gap-2">
                      {availableTemplates.map(template => (
                        <Button
                          key={template.id}
                          variant={activeTemplate === template.id ? "default" : "outline"}
                          size="sm"
                          className="justify-start"
                          onClick={() => setActiveTemplate(template.id)}
                        >
                          <span className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: template.color }}></span>
                          {template.name}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <Separator orientation="vertical" />
                <div className="flex bg-background/50 rounded-md p-1">
                  <Button 
                    variant={viewMode === 'desktop' ? 'secondary' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('desktop')}
                    className="text-xs px-2"
                  >
                    Desktop
                  </Button>
                  <Button 
                    variant={viewMode === 'mobile' ? 'secondary' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('mobile')}
                    className="text-xs px-2"
                  >
                    Mobile
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[calc(100%-2.5rem)]">
              <div className={`transition-all ${viewMode === 'mobile' ? 'max-w-[414px] mx-auto' : 'w-full'}`}>
                <ResumePreview 
                  sections={sections} 
                  language={language} 
                  template={activeTemplate}
                />
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
