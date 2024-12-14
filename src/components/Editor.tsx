import React from 'react';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { Language } from '../types';

interface EditorProps {
  code: string;
  language: Language;
  onChange: (value: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ code, language, onChange }) => {
  return (
    <div className="h-[500px] w-full border border-gray-300 rounded-lg overflow-hidden">
      <MonacoEditor
        height="100%"
        language={language}
        value={code}
        onChange={(value) => onChange(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}