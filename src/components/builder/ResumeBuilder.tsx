
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Download, Plus } from 'lucide-react';
import ResumeSection from './ResumeSection';
import ResumePreview from './ResumePreview';
import LanguageSelector from './LanguageSelector';
import { useNavigate } from 'react-router-dom';

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
  
  const [language, setLanguage] = useState('en-US');
  const [draggedSection, setDraggedSection] = useState<string | null>(null);

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
  };

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
            defaultValue="Software Engineer Resume"
          />
        </div>
        <div className="flex items-center space-x-2">
          <LanguageSelector value={language} onChange={setLanguage} />
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
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
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="templates" className="h-[calc(100vh-14rem)]">
              <ScrollArea className="h-full">
                <div className="grid grid-cols-2 gap-4 p-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="cursor-pointer hover:border-primary transition-colors">
                      <CardContent className="h-60 flex items-center justify-center p-4">
                        <div className="text-center text-muted-foreground">
                          Template Preview {i + 1}
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
                <Button variant="ghost" size="sm">
                  <span className="h-2 w-2 rounded-full bg-resumaker-500 mr-2"></span>
                  Modern
                </Button>
                <Separator orientation="vertical" />
                <Button variant="ghost" size="sm">
                  Desktop
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[calc(100%-2.5rem)]">
              <ResumePreview sections={sections} language={language} />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
