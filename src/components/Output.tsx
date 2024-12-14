import React from 'react';

interface OutputProps {
  output: string;
  error: string | null;
}

export const Output: React.FC<OutputProps> = ({ output, error }) => {
  return (
    <div className="mt-4 p-4 bg-gray-900 text-white rounded-lg h-[200px] overflow-auto">
      <pre className="font-mono text-sm">
        {error ? (
          <span className="text-red-400">{error}</span>
        ) : (
          <span className="text-green-400">{output}</span>
        )}
      </pre>
    </div>
  );
}