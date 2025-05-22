import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

type ResumePreviewProps = {
  sections: Array<{
    id: string;
    type: string;
    title: string;
    content: Record<string, any>;
  }>;
  language: string;
  template?: string;
};

const ResumePreview = ({ sections, language, template = 'modern' }: ResumePreviewProps) => {
  const contactSection = sections.find(s => s.type === 'contact');
  const summarySection = sections.find(s => s.type === 'summary');
  const experienceSection = sections.find(s => s.type === 'experience');
  const educationSection = sections.find(s => s.type === 'education');
  const skillsSection = sections.find(s => s.type === 'skills');
  const projectsSection = sections.find(s => s.type === 'projects');
  
  const renderModernTemplate = () => (
    <div className="p-8 bg-white min-h-full">
      {/* Contact section */}
      {contactSection && (
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">
            {contactSection.content.name}
          </h1>
          <div className="flex justify-center space-x-2 text-sm text-muted-foreground mt-1">
            <span>{contactSection.content.email}</span>
            <span>•</span>
            <span>{contactSection.content.phone}</span>
            <span>•</span>
            <span>{contactSection.content.location}</span>
          </div>
        </div>
      )}
      
      {/* Summary section */}
      {summarySection && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Professional Summary</h2>
          <p className="text-sm">
            {summarySection.content.text}
          </p>
        </div>
      )}
      
      {/* Experience section */}
      {experienceSection && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Work Experience</h2>
          {experienceSection.content.jobs?.map((job: any, index: number) => (
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
      
      {/* Education section */}
      {educationSection && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Education</h2>
          {educationSection.content.schools?.map((school: any, index: number) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{school.degree}</h3>
                  <p className="text-sm">{school.institution}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {school.startDate} - {school.endDate}
                </p>
              </div>
              {school.description && (
                <p className="text-sm mt-1">{school.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Skills section */}
      {skillsSection && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skillsSection.content.skills?.map((skill: string, index: number) => (
              <span key={index} className="text-sm bg-muted px-2 py-1 rounded-md">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Projects section */}
      {projectsSection && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Projects</h2>
          {projectsSection.content.projects?.map((project: any, index: number) => (
            <div key={index} className="mb-3">
              <div>
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.date}</p>
              </div>
              <p className="text-sm mt-1">{project.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* For other sections, we would add similar rendering logic */}
      {sections.filter(s => !['contact', 'summary', 'experience', 'education', 'skills', 'projects'].includes(s.type)).map(section => (
        <div key={section.id} className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">{section.title}</h2>
          <div className="h-16 flex items-center justify-center border border-dashed border-muted rounded-md text-muted-foreground text-sm">
            {section.title} content placeholder
          </div>
        </div>
      ))}
    </div>
  );

  const renderMinimalistTemplate = () => (
    <div className="p-8 bg-white min-h-full">
      {/* Contact section */}
      {contactSection && (
        <div className="mb-8">
          <h1 className="text-2xl font-light tracking-wide">
            {contactSection.content.name}
          </h1>
          <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground mt-2">
            <span>{contactSection.content.email}</span>
            <span>{contactSection.content.phone}</span>
            <span>{contactSection.content.location}</span>
          </div>
        </div>
      )}
      
      {/* Summary section */}
      {summarySection && (
        <div className="mb-8">
          <h2 className="text-lg font-light tracking-wide text-muted-foreground">About</h2>
          <p className="text-sm mt-2">
            {summarySection.content.text}
          </p>
        </div>
      )}
      
      {/* Experience section */}
      {experienceSection && (
        <div className="mb-8">
          <h2 className="text-lg font-light tracking-wide text-muted-foreground">Experience</h2>
          {experienceSection.content.jobs?.map((job: any, index: number) => (
            <div key={index} className="mt-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{job.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {job.startDate} - {job.endDate}
                </p>
              </div>
              <p className="text-sm font-medium text-muted-foreground">{job.company}</p>
              <p className="text-sm mt-1">{job.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Education section */}
      {educationSection && (
        <div className="mb-8">
          <h2 className="text-lg font-light tracking-wide text-muted-foreground">Education</h2>
          {educationSection.content.schools?.map((school: any, index: number) => (
            <div key={index} className="mt-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{school.degree}</h3>
                <p className="text-sm text-muted-foreground">
                  {school.startDate} - {school.endDate}
                </p>
              </div>
              <p className="text-sm font-medium text-muted-foreground">{school.institution}</p>
              {school.description && (
                <p className="text-sm mt-1">{school.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Skills section */}
      {skillsSection && (
        <div className="mb-8">
          <h2 className="text-lg font-light tracking-wide text-muted-foreground">Skills</h2>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
            {skillsSection.content.skills?.map((skill: string, index: number) => (
              <span key={index} className="text-sm">
                {skill}{index < (skillsSection.content.skills?.length || 0) - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Projects section */}
      {projectsSection && (
        <div className="mb-8">
          <h2 className="text-lg font-light tracking-wide text-muted-foreground">Projects</h2>
          {projectsSection.content.projects?.map((project: any, index: number) => (
            <div key={index} className="mt-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.date}</p>
              </div>
              <p className="text-sm mt-1">{project.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Other sections */}
      {sections.filter(s => !['contact', 'summary', 'experience', 'education', 'skills', 'projects'].includes(s.type)).map(section => (
        <div key={section.id} className="mb-8">
          <h2 className="text-lg font-light tracking-wide text-muted-foreground">{section.title}</h2>
          <div className="h-16 flex items-center justify-center border border-dashed border-muted rounded-md text-sm mt-2">
            {section.title} content placeholder
          </div>
        </div>
      ))}
    </div>
  );

  const renderClassicTemplate = () => (
    <div className="p-8 bg-white min-h-full font-serif">
      {/* Contact section */}
      {contactSection && (
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold uppercase tracking-widest">
            {contactSection.content.name}
          </h1>
          <Separator className="my-2 bg-black" />
          <div className="flex justify-center space-x-4 text-sm mt-2">
            <span>{contactSection.content.email}</span>
            <span>|</span>
            <span>{contactSection.content.phone}</span>
            <span>|</span>
            <span>{contactSection.content.location}</span>
          </div>
        </div>
      )}
      
      {/* Summary section */}
      {summarySection && (
        <div className="mb-6 mt-8">
          <h2 className="text-lg font-bold uppercase tracking-wider text-center">Professional Summary</h2>
          <Separator className="my-1 w-24 mx-auto bg-black" />
          <p className="text-sm text-center mt-3">
            {summarySection.content.text}
          </p>
        </div>
      )}
      
      {/* Experience section */}
      {experienceSection && (
        <div className="mb-6 mt-8">
          <h2 className="text-lg font-bold uppercase tracking-wider text-center">Work Experience</h2>
          <Separator className="my-1 w-24 mx-auto bg-black" />
          {experienceSection.content.jobs?.map((job: any, index: number) => (
            <div key={index} className="mb-4 mt-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{job.title}</h3>
                  <p className="text-sm italic">{job.company}</p>
                </div>
                <p className="text-sm">
                  {job.startDate} - {job.endDate}
                </p>
              </div>
              <p className="text-sm mt-2">{job.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Education section */}
      {educationSection && (
        <div className="mb-6 mt-8">
          <h2 className="text-lg font-bold uppercase tracking-wider text-center">Education</h2>
          <Separator className="my-1 w-24 mx-auto bg-black" />
          {educationSection.content.schools?.map((school: any, index: number) => (
            <div key={index} className="mb-4 mt-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{school.degree}</h3>
                  <p className="text-sm italic">{school.institution}</p>
                </div>
                <p className="text-sm">
                  {school.startDate} - {school.endDate}
                </p>
              </div>
              {school.description && (
                <p className="text-sm mt-2">{school.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Skills section */}
      {skillsSection && (
        <div className="mb-6 mt-8">
          <h2 className="text-lg font-bold uppercase tracking-wider text-center">Skills</h2>
          <Separator className="my-1 w-24 mx-auto bg-black" />
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
            {skillsSection.content.skills?.map((skill: string, index: number) => (
              <span key={index} className="text-sm">
                {skill}{index < (skillsSection.content.skills?.length || 0) - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Other sections */}
      {sections.filter(s => !['contact', 'summary', 'experience', 'education', 'skills', 'projects'].includes(s.type)).map(section => (
        <div key={section.id} className="mb-6 mt-8">
          <h2 className="text-lg font-bold uppercase tracking-wider text-center">{section.title}</h2>
          <Separator className="my-1 w-24 mx-auto bg-black" />
          <div className="h-16 flex items-center justify-center border border-dashed border-muted rounded-md text-sm mt-4">
            {section.title} content placeholder
          </div>
        </div>
      ))}
    </div>
  );

  const renderCreativeTemplate = () => (
    <div className="bg-white min-h-full">
      {/* Header with color bar */}
      <div className="h-4 bg-primary"></div>
      
      {/* Two column layout */}
      <div className="flex">
        {/* Left sidebar */}
        <div className="w-1/3 bg-muted p-6">
          {/* Contact section */}
          {contactSection && (
            <div className="mb-8">
              <h1 className="text-lg font-bold">
                {contactSection.content.name}
              </h1>
              <div className="flex flex-col space-y-1 text-xs mt-2">
                <span>{contactSection.content.email}</span>
                <span>{contactSection.content.phone}</span>
                <span>{contactSection.content.location}</span>
              </div>
            </div>
          )}
          
          {/* Skills section */}
          {skillsSection && (
            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase text-primary mb-3">Skills</h2>
              <div className="space-y-2">
                {skillsSection.content.skills?.map((skill: string, index: number) => (
                  <div key={index}>
                    <p className="text-xs font-medium">{skill}</p>
                    <div className="w-full h-1.5 bg-muted-foreground/20 rounded-full mt-1">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education section */}
          {educationSection && (
            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase text-primary mb-3">Education</h2>
              {educationSection.content.schools?.map((school: any, index: number) => (
                <div key={index} className="mb-3">
                  <h3 className="text-xs font-bold">{school.degree}</h3>
                  <p className="text-xs text-muted-foreground">{school.institution}</p>
                  <p className="text-xs">
                    {school.startDate} - {school.endDate}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Main content */}
        <div className="w-2/3 p-6">
          {/* Summary section */}
          {summarySection && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase text-primary mb-2">Profile</h2>
              <p className="text-sm">
                {summarySection.content.text}
              </p>
            </div>
          )}
          
          {/* Experience section */}
          {experienceSection && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase text-primary mb-2">Work Experience</h2>
              {experienceSection.content.jobs?.map((job: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold">{job.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {job.startDate} - {job.endDate}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-primary/90">{job.company}</p>
                  <p className="text-xs mt-1">{job.description}</p>
                </div>
              ))}
            </div>
          )}
          
          {/* Projects section */}
          {projectsSection && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase text-primary mb-2">Projects</h2>
              {projectsSection.content.projects?.map((project: any, index: number) => (
                <div key={index} className="mb-3">
                  <h3 className="text-sm font-bold">{project.title}</h3>
                  <p className="text-xs text-muted-foreground">{project.date}</p>
                  <p className="text-xs mt-1">{project.description}</p>
                </div>
              ))}
            </div>
          )}
          
          {/* Other sections */}
          {sections.filter(s => !['contact', 'summary', 'experience', 'education', 'skills', 'projects'].includes(s.type)).map(section => (
            <div key={section.id} className="mb-6">
              <h2 className="text-sm font-bold uppercase text-primary mb-2">{section.title}</h2>
              <div className="h-12 flex items-center justify-center border border-dashed border-muted rounded-md text-xs">
                {section.title} content placeholder
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfessionalTemplate = () => (
    <div className="p-8 bg-white min-h-full">
      {/* Contact section */}
      {contactSection && (
        <div className="mb-8">
          <h1 className="text-2xl font-bold border-b-2 border-primary pb-2">
            {contactSection.content.name}
          </h1>
          <div className="flex flex-wrap gap-x-4 text-sm mt-2">
            <span className="font-medium">Email:</span> <span>{contactSection.content.email}</span>
            <span className="font-medium">Phone:</span> <span>{contactSection.content.phone}</span>
            <span className="font-medium">Location:</span> <span>{contactSection.content.location}</span>
          </div>
        </div>
      )}
      
      {/* Summary section */}
      {summarySection && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-primary/30 pb-1 mb-2">Professional Summary</h2>
          <p className="text-sm">
            {summarySection.content.text}
          </p>
        </div>
      )}
      
      {/* Experience section */}
      {experienceSection && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-primary/30 pb-1 mb-2">Professional Experience</h2>
          {experienceSection.content.jobs?.map((job: any, index: number) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold">{job.title} | {job.company}</h3>
              <p className="text-sm text-muted-foreground">
                {job.startDate} - {job.endDate}
              </p>
              <p className="text-sm mt-1">{job.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Education section */}
      {educationSection && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-primary/30 pb-1 mb-2">Education</h2>
          {educationSection.content.schools?.map((school: any, index: number) => (
            <div key={index} className="mb-3">
              <h3 className="font-bold">{school.degree}</h3>
              <p className="text-sm">{school.institution}</p>
              <p className="text-sm text-muted-foreground">
                {school.startDate} - {school.endDate}
              </p>
              {school.description && (
                <p className="text-sm mt-1">{school.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Skills section */}
      {skillsSection && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-primary/30 pb-1 mb-2">Key Skills & Competencies</h2>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {skillsSection.content.skills?.map((skill: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <span className="text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Other sections */}
      {sections.filter(s => !['contact', 'summary', 'experience', 'education', 'skills', 'projects'].includes(s.type)).map(section => (
        <div key={section.id} className="mb-6">
          <h2 className="text-lg font-bold border-b border-primary/30 pb-1 mb-2">{section.title}</h2>
          <div className="h-16 flex items-center justify-center border border-dashed border-muted rounded-md text-sm">
            {section.title} content placeholder
          </div>
        </div>
      ))}
    </div>
  );
  
  const renderExecutiveTemplate = () => (
    <div className="p-8 bg-white min-h-full">
      {/* Contact section with executive styling */}
      {contactSection && (
        <div className="mb-8 flex justify-between items-end border-b-4 border-primary pb-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {contactSection.content.name}
            </h1>
            <p className="text-lg text-muted-foreground">Executive Professional</p>
          </div>
          <div className="text-right text-sm">
            <p>{contactSection.content.email}</p>
            <p>{contactSection.content.phone}</p>
            <p>{contactSection.content.location}</p>
          </div>
        </div>
      )}
      
      {/* Summary section */}
      {summarySection && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">Executive Profile</h2>
          <p className="text-sm">
            {summarySection.content.text}
          </p>
        </div>
      )}
      
      {/* Experience section */}
      {experienceSection && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">Professional Experience</h2>
          {experienceSection.content.jobs?.map((job: any, index: number) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <h3 className="font-bold text-lg">{job.company}</h3>
                <p className="text-sm font-medium">
                  {job.startDate} - {job.endDate}
                </p>
              </div>
              <p className="text-primary font-medium mt-1">{job.title}</p>
              <p className="text-sm mt-2">{job.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Two-column layout for skills and education */}
      <div className="grid grid-cols-2 gap-8">
        {/* Skills section */}
        {skillsSection && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3">Areas of Expertise</h2>
            <div className="grid grid-cols-1 gap-1">
              {skillsSection.content.skills?.map((skill: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                  <span className="text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Education section */}
        {educationSection && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3">Education</h2>
            {educationSection.content.schools?.map((school: any, index: number) => (
              <div key={index} className="mb-4">
                <p className="font-bold">{school.degree}</p>
                <p className="text-sm">{school.institution}</p>
                <p className="text-sm text-muted-foreground">
                  {school.startDate} - {school.endDate}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Other sections */}
      {sections.filter(s => !['contact', 'summary', 'experience', 'education', 'skills', 'projects'].includes(s.type)).map(section => (
        <div key={section.id} className="mb-6">
          <h2 className="text-xl font-bold mb-3">{section.title}</h2>
          <div className="h-16 flex items-center justify-center border border-dashed border-muted rounded-md text-sm">
            {section.title} content placeholder
          </div>
        </div>
      ))}
    </div>
  );

  // Render the appropriate template based on the selected template prop
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return renderModernTemplate();
      case 'minimalist':
        return renderMinimalistTemplate();
      case 'classic':
        return renderClassicTemplate();
      case 'creative':
        return renderCreativeTemplate();
      case 'professional':
        return renderProfessionalTemplate();
      case 'executive':
        return renderExecutiveTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return renderTemplate();
};

export default ResumePreview;
