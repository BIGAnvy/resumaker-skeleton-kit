
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Download, Share, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResumeViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock resume data - in real app this would come from API
  const resume = {
    id: id,
    title: "Software Engineer Resume",
    lastModified: "2023-09-15",
    personalInfo: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA"
    },
    summary: "Experienced software engineer with 5+ years of expertise in full-stack development...",
    experience: [
      {
        company: "Tech Corp",
        position: "Senior Software Engineer",
        duration: "2021 - Present",
        description: "Led development of scalable web applications..."
      }
    ],
    education: [
      {
        school: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        year: "2019"
      }
    ],
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS"]
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your resume is being downloaded as PDF...",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share link copied",
      description: "Resume share link has been copied to clipboard.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{resume.title}</h1>
              <p className="text-muted-foreground mt-1">Last modified: {resume.lastModified}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => navigate(`/resume-builder/${id}`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Resume
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
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{resume.personalInfo.name}</h3>
                  <p className="text-muted-foreground">{resume.personalInfo.email}</p>
                  <p className="text-muted-foreground">{resume.personalInfo.phone}</p>
                  <p className="text-muted-foreground">{resume.personalInfo.location}</p>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{resume.summary}</p>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resume.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-muted pl-4">
                    <h4 className="font-semibold">{exp.position}</h4>
                    <p className="text-sm text-muted-foreground">{exp.company} • {exp.duration}</p>
                    <p className="text-sm mt-2">{exp.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resume.education.map((edu, index) => (
                  <div key={index}>
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground">{edu.school} • {edu.year}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted rounded-md text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resume Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Resume Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] border border-dashed border-muted rounded-md flex items-center justify-center text-muted-foreground text-sm">
                  PDF Preview
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ResumeViewPage;
