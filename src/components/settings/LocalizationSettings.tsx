import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const LocalizationSettings = () => {
  return (
    <Card className="mt-6">
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
          <select
            id="default-resume-language"
            className="w-full p-2 border border-input rounded-md"
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
            <option value="es-ES">Spanish</option>
            <option value="zh-CN">Chinese</option>
            <option value="ja-JP">Japanese</option>
          </select>
          <p className="text-xs text-muted-foreground mt-1">
            This will be used as the default language for new resumes and cover letters.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalizationSettings;
