
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertOctagon, AlertTriangle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ErrorSeverity = 'warning' | 'critical';

interface ErrorFallbackProps {
  error?: Error | null;
  resetError?: () => void;
  message?: string;
  severity?: ErrorSeverity;
  actionText?: string;
  actionFn?: () => void;
  showReload?: boolean;
}

export function ErrorFallback({
  error,
  resetError,
  message = 'Something went wrong',
  severity = 'warning',
  actionText,
  actionFn,
  showReload = true,
}: ErrorFallbackProps) {
  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(true);
  
  useEffect(() => {
    if (error && severity === 'critical') {
      toast({
        title: 'Error',
        description: error.message || message,
        variant: 'destructive',
      });
    }
  }, [error, message, severity, toast]);

  return (
    <div className={`
      rounded-md border p-4 my-4
      ${severity === 'critical' 
        ? 'border-destructive/50 bg-destructive/10' 
        : 'border-warning/50 bg-warning/10'}
    `}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {severity === 'critical' ? (
            <AlertOctagon className="h-5 w-5 text-destructive" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-warning" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-medium mb-1">
            {message}
          </h3>
          
          {error && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {collapsed 
                  ? error.message?.substring(0, 100) + (error.message?.length > 100 ? '...' : '') 
                  : error.message}
              </p>
              
              {error.stack && !collapsed && (
                <pre className="text-xs p-2 bg-muted/50 rounded border max-h-40 overflow-auto">
                  {error.stack}
                </pre>
              )}
              
              {(error.message?.length > 100 || error.stack) && (
                <Button 
                  variant="link" 
                  size="sm" 
                  className="px-0 h-auto text-muted-foreground"
                  onClick={() => setCollapsed(!collapsed)}
                >
                  {collapsed ? 'Show details' : 'Hide details'}
                </Button>
              )}
            </div>
          )}
          
          <div className="flex gap-3 mt-3">
            {actionText && actionFn && (
              <Button size="sm" onClick={actionFn}>{actionText}</Button>
            )}
            
            {resetError && (
              <Button 
                size="sm" 
                variant={actionText && actionFn ? 'outline' : 'default'} 
                onClick={resetError}
              >
                Try again
              </Button>
            )}
            
            {showReload && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4 mr-1" /> Reload page
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;
