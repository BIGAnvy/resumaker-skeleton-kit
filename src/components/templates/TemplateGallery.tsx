
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Template = {
  id: string;
  name: string;
  category: 'resume' | 'coverLetter';
  thumbnail: string;
  description: string;
};

const TemplateGallery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  // Mock templates data
  const templates: Template[] = [
    {
      id: 'modern-resume',
      name: 'Modern',
      category: 'resume',
      thumbnail: 'modern-resume.jpg',
      description: 'Clean and contemporary design with a focus on skills and experience.'
    },
    {
      id: 'classic-resume',
      name: 'Classic',
      category: 'resume',
      thumbnail: 'classic-resume.jpg',
      description: 'Traditional layout that works well for most industries.'
    },
    {
      id: 'creative-resume',
      name: 'Creative',
      category: 'resume',
      thumbnail: 'creative-resume.jpg',
      description: 'Bold design for standing out in creative fields.'
    },
    {
      id: 'minimalist-resume',
      name: 'Minimalist',
      category: 'resume',
      thumbnail: 'minimalist-resume.jpg',
      description: 'Simple and elegant with plenty of white space.'
    },
    {
      id: 'executive-resume',
      name: 'Executive',
      category: 'resume',
      thumbnail: 'executive-resume.jpg',
      description: 'Sophisticated design for senior positions and leadership roles.'
    },
    {
      id: 'technical-resume',
      name: 'Technical',
      category: 'resume',
      thumbnail: 'technical-resume.jpg',
      description: 'Optimized for technical roles with space for skills and projects.'
    },
    {
      id: 'modern-cover',
      name: 'Modern',
      category: 'coverLetter',
      thumbnail: 'modern-cover.jpg',
      description: 'Clean and professional design matching the modern resume.'
    },
    {
      id: 'classic-cover',
      name: 'Classic',
      category: 'coverLetter',
      thumbnail: 'classic-cover.jpg',
      description: 'Traditional format suitable for formal applications.'
    }
  ];

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
  };

  const handleUseTemplate = () => {
    if (!selectedTemplate) return;
    
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return;
    
    toast({
      title: "Template selected",
      description: `${template.name} template has been applied successfully.`,
    });
    
    if (template.category === 'resume') {
      navigate('/resume-builder/new');
    } else {
      navigate('/cover-letter/new');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Template Gallery</h1>
          <p className="text-muted-foreground mt-1">Choose from a variety of professional templates</p>
        </div>
      </div>
      
      <Tabs defaultValue="resume" className="w-full">
        <TabsList>
          <TabsTrigger value="resume">Resume Templates</TabsTrigger>
          <TabsTrigger value="coverLetter">Cover Letter Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resume" className="mt-6">
          <ScrollArea className="h-[calc(100vh-14rem)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates
                .filter(template => template.category === 'resume')
                .map((template) => (
                  <Card 
                    key={template.id} 
                    className={`overflow-hidden cursor-pointer transition-all ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <div className="relative aspect-[3/4] bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        {template.name} Template Preview
                      </div>
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button 
                        variant={selectedTemplate === template.id ? "default" : "outline"} 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        {selectedTemplate === template.id ? "Selected" : "Preview"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="coverLetter" className="mt-6">
          <ScrollArea className="h-[calc(100vh-14rem)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates
                .filter(template => template.category === 'coverLetter')
                .map((template) => (
                  <Card 
                    key={template.id} 
                    className={`overflow-hidden cursor-pointer transition-all ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <div className="relative aspect-[3/4] bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        {template.name} Template Preview
                      </div>
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button 
                        variant={selectedTemplate === template.id ? "default" : "outline"} 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        {selectedTemplate === template.id ? "Selected" : "Preview"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleUseTemplate} 
          disabled={!selectedTemplate}
          className="px-6"
        >
          Use Selected Template
        </Button>
      </div>
    </div>
  );
};

export default TemplateGallery;
