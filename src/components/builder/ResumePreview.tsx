
import { ScrollArea } from '@/components/ui/scroll-area';

type ResumePreviewProps = {
  sections: Array<{
    id: string;
    type: string;
    title: string;
    content: Record<string, any>;
  }>;
  language: string;
};

const ResumePreview = ({ sections, language }: ResumePreviewProps) => {
  // In a real app, this would render the resume based on the sections and template
  return (
    <div className="p-8 bg-white min-h-full">
      {/* Contact section */}
      {sections.find(s => s.type === 'contact') && (
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">
            {sections.find(s => s.type === 'contact')?.content.name}
          </h1>
          <div className="flex justify-center space-x-2 text-sm text-muted-foreground mt-1">
            <span>{sections.find(s => s.type === 'contact')?.content.email}</span>
            <span>•</span>
            <span>{sections.find(s => s.type === 'contact')?.content.phone}</span>
            <span>•</span>
            <span>{sections.find(s => s.type === 'contact')?.content.location}</span>
          </div>
        </div>
      )}
      
      {/* Summary section */}
      {sections.find(s => s.type === 'summary') && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Professional Summary</h2>
          <p className="text-sm">
            {sections.find(s => s.type === 'summary')?.content.text}
          </p>
        </div>
      )}
      
      {/* Experience section */}
      {sections.find(s => s.type === 'experience') && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Work Experience</h2>
          {sections.find(s => s.type === 'experience')?.content.jobs?.map((job: any, index: number) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm">{job.company}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {job.startDate} - {job.endDate}
                </p>
              </div>
              <p className="text-sm mt-1">{job.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* For other sections, we would add similar rendering logic */}
      {sections.filter(s => !['contact', 'summary', 'experience'].includes(s.type)).map(section => (
        <div key={section.id} className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">{section.title}</h2>
          <div className="h-16 flex items-center justify-center border border-dashed border-muted rounded-md text-muted-foreground text-sm">
            {section.title} content placeholder
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResumePreview;
