'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px] border border-destructive/20 bg-destructive/5 rounded-xl">
                    <AlertCircle className="h-10 w-10 text-destructive mb-4" />
                    <h2 className="text-lg font-semibold text-destructive mb-2">Something went wrong</h2>
                    <p className="text-sm text-muted-foreground max-w-md mb-6">
                        {this.state.error?.message || 'An unexpected error occurred in this component.'}
                    </p>
                    <Button variant="outline" onClick={() => this.setState({ hasError: false, error: undefined })}>
                        Try again
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
