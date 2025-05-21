
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Download, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import CoverLetterPreview from './CoverLetterPreview';

const CoverLetterEditor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [template, setTemplate] = useState('modern');
  
  const form = useForm({
    defaultValues: {
      title: 'Application for Software Engineer',
      recipientName: 'Hiring Manager',
      companyName: 'Tech Company Inc.',
      introduction: 'I am writing to express my interest in the Software Engineer position at Tech Company Inc.',
      body: 'With my experience in web development and problem-solving skills, I believe I would be a valuable addition to your team.',
      conclusion: 'Thank you for considering my application. I look forward to the opportunity to discuss how my skills align with your needs.',
      senderName: 'John Doe'
    }
  });

  const handleSave = () => {
    toast({
      title: "Cover letter saved",
      description: "Your cover letter has been saved successfully.",
    });
  };

  const handleAIGenerate = () => {
    toast({
      title: "Generating cover letter",
      description: "Using your resume data to generate a personalized cover letter...",
    });
    // In a real app, this would call an AI service
  };

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold ml-2">Cover Letter Editor</h1>
          <Input
            placeholder="Cover Letter Title"
            className="ml-4 bg-transparent border-b border-border focus:outline-none focus:border-primary px-2 py-1 text-lg"
            defaultValue="Application for Software Engineer"
          />
        </div>
        <div className="flex items-center space-x-2">
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
                  <Form {...form}>
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <FormField
                            control={form.control}
                            name="recipientName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Recipient Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem className="mt-4">
                                <FormLabel>Company Name</FormLabel>
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
                        <CardContent className="p-4">
                          <FormField
                            control={form.control}
                            name="introduction"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex justify-between">
                                  <FormLabel>Introduction</FormLabel>
                                  <Button variant="ghost" size="sm" onClick={handleAIGenerate} className="h-6 text-xs">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    Generate with AI
                                  </Button>
                                </div>
                                <FormControl>
                                  <Textarea 
                                    {...field} 
                                    rows={3}
                                    className="resize-none" 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex justify-between">
                                  <FormLabel>Body</FormLabel>
                                  <Button variant="ghost" size="sm" onClick={handleAIGenerate} className="h-6 text-xs">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    Generate with AI
                                  </Button>
                                </div>
                                <FormControl>
                                  <Textarea 
                                    {...field} 
                                    rows={6}
                                    className="resize-none" 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <FormField
                            control={form.control}
                            name="conclusion"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex justify-between">
                                  <FormLabel>Conclusion</FormLabel>
                                  <Button variant="ghost" size="sm" onClick={handleAIGenerate} className="h-6 text-xs">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    Generate with AI
                                  </Button>
                                </div>
                                <FormControl>
                                  <Textarea 
                                    {...field} 
                                    rows={3}
                                    className="resize-none" 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
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
                        </CardContent>
                      </Card>
                    </div>
                  </Form>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="templates" className="h-[calc(100vh-14rem)]">
              <ScrollArea className="h-full">
                <div className="grid grid-cols-2 gap-4 p-2">
                  {['modern', 'classic', 'creative', 'professional'].map((templateName) => (
                    <Card 
                      key={templateName} 
                      className={`cursor-pointer hover:border-primary transition-colors ${template === templateName ? 'border-primary' : ''}`}
                      onClick={() => setTemplate(templateName)}
                    >
                      <CardContent className="h-60 flex items-center justify-center p-4">
                        <div className="text-center">
                          <p className="font-medium capitalize">{templateName}</p>
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
                <Button variant="ghost" size="sm">
                  <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                  {template.charAt(0).toUpperCase() + template.slice(1)}
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[calc(100%-2.5rem)]">
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
