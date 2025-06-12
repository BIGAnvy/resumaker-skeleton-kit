import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const AccountSettings = () => {
  return (
    <Card className="mt-6">
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
  );
};

export default AccountSettings; 