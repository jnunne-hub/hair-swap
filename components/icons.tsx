import React from 'react';

export const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-10 w-10 text-gray-400"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-10 w-10 text-gray-400"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

export const SparklesIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1.586l.707-.707a1 1 0 011.414 1.414l-.707.707V7a1 1 0 01-2 0V5.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707V3a1 1 0 011-1zm0 14a1 1 0 011 1v1.586l.707-.707a1 1 0 111.414 1.414l-.707.707V21a1 1 0 11-2 0v-1.586l-.707.707a1 1 0 11-1.414-1.414l.707-.707V17a1 1 0 011-1zm10-14a1 1 0 011 1v1.586l.707-.707a1 1 0 111.414 1.414l-.707.707V7a1 1 0 11-2 0V5.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707V3a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

export const ArrowPathIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l16 16" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20H5a1 1 0 01-1-1V5a1 1 0 011-1h4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 4h4a1 1 0 011 1v14a1 1 0 011 1h-4" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l-4-4 4-4" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4 4-4 4" />
  </svg>
);

export const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);

export const FaceSmileIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a.5.5 0 01.708 0 4 4 0 01-5.656 0 .5.5 0 01.708-.707 3 3 0 004.24 0 .5.5 0 01.708.707z" clipRule="evenodd" />
    </svg>
);

export const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);