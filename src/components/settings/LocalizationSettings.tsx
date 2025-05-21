
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type LocalizationFormValues = {
  interfaceLanguage: string;
  dateFormat: string;
  timezone: string;
  numberFormat: string;
};

const LocalizationSettings = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<LocalizationFormValues>({
    defaultValues: {
      interfaceLanguage: 'en-US',
      dateFormat: 'MM/DD/YYYY',
      timezone: 'America/New_York',
      numberFormat: 'en-US',
    }
  });

  const onSubmit = (values: LocalizationFormValues) => {
    setIsSubmitting(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Settings updated",
        description: "Your localization settings have been saved.",
      });
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Localization Settings</h1>
        <p className="text-muted-foreground mt-1">Customize how dates, numbers, and text are displayed</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Language & Region</CardTitle>
              <CardDescription>Set your preferred language and regional formats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="interfaceLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interface Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="en-US">English (United States)</SelectItem>
                        <SelectItem value="en-GB">English (United Kingdom)</SelectItem>
                        <SelectItem value="fr-FR">French (France)</SelectItem>
                        <SelectItem value="es-ES">Spanish (Spain)</SelectItem>
                        <SelectItem value="de-DE">German (Germany)</SelectItem>
                        <SelectItem value="ja-JP">Japanese (Japan)</SelectItem>
                        <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This will change the language throughout the application interface.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dateFormat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Format</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="MM/DD/YYYY" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            MM/DD/YYYY <span className="text-muted-foreground">(e.g., 05/21/2025)</span>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="DD/MM/YYYY" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            DD/MM/YYYY <span className="text-muted-foreground">(e.g., 21/05/2025)</span>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="YYYY-MM-DD" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            YYYY-MM-DD <span className="text-muted-foreground">(e.g., 2025-05-21)</span>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      Choose how dates will be displayed in your documents and the interface.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timezone</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="numberFormat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number Format</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a number format" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="en-US">1,234.56 (US)</SelectItem>
                        <SelectItem value="en-GB">1,234.56 (UK)</SelectItem>
                        <SelectItem value="de-DE">1.234,56 (German)</SelectItem>
                        <SelectItem value="fr-FR">1 234,56 (French)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose how numbers will be formatted.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LocalizationSettings;
