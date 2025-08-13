import React from 'react';
import { AlertCircle, RefreshCw, X } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: 'inline' | 'card' | 'banner';
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  onDismiss,
  variant = 'inline',
  className,
}) => {
  const baseClasses = 'flex items-center space-x-3 text-red-600';
  
  const variantClasses = {
    inline: 'p-3 bg-red-50 rounded-md border border-red-200',
    card: 'p-6 bg-white border border-red-200 rounded-lg shadow-sm',
    banner: 'p-4 bg-red-50 border-l-4 border-red-400',
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      <AlertCircle className="h-5 w-5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <div className="flex items-center space-x-2">
        {onRetry && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRetry}
            className="text-red-600 hover:bg-red-100"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="text-red-600 hover:bg-red-100"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;