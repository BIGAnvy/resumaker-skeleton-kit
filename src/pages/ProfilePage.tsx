import AppLayout from '../components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Briefcase, Save } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information and professional details</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Software Developer</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Change Photo</Button>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone
                </Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </Label>
                <Input id="location" defaultValue="San Francisco, CA" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Professional Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input id="title" defaultValue="Senior Software Developer" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea 
                  id="summary" 
                  rows={4}
                  defaultValue="Experienced software developer with 5+ years in full-stack development. Passionate about creating efficient, scalable solutions and mentoring junior developers."
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
