import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grip, Trash, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

type SectionProps = {
  section: {
    id: string;
    type: string;
    title: string;
    content: Record<string, any>;
  };
  onDragStart: () => void;
};

const ResumeSection = ({ section, onDragStart }: SectionProps) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Card 
      className="resumaker-module" 
      draggable 
      onDragStart={onDragStart}
    >
      <CardHeader className="p-3 flex flex-row items-center justify-between border-b">
        <div className="flex items-center">
          <Grip className="h-4 w-4 text-muted-foreground mr-2 cursor-grab" />
          <h3 className="text-sm font-medium">{section.title}</h3>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={toggleCollapse}>
            {collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className={cn("p-3 transition-all", collapsed && "hidden")}>
        {/* Placeholder content based on section type */}
        {section.type === 'contact' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">Name</label>
              <input type="text" className="w-full px-2 py-1 border border-border rounded-md text-sm" defaultValue={section.content.name} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <input type="email" className="w-full px-2 py-1 border border-border rounded-md text-sm" defaultValue={section.content.email} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Phone</label>
              <input type="tel" className="w-full px-2 py-1 border border-border rounded-md text-sm" defaultValue={section.content.phone} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Location</label>
              <input type="text" className="w-full px-2 py-1 border border-border rounded-md text-sm" defaultValue={section.content.location} />
            </div>
          </div>
        )}
        
        {section.type === 'summary' && (
          <div>
            <label className="text-xs text-muted-foreground">Professional Summary</label>
            <textarea 
              className="w-full px-2 py-1 border border-border rounded-md text-sm mt-1" 
              rows={4}
              defaultValue={section.content.text}
            ></textarea>
          </div>
        )}
        
        {section.type === 'experience' && (
          <div className="space-y-4">
            {section.content.jobs?.map((job: any, index: number) => (
              <div key={index} className="border border-border rounded-md p-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Job Title</label>
                    <input type="text" className="w-full px-2 py-1 border border-border rounded-md text-sm" defaultValue={job.title} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Company</label>
                    <input type="text" className="w-full px-2 py-1 border border-border rounded-md text-sm" defaultValue={job.company} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Start Date</label>
                    <input type="text" className="w-full px-2 py-1 border border-border rounded-md text-sm" defaultValue={job.startDate} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">End Date</label>
                    <input type="text" className="w-full px-2 py-1 border border-border rounded-md text-sm" defaultValue={job.endDate} />
                  </div>
                </div>
                <div className="mt-2">
                  <label className="text-xs text-muted-foreground">Description</label>
                  <textarea 
                    className="w-full px-2 py-1 border border-border rounded-md text-sm mt-1" 
                    rows={3}
                    defaultValue={job.description}
                  ></textarea>
                </div>
              </div>
            ))}
            
            <Button size="sm" variant="outline" className="w-full">
              <Plus className="h-3 w-3 mr-1" />
              Add Job
            </Button>
          </div>
        )}
        
        {/* Other section types would follow a similar pattern */}
        {(section.type !== 'contact' && section.type !== 'summary' && section.type !== 'experience') && (
          <div className="h-20 flex items-center justify-center text-muted-foreground text-sm">
            {section.title} section editor placeholder
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeSection;
