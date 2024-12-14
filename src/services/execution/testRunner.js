import { ExecutionResult } from '../../types/execution.js';
import { ContainerService } from './containerService.js';
import { logger } from '../../utils/logger.js';

export class TestRunner {
  constructor() {
    this.containerService = new ContainerService();
  }

  async runTestCase(executionDir, config, testCase) {
    const startTime = Date.now();

    try {
      const output = await this.containerService.runContainer(
        executionDir,
        config,
        testCase.input
      );

      const executionTime = Date.now() - startTime;
      const normalizedOutput = this.normalizeOutput(output);
      const normalizedExpected = this.normalizeOutput(testCase.expectedOutput);
      
      return new ExecutionResult(
        output,
        executionTime,
        normalizedOutput === normalizedExpected
      );
    } catch (error) {
      logger.error(`Test case execution failed: ${error.message}`);
      return new ExecutionResult(null, Date.now() - startTime, false, error.message);
    }
  }

  normalizeOutput(output) {
    return output
      .trim()
      .replace(/\r\n/g, '\n')
      .replace(/\s+/g, ' ');
  }
}