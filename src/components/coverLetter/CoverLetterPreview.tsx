
import { ScrollArea } from '@/components/ui/scroll-area';

type CoverLetterPreviewProps = {
  template: string;
  data: {
    title: string;
    recipientName: string;
    companyName: string;
    introduction: string;
    body: string;
    conclusion: string;
    senderName: string;
  };
};

const CoverLetterPreview = ({ template, data }: CoverLetterPreviewProps) => {
  // Modern template
  if (template === 'modern') {
    return (
      <div className="p-8 bg-white min-h-full">
        <div className="text-right mb-6">
          <p className="text-sm">{new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="mb-6">
          <p className="mb-1">{data.recipientName}</p>
          <p className="mb-1">{data.companyName}</p>
          <p className="mb-4">Re: {data.title}</p>
        </div>
        
        <div className="mb-4">
          <p className="mb-4">Dear {data.recipientName},</p>
          <p className="mb-4">{data.introduction}</p>
          <p className="mb-4">{data.body}</p>
          <p className="mb-4">{data.conclusion}</p>
        </div>
        
        <div>
          <p className="mb-1">Sincerely,</p>
          <p className="font-medium">{data.senderName}</p>
        </div>
      </div>
    );
  }
  
  // Classic template
  if (template === 'classic') {
    return (
      <div className="p-8 bg-white min-h-full font-serif">
        <div className="mb-6">
          <p className="text-right mb-8">{new Date().toLocaleDateString()}</p>
          <p>{data.recipientName}</p>
          <p>{data.companyName}</p>
          <p className="mb-6">Subject: {data.title}</p>
          <p className="mb-6">Dear {data.recipientName},</p>
        </div>
        
        <div className="mb-6">
          <p className="mb-4 indent-8">{data.introduction}</p>
          <p className="mb-4 indent-8">{data.body}</p>
          <p className="mb-4 indent-8">{data.conclusion}</p>
        </div>
        
        <div className="mt-8">
          <p className="mb-6">Respectfully,</p>
          <p>{data.senderName}</p>
        </div>
      </div>
    );
  }
  
  // Creative template
  if (template === 'creative') {
    return (
      <div className="p-8 bg-white min-h-full">
        <div className="border-l-4 border-primary pl-4 mb-8">
          <h1 className="text-2xl font-bold">{data.senderName}</h1>
          <p className="text-muted-foreground">Application for: {data.title}</p>
        </div>
        
        <div className="mb-6">
          <p className="mb-4">Hello {data.recipientName},</p>
          <div className="pl-4 border-l-2 border-primary mb-4">
            <p className="italic">{data.introduction}</p>
          </div>
          <p className="mb-4">{data.body}</p>
          <p className="mb-4">{data.conclusion}</p>
        </div>
        
        <div className="text-right">
          <p className="mb-1">Best regards,</p>
          <p className="font-bold">{data.senderName}</p>
        </div>
      </div>
    );
  }
  
  // Professional template
  if (template === 'professional') {
    return (
      <div className="p-8 bg-white min-h-full">
        <div className="flex justify-between items-center mb-8 pb-4 border-b">
          <h1 className="text-xl font-bold">{data.senderName}</h1>
          <p className="text-sm">{new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="mb-6">
          <div className="mb-6">
            <p>{data.recipientName}</p>
            <p>{data.companyName}</p>
            <p className="font-medium">{data.title}</p>
          </div>
          
          <p className="mb-4">Dear {data.recipientName},</p>
          <p className="mb-4">{data.introduction}</p>
          <p className="mb-4">{data.body}</p>
          <p className="mb-4">{data.conclusion}</p>
        </div>
        
        <div className="mt-8">
          <p className="mb-1">Sincerely,</p>
          <p className="font-bold">{data.senderName}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-8 bg-white min-h-full flex items-center justify-center text-muted-foreground">
      No template selected
    </div>
  );
};

export default CoverLetterPreview;
