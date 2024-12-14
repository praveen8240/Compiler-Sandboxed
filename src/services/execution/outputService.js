import { readFile } from 'fs/promises';
import path from 'path';

export const readExecutionOutput = async (executionDir) => {
  try {
    const outputPath = path.join(executionDir, 'output.txt');
    const output = await readFile(outputPath, 'utf-8');
    return output.trim();
  } catch (error) {
    return '';
  }
};