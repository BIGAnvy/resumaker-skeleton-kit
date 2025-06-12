import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const GeneralSettings = () => {
  return (
    <Card className="mt-6">
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
  );
};

export default GeneralSettings; 