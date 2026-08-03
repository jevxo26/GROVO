import { AlertCircle, RefreshCcw } from "lucide-react";
import React from "react";

interface DataStateViewProps {
  isLoading: boolean;
  error?: string | null;
  onRetry?: () => void;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
}

export function DataStateView({
  isLoading,
  error,
  onRetry,
  children,
  skeleton,
}: DataStateViewProps) {
  if (isLoading) {
    return (
      <div className="w-full animate-pulse flex flex-col gap-4">
        {skeleton || (
          <div className="h-64 bg-muted rounded-md w-full border border-border"></div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 border-l-4 border-destructive bg-destructive/10 rounded-md flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-destructive shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">
            Data Loading Failed
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-background border border-border text-foreground hover:bg-secondary rounded-md text-sm transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
