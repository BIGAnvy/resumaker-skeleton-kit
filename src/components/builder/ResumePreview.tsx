import { ScrollArea } from '@/components/ui/scroll-area';

type SectionType = {
  id: string;
  type: string;
  title: string;
  content: Record<string, any>;
};

type ResumePreviewProps = {
  sections: SectionType[];
  language: string;
  template: string;
  skillsTags?: string[];
};

const ResumePreview = ({ sections, language, template, skillsTags = [] }: ResumePreviewProps) => {
  const contactSection = sections.find(s => s.type === 'contact');
  const summarySection = sections.find(s => s.type === 'summary');
  const experienceSection = sections.find(s => s.type === 'experience');
  const educationSection = sections.find(s => s.type === 'education');

  // Modern template
  if (template === 'modern') {
    return (
      <div className="p-8 bg-white min-h-full text-black">
        {/* Header */}
        {contactSection && (
          <div className="mb-8 pb-6 border-b-2 border-blue-600">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
              {contactSection.content.name || 'Your Name'}
            </h1>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p>{contactSection.content.email}</p>
                <p>{contactSection.content.phone}</p>
              </div>
              <div>
                <p>{contactSection.content.location}</p>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        {summarySection && summarySection.content.text && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {summarySection.content.text}
            </p>
          </div>
        )}

        {/* Skills Tags */}
        {skillsTags.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skillsTags.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experienceSection && experienceSection.content.jobs && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">
              Work Experience
            </h2>
            {experienceSection.content.jobs.map((job: any, index: number) => (
              <div key={job.id || index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {job.title || 'Job Title'}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {job.startDate} - {job.endDate}
                  </span>
                </div>
                <p className="text-md font-medium text-blue-600 mb-2">
                  {job.company} {job.location && `• ${job.location}`}
                </p>
                {job.description && (
                  <p className="text-gray-700 leading-relaxed">
                    {job.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {educationSection && educationSection.content.institutions && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">
              Education
            </h2>
            {educationSection.content.institutions.map((edu: any, index: number) => (
              <div key={edu.id || index} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {edu.degree || 'Degree'}
                    </h3>
                    <p className="text-md font-medium text-blue-600">
                      {edu.institution} {edu.location && `• ${edu.location}`}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-gray-700 mt-1">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Other sections */}
        {sections.filter(s => !['contact', 'summary', 'experience', 'education'].includes(s.type)).map(section => (
          <div key={section.id} className="mb-6">
            <h2 className="text-xl font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">
              {section.title}
            </h2>
            <p className="text-gray-700">
              Section content will be displayed here
            </p>
          </div>
        ))}
      </div>
    );
  }

  // Classic template
  if (template === 'classic') {
    return (
      <div className="p-8 bg-white min-h-full text-black font-serif">
        {contactSection && (
          <div className="text-center mb-8 pb-4 border-b border-gray-400">
            <h1 className="text-3xl font-bold mb-4">
              {contactSection.content.name || 'Your Name'}
            </h1>
            <div className="text-sm space-y-1">
              <p>{contactSection.content.email}</p>
              <p>{contactSection.content.phone}</p>
              <p>{contactSection.content.location}</p>
            </div>
          </div>
        )}

        {summarySection && summarySection.content.text && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wide mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed indent-8">
              {summarySection.content.text}
            </p>
          </div>
        )}

        {experienceSection && experienceSection.content.jobs && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wide mb-3">
              Work Experience
            </h2>
            {experienceSection.content.jobs.map((job: any, index: number) => (
              <div key={job.id || index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{job.title || 'Job Title'}</h3>
                    <p className="italic">{job.company}</p>
                  </div>
                  <span className="text-sm">{job.startDate} - {job.endDate}</span>
                </div>
                {job.description && (
                  <p className="text-gray-700 mt-2 indent-8">
                    {job.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default fallback
  return (
    <div className="p-8 bg-white min-h-full text-black">
      <div className="text-center text-gray-500">
        Resume preview will appear here
      </div>
    </div>
  );
};

export default ResumePreview;
