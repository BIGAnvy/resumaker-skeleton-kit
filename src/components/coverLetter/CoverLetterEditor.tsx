
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Download, Sparkles, Eye, FileText, Palette } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CoverLetterPreview from './CoverLetterPreview';

const CoverLetterEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [template, setTemplate] = useState('modern');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const form = useForm({
    defaultValues: {
      title: id === 'new' ? 'New Cover Letter' : 'Application for Software Engineer',
      recipientName: 'Hiring Manager',
      recipientTitle: 'Senior Recruiter',
      companyName: 'Tech Company Inc.',
      companyAddress: '123 Tech Street, San Francisco, CA 94105',
      position: 'Software Engineer',
      introduction: 'I am writing to express my strong interest in the Software Engineer position at Tech Company Inc. With my passion for technology and proven track record in developing innovative solutions, I believe I would be a valuable addition to your team.',
      body: 'Throughout my career, I have developed expertise in full-stack development, with particular strength in React, TypeScript, and cloud technologies. My experience includes leading cross-functional teams, implementing scalable architectures, and delivering high-quality products that serve millions of users.\n\nWhat particularly excites me about this opportunity is the chance to work on cutting-edge projects that impact millions of users worldwide. I am eager to contribute my technical skills and collaborative approach to help drive innovation at your company.',
      conclusion: 'I would welcome the opportunity to discuss how my skills and experience align with your team\'s needs. Thank you for considering my application, and I look forward to hearing from you soon.',
      senderName: 'John Doe',
      senderTitle: 'Software Engineer',
      senderEmail: 'john.doe@email.com',
      senderPhone: '+1 (555) 123-4567',
      senderAddress: 'San Francisco, CA'
    }
  });

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and contemporary design' },
    { id: 'classic', name: 'Classic', description: 'Traditional professional format' },
    { id: 'creative', name: 'Creative', description: 'Bold and expressive layout' },
    { id: 'professional', name: 'Professional', description: 'Corporate-friendly design' },
    { id: 'minimalist', name: 'Minimalist', description: 'Simple and elegant' },
    { id: 'executive', name: 'Executive', description: 'Premium business format' }
  ];

  const handleSave = () => {
    toast({
      title: "Cover letter saved",
      description: "Your cover letter has been saved successfully.",
    });
  };

  const handleAIGenerate = (field: string) => {
    toast({
      title: "Generating content",
      description: "Using AI to generate personalized content...",
    });
    
    // Simulate AI generation with better content
    setTimeout(() => {
      const aiSuggestions: Record<string, string> = {
        introduction: "I am excited to apply for the Software Engineer position at Tech Company Inc. Your commitment to innovation and technical excellence aligns perfectly with my passion for creating impactful software solutions.",
        body: "With over 5 years of experience in full-stack development, I have successfully delivered scalable applications using React, Node.js, and cloud technologies. At my current role, I led the development of a microservices architecture that improved system performance by 40% and reduced deployment time by 60%.\n\nI am particularly drawn to your company's mission of leveraging technology to solve real-world problems. My experience in agile development, combined with my strong problem-solving skills, would enable me to contribute effectively to your engineering team from day one.",
        conclusion: "I am eager to bring my technical expertise and collaborative mindset to your team. I would appreciate the opportunity to discuss how my background in software engineering can contribute to your continued success. Thank you for your time and consideration."
      };

      if (aiSuggestions[field]) {
        form.setValue(field as any, aiSuggestions[field]);
        toast({
          title: "Content generated",
          description: "AI has generated new content for this section.",
        });
      }
    }, 1500);
  };

  const handleExport = () => {
    toast({
      title: "Exporting cover letter",
      description: "Your cover letter is being exported as PDF...",
    });
  };

  const handlePreview = () => {
    if (id && id !== 'new') {
      navigate(`/cover-letter/${id}/view`);
    } else {
      setIsPreviewMode(!isPreviewMode);
    }
  };

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="flex items-center justify-between mb-6 p-4 bg-card border-b">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/cover-letters')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Cover Letter Title"
              className="text-lg font-medium border-none bg-transparent p-0 h-auto focus-visible:ring-0 min-w-[300px]"
              {...form.register('title')}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 border-r bg-muted/30">
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full px-4">
                <Form {...form}>
                  <div className="space-y-6 py-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center justify-between">
                          Introduction
                          <Button variant="ghost" size="sm" onClick={() => handleAIGenerate('introduction')}>
                            <Sparkles className="h-4 w-4 mr-1" />
                            AI Generate
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <FormField
                          control={form.control}
                          name="introduction"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  rows={4}
                                  className="resize-none"
                                  placeholder="Write your opening paragraph..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center justify-between">
                          Main Body
                          <Button variant="ghost" size="sm" onClick={() => handleAIGenerate('body')}>
                            <Sparkles className="h-4 w-4 mr-1" />
                            AI Generate
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <FormField
                          control={form.control}
                          name="body"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  rows={8}
                                  className="resize-none"
                                  placeholder="Describe your experience and qualifications..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center justify-between">
                          Conclusion
                          <Button variant="ghost" size="sm" onClick={() => handleAIGenerate('conclusion')}>
                            <Sparkles className="h-4 w-4 mr-1" />
                            AI Generate
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <FormField
                          control={form.control}
                          name="conclusion"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  rows={3}
                                  className="resize-none"
                                  placeholder="Write your closing paragraph..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </Form>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="design" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full px-4">
                <div className="space-y-4 py-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Palette className="h-5 w-5 mr-2" />
                        Templates
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {templates.map((t) => (
                          <Card 
                            key={t.id} 
                            className={`cursor-pointer transition-all hover:shadow-md ${template === t.id ? 'ring-2 ring-primary' : ''}`}
                            onClick={() => setTemplate(t.id)}
                          >
                            <CardContent className="p-4">
                              <div className="h-20 bg-gradient-to-br from-muted to-muted/50 rounded mb-2 flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">Template</span>
                              </div>
                              <h4 className="font-medium text-sm">{t.name}</h4>
                              <p className="text-xs text-muted-foreground">{t.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="details" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full px-4">
                <Form {...form}>
                  <div className="space-y-6 py-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recipient Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="recipientName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="recipientTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="position"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Your Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="senderName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="senderTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Title</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="senderEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="senderPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input type="tel" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </Form>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="w-1/2 bg-background">
          <div className="h-full flex flex-col">
            <div className="bg-muted/50 p-3 flex items-center justify-between border-b">
              <span className="text-sm font-medium">Live Preview</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Template:</span>
                <Select value={template} onValueChange={setTemplate}>
                  <SelectTrigger className="w-32 h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <CoverLetterPreview 
                template={template}
                data={form.getValues()}
              />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterEditor;
