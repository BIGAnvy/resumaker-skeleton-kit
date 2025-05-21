
import AppLayout from '../components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const SettingsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and application preferences.</p>
        </div>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-4 h-auto">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="localization">Localization</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="browser-notifications">Browser Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show in-app notifications</p>
                  </div>
                  <Switch id="browser-notifications" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>Customize the look and feel of the application.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="border-2 w-10 h-10 rounded-full p-0 flex items-center justify-center" style={{ borderColor: "hsl(var(--primary))" }}>
                      <span className="sr-only">Blue theme</span>
                      <span className="h-6 w-6 rounded-full bg-resumaker-500"></span>
                    </Button>
                    <Button variant="outline" className="w-10 h-10 rounded-full p-0 flex items-center justify-center">
                      <span className="sr-only">Green theme</span>
                      <span className="h-6 w-6 rounded-full bg-green-500"></span>
                    </Button>
                    <Button variant="outline" className="w-10 h-10 rounded-full p-0 flex items-center justify-center">
                      <span className="sr-only">Purple theme</span>
                      <span className="h-6 w-6 rounded-full bg-purple-500"></span>
                    </Button>
                    <Button variant="outline" className="w-10 h-10 rounded-full p-0 flex items-center justify-center">
                      <span className="sr-only">Orange theme</span>
                      <span className="h-6 w-6 rounded-full bg-orange-500"></span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <Switch id="dark-mode" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="localization" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Language & Region</CardTitle>
                <CardDescription>Set your language and regional preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Display Language</Label>
                    <select id="language" className="w-full p-2 border border-input rounded-md">
                      <option value="en-US">English (US)</option>
                      <option value="en-GB">English (UK)</option>
                      <option value="fr-FR">French</option>
                      <option value="de-DE">German</option>
                      <option value="es-ES">Spanish</option>
                      <option value="zh-CN">Chinese</option>
                      <option value="ja-JP">Japanese</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <select id="date-format" className="w-full p-2 border border-input rounded-md">
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-resume-language">Default Resume Language</Label>
                  <select id="default-resume-language" className="w-full p-2 border border-input rounded-md">
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="fr-FR">French</option>
                    <option value="de-DE">German</option>
                    <option value="es-ES">Spanish</option>
                    <option value="zh-CN">Chinese</option>
                    <option value="ja-JP">Japanese</option>
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">This will be used as the default language for new resumes and cover letters.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Manage your account details and subscription.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email</Label>
                  <input 
                    id="user-email" 
                    type="email" 
                    className="w-full p-2 border border-input rounded-md"
                    defaultValue="user@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-name">Name</Label>
                  <input 
                    id="user-name" 
                    type="text" 
                    className="w-full p-2 border border-input rounded-md"
                    defaultValue="John Doe"
                  />
                </div>
                <div className="pt-2">
                  <Button>Save Changes</Button>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Current Plan: Free</h3>
                      <p className="text-sm text-muted-foreground">2/3 Resumes used</p>
                    </div>
                    <Button>Upgrade</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
