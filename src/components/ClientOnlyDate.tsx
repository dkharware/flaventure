
'use client';

import { useState, useEffect } from 'react';

interface ClientOnlyDateProps {
    dateString: string;
    options?: Intl.DateTimeFormatOptions;
    className?: string;
}

export function ClientOnlyDate({ dateString, options, className }: ClientOnlyDateProps) {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const defaultOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        setFormattedDate(
            new Date(dateString).toLocaleDateString('en-US', options || defaultOptions)
        );
    }, [dateString, options]);

    // Render a placeholder or nothing on the server and initial client render
    if (!formattedDate) {
        return <span className={className}></span>;
    }

    return <span className={className}>{formattedDate}</span>;
}
