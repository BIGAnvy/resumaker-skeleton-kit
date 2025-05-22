
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Download, FileType, Share2, CheckCircle, Settings, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

type ExportOptionsProps = {
  documentType: 'resume' | 'coverLetter';
  documentTitle: string;
  onClose?: () => void;
};

const ExportOptions = ({ documentType, documentTitle, onClose }: ExportOptionsProps) => {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'docx'>('pdf');
  const [exportQuality, setExportQuality] = useState<'standard' | 'high'>('standard');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isExportComplete, setIsExportComplete] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const { toast } = useToast();

  const handleExport = () => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export process
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          setIsExportComplete(true);
          setDownloadUrl('#'); // In a real app, this would be the actual download URL
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulating export completion
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: `Your ${documentType} has been exported as ${exportFormat.toUpperCase()}.`,
      });
    }, 3500);
  };

  const resetExport = () => {
    setIsExporting(false);
    setIsExportComplete(false);
    setExportProgress(0);
    setDownloadUrl('');
  };

  const handleShare = () => {
    toast({
      title: "Share link created",
      description: "A shareable link has been copied to your clipboard.",
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Export {documentType === 'resume' ? 'Resume' : 'Cover Letter'}</CardTitle>
        <CardDescription>
          Choose your export options for "{documentTitle}"
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isExporting && !isExportComplete ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Export Format</Label>
              <Tabs 
                defaultValue={exportFormat}
                onValueChange={(value) => setExportFormat(value as 'pdf' | 'docx')}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pdf" className="flex items-center justify-center">
                    <FileType className="h-4 w-4 mr-2" />
                    PDF
                  </TabsTrigger>
                  <TabsTrigger value="docx" className="flex items-center justify-center">
                    <FileType className="h-4 w-4 mr-2" />
                    DOCX (Word)
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="pdf" className="mt-4 space-y-4">
                  <div>
                    <Label>Quality</Label>
                    <RadioGroup 
                      defaultValue={exportQuality} 
                      onValueChange={(value) => setExportQuality(value as 'standard' | 'high')}
                      className="flex flex-col space-y-1 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard">Standard (recommended)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high">High quality (larger file size)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </TabsContent>
                <TabsContent value="docx" className="mt-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    DOCX format allows you to further edit your {documentType} in Microsoft Word or other compatible applications.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>File Options</Label>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="filename" className="text-muted-foreground">File name</Label>
                </div>
                <Input 
                  id="filename"
                  defaultValue={documentTitle}
                  className="w-[250px]"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="metadata" className="text-muted-foreground">Include metadata</Label>
                  <p className="text-xs text-muted-foreground">Helps with ATS (Applicant Tracking System) parsing</p>
                </div>
                <Switch
                  id="metadata"
                  checked={includeMetadata}
                  onCheckedChange={setIncludeMetadata}
                />
              </div>
            </div>
          </div>
        ) : isExportComplete ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center py-6">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-center">Export Complete!</h3>
              <p className="text-muted-foreground text-center mt-2">
                Your {documentType} has been successfully exported as {exportFormat.toUpperCase()}.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">File Name:</span>
                <span className="text-sm font-medium">{documentTitle}.{exportFormat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Format:</span>
                <span className="text-sm font-medium">{exportFormat.toUpperCase()}</span>
              </div>
              {exportFormat === 'pdf' && (
                <div className="flex justify-between">
                  <span className="text-sm">Quality:</span>
                  <span className="text-sm font-medium">{exportQuality === 'high' ? 'High' : 'Standard'}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center py-8">
              <h3 className="text-lg font-medium mb-6">Exporting {documentType}...</h3>
              <Progress value={exportProgress} className="w-full h-2" />
              <p className="text-sm text-muted-foreground mt-4">
                {exportProgress < 30 && "Preparing document..."}
                {exportProgress >= 30 && exportProgress < 60 && "Converting to " + exportFormat.toUpperCase() + "..."}
                {exportProgress >= 60 && exportProgress < 90 && "Applying formatting..."}
                {exportProgress >= 90 && "Almost done..."}
              </p>
            </div>
            <p className="text-xs text-muted-foreground text-center">Please don't close this window</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isExporting && !isExportComplete ? (
          <>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleExport}>
              Export {exportFormat.toUpperCase()}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        ) : isExportComplete ? (
          <>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={resetExport}>
                <Settings className="h-4 w-4 mr-2" /> 
                Change Options
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" /> 
                Share
              </Button>
            </div>
            <Button asChild>
              <a href={downloadUrl} download={`${documentTitle}.${exportFormat}`}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </a>
            </Button>
          </>
        ) : (
          <Button variant="outline" disabled>
            Exporting... {Math.round(exportProgress)}%
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExportOptions;
