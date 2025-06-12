
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Save, 
  Download, 
  Sparkles, 
  Settings,
  Share2,
  Bot
} from 'lucide-react';
import CoverLetterPreview from './CoverLetterPreview';
import AIChatWizard from '../ai/AIChatWizard';
import { useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ExportOptions from '../export/ExportOptions';

const CoverLetterEditor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [letterData, setLetterData] = useState({
    title: 'Software Engineer Position',
    recipientName: 'Hiring Manager',
    companyName: 'Tech Company',
    introduction: 'I am writing to express my strong interest in the Software Engineer position at your company.',
    body: 'With my extensive experience in software development and passion for creating innovative solutions, I believe I would be a valuable addition to your team.',
    conclusion: 'Thank you for considering my application. I look forward to hearing from you soon.',
    senderName: 'John Doe'
  });
  
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [viewMode, setViewMode] = useState('desktop');
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [showExportDialog, setShowExportDialog] = useState(false);

  // Mark as having unsaved changes when data changes
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [letterData]);

  const handleFieldChange = (field: string, value: string) => {
    setLetterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    toast({
      title: "Cover letter saved",
      description: "Your cover letter has been saved successfully.",
    });
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
  };

  const handleAIEnhance = () => {
    toast({
      title: "AI Enhancement",
      description: "Using AI to enhance your cover letter content...",
    });
    
    setTimeout(() => {
      toast({
        title: "Cover Letter Enhanced",
        description: "AI suggestions have been applied to your cover letter.",
      });
    }, 1500);
  };
  
  const handleShare = () => {
    toast({
      title: "Share link created",
      description: "A shareable link has been copied to your clipboard.",
    });
  };

  const availableTemplates = [
    { id: 'modern', name: 'Modern', color: '#6366F1' },
    { id: 'classic', name: 'Classic', color: '#10B981' },
    { id: 'creative', name: 'Creative', color: '#EC4899' },
    { id: 'professional', name: 'Professional', color: '#3B82F6' },
  ];

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold ml-2">Cover Letter Editor</h1>
          <input
            type="text"
            placeholder="Cover Letter Title"
            className="ml-4 bg-transparent border-b border-border focus:outline-none focus:border-primary px-2 py-1 text-lg"
            value={letterData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleAIEnhance}>
            <Sparkles className="h-4 w-4 mr-2" />
            AI Enhance
          </Button>
          <Button 
            variant={hasUnsavedChanges ? "default" : "outline"} 
            onClick={handleSave}
            className={hasUnsavedChanges ? "bg-primary text-primary-foreground" : ""}
          >
            <Save className="h-4 w-4 mr-2" />
            {hasUnsavedChanges ? "Save Changes" : "Saved"}
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
                documentType="coverLetter" 
                documentTitle={letterData.title} 
                onClose={() => setShowExportDialog(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)]">
        <div className="w-full lg:w-1/2 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="ai-assistant">
                <Bot className="h-4 w-4 mr-2" />
                AI Assistant
              </TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="flex-1 h-[calc(100vh-14rem)]">
              <ScrollArea className="h-full">
                <div className="space-y-4 p-2">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-medium">Cover Letter Details</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Recipient Name</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-border rounded-md"
                            value={letterData.recipientName}
                            onChange={(e) => handleFieldChange('recipientName', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Company Name</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-border rounded-md"
                            value={letterData.companyName}
                            onChange={(e) => handleFieldChange('companyName', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Your Name</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-border rounded-md"
                          value={letterData.senderName}
                          onChange={(e) => handleFieldChange('senderName', e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-medium">Letter Content</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Introduction</label>
                        <textarea
                          className="w-full px-3 py-2 border border-border rounded-md mt-1"
                          rows={3}
                          value={letterData.introduction}
                          onChange={(e) => handleFieldChange('introduction', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Main Body</label>
                        <textarea
                          className="w-full px-3 py-2 border border-border rounded-md mt-1"
                          rows={6}
                          value={letterData.body}
                          onChange={(e) => handleFieldChange('body', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Conclusion</label>
                        <textarea
                          className="w-full px-3 py-2 border border-border rounded-md mt-1"
                          rows={3}
                          value={letterData.conclusion}
                          onChange={(e) => handleFieldChange('conclusion', e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium">Share Cover Letter</h3>
                        <p className="text-xs text-muted-foreground">
                          Create a public link to share your cover letter
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
            </TabsContent>

            <TabsContent value="ai-assistant" className="flex-1 h-[calc(100vh-14rem)]">
              <Card className="h-full">
                <CardContent className="p-0 h-full">
                  <AIChatWizard />
                </CardContent>
              </Card>
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
                      <CardContent className="h-48 flex items-center justify-center p-4 relative">
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
                <CoverLetterPreview 
                  template={activeTemplate}
                  data={letterData}
                />
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterEditor;
