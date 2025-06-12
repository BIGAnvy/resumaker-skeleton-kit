import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Download, Share, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CoverLetterViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock cover letter data - in real app this would come from API
  const coverLetter = {
    id: id,
    title: "Application for Software Engineer",
    lastModified: "2023-09-15",
    company: "Google Inc.",
    position: "Software Engineer",
    recipientName: "Sarah Johnson",
    content: {
      introduction: "I am writing to express my strong interest in the Software Engineer position at Google Inc. With my passion for technology and proven track record in developing innovative solutions, I believe I would be a valuable addition to your team.",
      body: "Throughout my career, I have developed expertise in full-stack development, with particular strength in React, TypeScript, and cloud technologies. My experience includes leading cross-functional teams, implementing scalable architectures, and delivering high-quality products that serve millions of users. I am excited about the opportunity to contribute to Google's mission of organizing the world's information and making it universally accessible.",
      conclusion: "I would welcome the opportunity to discuss how my skills and experience align with your team's needs. Thank you for considering my application, and I look forward to hearing from you soon."
    },
    senderInfo: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      address: "San Francisco, CA"
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your cover letter is being downloaded as PDF...",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share link copied",
      description: "Cover letter share link has been copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{coverLetter.title}</h1>
            <p className="text-muted-foreground mt-1">For: {coverLetter.company} • Last modified: {coverLetter.lastModified}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate(`/cover-letter/${id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Cover Letter
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cover Letter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-8 border rounded-lg min-h-[600px]">
                <div className="text-right mb-6">
                  <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                </div>
                
                <div className="mb-6">
                  <p className="mb-1 font-medium">{coverLetter.recipientName}</p>
                  <p className="mb-1">{coverLetter.company}</p>
                  <p className="mb-4 text-sm text-muted-foreground">Re: {coverLetter.position} Position</p>
                </div>
                
                <div className="space-y-4 text-sm leading-relaxed">
                  <p>Dear {coverLetter.recipientName},</p>
                  <p>{coverLetter.content.introduction}</p>
                  <p>{coverLetter.content.body}</p>
                  <p>{coverLetter.content.conclusion}</p>
                </div>
                
                <div className="mt-8">
                  <p className="mb-1 text-sm">Sincerely,</p>
                  <p className="font-medium">{coverLetter.senderInfo.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Position</label>
                <p className="text-sm">{coverLetter.position}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Company</label>
                <p className="text-sm">{coverLetter.company}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Recipient</label>
                <p className="text-sm">{coverLetter.recipientName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  Draft
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-medium">{coverLetter.senderInfo.name}</p>
              <p className="text-sm text-muted-foreground">{coverLetter.senderInfo.email}</p>
              <p className="text-sm text-muted-foreground">{coverLetter.senderInfo.phone}</p>
              <p className="text-sm text-muted-foreground">{coverLetter.senderInfo.address}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterViewPage;
