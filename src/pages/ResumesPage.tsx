import AppLayout from '../components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Copy, Download, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ResumesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const resumes = [
    { id: "1", title: "Software Engineer Resume", lastModified: "2023-09-15" },
    { id: "2", title: "Product Manager Resume", lastModified: "2023-08-20" },
  ];

  const handleCopy = (resume: typeof resumes[0]) => {
    toast({
      title: "Resume copied",
      description: `${resume.title} has been copied successfully.`,
    });
  };

  const handleDownload = (resume: typeof resumes[0]) => {
    toast({
      title: "Download started",
      description: `Downloading ${resume.title}...`,
    });
  };

  const handleDelete = (resumeId: string) => {
    toast({
      title: "Resume deleted",
      description: "The resume has been moved to trash.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resumes</h1>
          <p className="text-muted-foreground mt-1">Manage your resumes</p>
        </div>
        <Button onClick={() => navigate("/resume-builder/new")}>
          <Plus className="mr-2 h-4 w-4" />
          New Resume
        </Button>
      </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.map((resume) => (
            <Card key={resume.id} className="cursor-pointer" onClick={() => navigate(`/resume/${resume.id}`)}>
              <CardHeader className="pb-2">
                <CardTitle>{resume.title}</CardTitle>
                <CardDescription>Last modified: {resume.lastModified}</CardDescription>
              </CardHeader>
              <CardContent className="h-32 border border-dashed border-muted rounded-md flex items-center justify-center text-muted-foreground">
                Resume Preview
              </CardContent>
              <CardFooter className="flex justify-between pt-4">
                <Button variant="outline" size="sm" onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/resume-builder/${resume.id}`);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(resume);
                  }}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(resume);
                  }}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(resume.id);
                  }}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
          
          <Card className="border-dashed">
            <CardContent className="h-full flex flex-col items-center justify-center p-6 cursor-pointer" onClick={() => navigate("/resume-builder/new")}>
              <div className="h-12 w-12 rounded-full border-2 border-muted flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">Create New Resume</p>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default ResumesPage;
