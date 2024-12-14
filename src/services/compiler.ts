import { Language, CompilerOutput } from '../types';
import { executeJavaScript } from './executors/javascript';
import { executePython } from './executors/python';

export const executeCode = async (code: string, language: Language): Promise<CompilerOutput> => {
  try {
    let result = '';

    switch (language) {
      case 'javascript':
        result = await executeJavaScript(code);
        break;
      case 'python':
        result = await executePython(code);
        break;
      case 'cpp':
      case 'java':
        result = 'This language is not yet implemented';
        break;
      default:
        throw new Error('Unsupported language');
    }

    return {
      result,
      error: null
    };
  } catch (error) {
    return {
      result: '',
      error: (error as Error).message
    };
  }
}