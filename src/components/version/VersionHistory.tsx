
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { Clock, RotateCcw, Clock3, CheckCircle } from 'lucide-react';

type Version = {
  id: string;
  timestamp: Date;
  label: string | null;
  isCurrent: boolean;
  isAutosave: boolean;
};

type VersionHistoryProps = {
  documentType: 'resume' | 'coverLetter';
  documentId: string;
  lastSaved?: Date;
};

const VersionHistory = ({ documentType, documentId, lastSaved }: VersionHistoryProps) => {
  const { toast } = useToast();
  const [versions, setVersions] = useState<Version[]>([
    {
      id: 'v6',
      timestamp: new Date(),
      label: null,
      isCurrent: true,
      isAutosave: true
    },
    {
      id: 'v5',
      timestamp: new Date(Date.now() - 30 * 60000),
      label: 'After AI suggestions',
      isCurrent: false,
      isAutosave: false
    },
    {
      id: 'v4',
      timestamp: new Date(Date.now() - 60 * 60000),
      label: null,
      isCurrent: false,
      isAutosave: true
    },
    {
      id: 'v3',
      timestamp: new Date(Date.now() - 120 * 60000),
      label: 'Added skills section',
      isCurrent: false,
      isAutosave: false
    },
    {
      id: 'v2',
      timestamp: new Date(Date.now() - 24 * 60 * 60000),
      label: null,
      isCurrent: false,
      isAutosave: true
    },
    {
      id: 'v1',
      timestamp: new Date(Date.now() - 48 * 60 * 60000),
      label: 'Initial version',
      isCurrent: false,
      isAutosave: false
    },
  ]);

  const [isRestoring, setIsRestoring] = useState(false);
  
  const handleRestoreVersion = (versionId: string) => {
    setIsRestoring(true);
    
    // Simulate restore operation
    setTimeout(() => {
      setIsRestoring(false);
      toast({
        title: "Version restored",
        description: `Restored ${documentType} to previous version.`,
      });
    }, 1500);
  };
  
  const handleCreateSnapshot = () => {
    const newSnapshot = {
      id: `v${versions.length + 1}`,
      timestamp: new Date(),
      label: 'Manual snapshot',
      isCurrent: true,
      isAutosave: false
    };
    
    // Mark current version as not current
    const updatedVersions = versions.map(v => ({
      ...v,
      isCurrent: false
    }));
    
    // Add new version at the beginning
    setVersions([newSnapshot, ...updatedVersions]);
    
    toast({
      title: "Snapshot created",
      description: `Created a manual snapshot of your ${documentType}.`,
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { day: 'numeric', month: 'short' }) + 
        ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <div>
      {/* Autosave indicator */}
      <div className="flex items-center text-xs text-muted-foreground">
        {lastSaved ? (
          <>
            <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
            <span>Saved {formatDate(lastSaved)}</span>
          </>
        ) : (
          <>
            <Clock3 className="h-3 w-3 mr-1 animate-pulse" />
            <span>Saving...</span>
          </>
        )}
      </div>
      
      {/* Version history sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2">
            <Clock className="h-4 w-4 mr-2" />
            Version History
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Version History</SheetTitle>
            <SheetDescription>
              View and restore previous versions of your {documentType}.
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-4">
            <Button onClick={handleCreateSnapshot} variant="outline" size="sm">
              Create Snapshot
            </Button>
          </div>
          
          <Separator />
          
          <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
            <div className="space-y-6 py-4">
              {versions.map((version) => (
                <div 
                  key={version.id}
                  className={`p-4 rounded-lg border ${version.isCurrent ? 'bg-accent border-accent' : 'bg-card border-border'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium flex items-center">
                        {version.isAutosave ? (
                          <span>Autosave</span>
                        ) : (
                          <span>{version.label || 'Manual save'}</span>
                        )}
                        {version.isCurrent && (
                          <span className="text-xs font-normal bg-primary/10 text-primary ml-2 px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(version.timestamp)}
                      </p>
                    </div>
                    
                    {!version.isCurrent && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleRestoreVersion(version.id)}
                        disabled={isRestoring}
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Restore
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <SheetFooter className="pt-2">
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default VersionHistory;
