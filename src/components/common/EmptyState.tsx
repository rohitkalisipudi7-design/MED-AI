import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px] border border-dashed border-border rounded-xl bg-muted/20">
            <div className="h-16 w-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                <Icon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
            {actionLabel && onAction && (
                <Button onClick={onAction}>{actionLabel}</Button>
            )}
        </div>
    );
}
