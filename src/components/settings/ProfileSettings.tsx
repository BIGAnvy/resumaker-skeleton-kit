
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { User, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type ProfileFormValues = {
  name: string;
  email: string;
  language: string;
  jobTitle: string;
  industry: string;
};

const ProfileSettings = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    language: 'en-US',
    jobTitle: 'Software Engineer',
    industry: 'Technology',
    subscription: 'pro',
    memberSince: 'May 2023',
    avatar: ''
  };
  
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
      language: user.language,
      jobTitle: user.jobTitle,
      industry: user.industry
    }
  });

  const onSubmit = (values: ProfileFormValues) => {
    setIsSubmitting(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 800);
  };

  const handleAvatarUpload = () => {
    // This would trigger a file upload in a real application
    toast({
      title: "Upload triggered",
      description: "In a complete app, this would open a file picker.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account details and preferences</p>
      </div>
      
      <div className="grid gap-6">
        {/* Subscription Card */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>Manage your subscription and billing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Current Plan</p>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Pro Plan
                  </Badge>
                  <span className="text-sm text-muted-foreground ml-2">$12/month</span>
                </div>
              </div>
              <Button variant="outline">Manage Subscription</Button>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm">
                <p>Next billing date: <span className="font-medium">June 21, 2025</span></p>
                <p className="text-muted-foreground">Member since {user.memberSince}</p>
              </div>
              <Button variant="ghost" size="sm">View Invoices</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Profile Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your profile details</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-lg">
                      <User />
                    </AvatarFallback>
                  </Avatar>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleAvatarUpload} 
                    type="button"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Change Avatar
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormDescription>
                          This email will be used for notifications.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="en-US">English (US)</SelectItem>
                            <SelectItem value="en-GB">English (UK)</SelectItem>
                            <SelectItem value="fr-FR">French</SelectItem>
                            <SelectItem value="es-ES">Spanish</SelectItem>
                            <SelectItem value="de-DE">German</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This helps us tailor resume templates to your industry.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
        
        {/* Security Section */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your password and account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-muted-foreground">Last updated 3 months ago</p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="font-medium">Two-factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Data and Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>Data and Privacy</CardTitle>
            <CardDescription>Manage your data and privacy preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Download Your Data</p>
                <p className="text-sm text-muted-foreground">Get a copy of all your resumes and cover letters</p>
              </div>
              <Button variant="outline">Export Data</Button>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="outline" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;
