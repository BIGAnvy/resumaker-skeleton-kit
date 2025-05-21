
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Copy, Trash, Edit, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Document = {
  id: string;
  title: string;
  lastModified: string;
  type: "resume" | "coverLetter";
};

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Demo data for the UI skeleton
  const [documents, setDocuments] = useState<Document[]>([
    { id: "1", title: "Software Engineer Resume", lastModified: "2023-09-15", type: "resume" },
    { id: "2", title: "Product Manager Resume", lastModified: "2023-08-20", type: "resume" },
    { id: "3", title: "Application for Google", lastModified: "2023-09-10", type: "coverLetter" },
  ]);

  const handleCreateNew = (type: "resume" | "coverLetter") => {
    // In a real app, we would create a new document and navigate to the editor
    if (type === "resume") {
      navigate("/resume-builder/new");
    } else {
      navigate("/cover-letter/new");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your resumes and cover letters</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => handleCreateNew("resume")}>
            <Plus className="mr-2 h-4 w-4" />
            New Resume
          </Button>
          <Button variant="outline" onClick={() => handleCreateNew("coverLetter")}>
            <Plus className="mr-2 h-4 w-4" />
            New Cover Letter
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="resumes" className="w-full">
        <TabsList>
          <TabsTrigger value="resumes">Resumes</TabsTrigger>
          <TabsTrigger value="coverLetters">Cover Letters</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resumes" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.filter(doc => doc.type === "resume").map((doc) => (
              <Card key={doc.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{doc.title}</CardTitle>
                  <CardDescription>Last modified: {doc.lastModified}</CardDescription>
                </CardHeader>
                <CardContent className="h-32 border border-dashed border-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Resume Preview
                </CardContent>
                <CardFooter className="flex justify-between pt-4">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/resume-builder/${doc.id}`)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed">
              <CardContent className="h-full flex flex-col items-center justify-center p-6 cursor-pointer" onClick={() => handleCreateNew("resume")}>
                <div className="h-12 w-12 rounded-full border-2 border-muted flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">Create New Resume</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="coverLetters" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.filter(doc => doc.type === "coverLetter").map((doc) => (
              <Card key={doc.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{doc.title}</CardTitle>
                  <CardDescription>Last modified: {doc.lastModified}</CardDescription>
                </CardHeader>
                <CardContent className="h-32 border border-dashed border-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Cover Letter Preview
                </CardContent>
                <CardFooter className="flex justify-between pt-4">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/cover-letter/${doc.id}`)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed">
              <CardContent className="h-full flex flex-col items-center justify-center p-6 cursor-pointer" onClick={() => handleCreateNew("coverLetter")}>
                <div className="h-12 w-12 rounded-full border-2 border-muted flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">Create New Cover Letter</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="h-40 border border-dashed border-muted rounded-md mt-6 flex items-center justify-center text-muted-foreground">
                  Template Preview {i + 1}
                </CardContent>
                <CardFooter className="pt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
