'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SearchCommand() {
    return (
        <Button variant="outline" className="w-full max-w-sm justify-start text-muted-foreground bg-muted/50" onClick={() => { }}>
            <Search className="mr-2 h-4 w-4" />
            <span>Search patients, reports...</span>
            <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-foreground opacity-100">
                <span className="text-xs">⌘</span>K
            </kbd>
        </Button>
    );
}
