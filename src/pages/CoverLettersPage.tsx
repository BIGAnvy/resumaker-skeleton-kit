
import AppLayout from '../components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Copy, Download, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CoverLettersPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const coverLetters = [
    { id: "1", title: "Application for Google", lastModified: "2023-09-10", company: "Google Inc." },
    { id: "2", title: "Software Engineer Cover Letter", lastModified: "2023-09-08", company: "Microsoft" },
  ];

  const handleCopy = (letter: typeof coverLetters[0]) => {
    toast({
      title: "Cover letter copied",
      description: `${letter.title} has been copied successfully.`,
    });
  };

  const handleDownload = (letter: typeof coverLetters[0]) => {
    toast({
      title: "Download started",
      description: `Downloading ${letter.title}...`,
    });
  };

  const handleDelete = (letterId: string) => {
    toast({
      title: "Cover letter deleted",
      description: "The cover letter has been moved to trash.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cover Letters</h1>
            <p className="text-muted-foreground mt-1">Manage your cover letters</p>
          </div>
          <Button onClick={() => navigate("/cover-letter/new")}>
            <Plus className="mr-2 h-4 w-4" />
            New Cover Letter
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coverLetters.map((letter) => (
            <Card key={letter.id} className="cursor-pointer" onClick={() => navigate(`/cover-letter/${letter.id}/view`)}>
              <CardHeader className="pb-2">
                <CardTitle>{letter.title}</CardTitle>
                <CardDescription>For: {letter.company}</CardDescription>
                <CardDescription>Last modified: {letter.lastModified}</CardDescription>
              </CardHeader>
              <CardContent className="h-32 border border-dashed border-muted rounded-md flex items-center justify-center text-muted-foreground">
                Cover Letter Preview
              </CardContent>
              <CardFooter className="flex justify-between pt-4">
                <Button variant="outline" size="sm" onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/cover-letter/${letter.id}`);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(letter);
                  }}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(letter);
                  }}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(letter.id);
                  }}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
          
          <Card className="border-dashed">
            <CardContent className="h-full flex flex-col items-center justify-center p-6 cursor-pointer" onClick={() => navigate("/cover-letter/new")}>
              <div className="h-12 w-12 rounded-full border-2 border-muted flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">Create New Cover Letter</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default CoverLettersPage;
