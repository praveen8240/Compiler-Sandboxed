export type Language = 'javascript' | 'python' | 'cpp' | 'java';

export interface CompilerState {
  code: string;
  language: Language;
  output: string;
  isRunning: boolean;
  error: string | null;
}

export interface CompilerOutput {
  result: string;
  error: string | null;
}