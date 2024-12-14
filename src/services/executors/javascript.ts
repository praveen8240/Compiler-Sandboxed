export const executeJavaScript = async (code: string): Promise<string> => {
  try {
    // Create a new Function in a sandboxed context
    const sandbox = {
      console: {
        log: (...args: any[]) => output.push(args.join(' ')),
        error: (...args: any[]) => output.push('Error: ' + args.join(' ')),
      },
      setTimeout: () => { throw new Error('setTimeout is not allowed'); },
      setInterval: () => { throw new Error('setInterval is not allowed'); },
      fetch: () => { throw new Error('fetch is not allowed'); },
    };

    const output: string[] = [];
    const fn = new Function('sandbox', `with (sandbox) { ${code} }`);
    
    fn(sandbox);
    return output.join('\n');
  } catch (error) {
    return `Error: ${(error as Error).message}`;
  }
}