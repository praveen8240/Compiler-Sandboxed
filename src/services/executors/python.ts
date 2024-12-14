import { loadPyodide } from 'pyodide';

let pyodideInstance: any = null;

export const executePython = async (code: string): Promise<string> => {
  try {
    if (!pyodideInstance) {
      pyodideInstance = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
      });
    }

    // Redirect stdout to capture print statements
    const output = await pyodideInstance.runPythonAsync(code);
    return output?.toString() || 'Code executed successfully';
  } catch (error) {
    return `Error: ${(error as Error).message}`;
  }
}