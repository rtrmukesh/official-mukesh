import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600 dark:text-indigo-400" />
        <p className="text-xl font-medium text-gray-600 dark:text-gray-300">Loading App Icon Generator...</p>
      </div>
    </div>
  );
}
