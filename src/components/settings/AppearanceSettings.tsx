import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const AppearanceSettings = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>Customize the look and feel of the application.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div>
            <Label className="text-base font-medium">Theme Preference</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Choose your preferred theme or let the system decide
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm">Theme switcher</span>
              <ThemeToggle />
            </div>
          </div>

          <div className="border-t pt-6">
            <Label className="text-base font-medium">Color Themes</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Choose your preferred color scheme
            </p>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="border-2 w-10 h-10 rounded-full p-0 flex items-center justify-center"
                style={{ borderColor: 'hsl(var(--primary))' }}
              >
                <span className="sr-only">Blue theme</span>
                <span className="h-6 w-6 rounded-full bg-resumaker-500"></span>
              </Button>
              <Button
                variant="outline"
                className="w-10 h-10 rounded-full p-0 flex items-center justify-center"
              >
                <span className="sr-only">Green theme</span>
                <span className="h-6 w-6 rounded-full bg-green-500"></span>
              </Button>
              <Button
                variant="outline"
                className="w-10 h-10 rounded-full p-0 flex items-center justify-center"
              >
                <span className="sr-only">Purple theme</span>
                <span className="h-6 w-6 rounded-full bg-purple-500"></span>
              </Button>
              <Button
                variant="outline"
                className="w-10 h-10 rounded-full p-0 flex items-center justify-center"
              >
                <span className="sr-only">Orange theme</span>
                <span className="h-6 w-6 rounded-full bg-orange-500"></span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings; 