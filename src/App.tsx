import React, { useState } from 'react';
import { Editor } from './components/Editor';
import { LanguageSelector } from './components/LanguageSelector';
import { Output } from './components/Output';
import { executeCode } from './services/compiler';
import { Language, CompilerState } from './types';

const initialState: CompilerState = {
  code: '// Write your code here',
  language: 'javascript',
  output: '',
  isRunning: false,
  error: null,
};

function App() {
  const [state, setState] = useState<CompilerState>(initialState);

  const handleCodeChange = (newCode: string) => {
    setState((prev) => ({ ...prev, code: newCode }));
  };

  const handleLanguageChange = (language: Language) => {
    setState((prev) => ({ ...prev, language }));
  };

  const handleRunCode = async () => {
    setState((prev) => ({ ...prev, isRunning: true, error: null }));
    
    try {
      const result = await executeCode(state.code, state.language);
      setState((prev) => ({
        ...prev,
        output: result.result,
        error: result.error,
        isRunning: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: (error as Error).message,
        isRunning: false,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Online Code Compiler</h1>
            <div className="flex items-center gap-4">
              <LanguageSelector
                language={state.language}
                onLanguageChange={handleLanguageChange}
              />
              <button
                onClick={handleRunCode}
                disabled={state.isRunning}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
              >
                {state.isRunning ? 'Running...' : 'Run Code'}
              </button>
            </div>
          </div>

          <Editor
            code={state.code}
            language={state.language}
            onChange={handleCodeChange}
          />

          <Output output={state.output} error={state.error} />
        </div>
      </div>
    </div>
  );
}

export default App;