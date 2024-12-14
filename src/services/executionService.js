import path from 'path';
import { writeFile } from 'fs/promises';
import { getLanguageConfig } from '../config/languages.js';
import { logger } from '../utils/logger.js';
import { ensureDirectory, cleanupExecution } from '../utils/fileSystem.js';
import { TestRunner } from './execution/testRunner.js';
import { cacheService } from './cache/cacheService.js';
import { executionQueue } from './queue/executionQueue.js';
import { ExecutionResult } from '../types/execution.js';

class ExecutionService {
  constructor() {
    this.testRunner = new TestRunner();
  }

  async executeLanguage(code, language, executionId, testCases = []) {
    const config = getLanguageConfig(language);
    if (!config) {
      throw new Error(`Unsupported language: ${language}`);
    }

    // Check cache first
    const cacheKey = cacheService.generateKey(code, language, testCases);
    const cachedResult = cacheService.get(cacheKey);
    if (cachedResult) {
      logger.info(`Cache hit for execution ${executionId}`);
      return cachedResult;
    }

    const executionDir = path.join(process.cwd(), 'executions', executionId);
    await ensureDirectory(executionDir);

    try {
      // Write code to file
      const codePath = path.join(executionDir, config.filename);
      await writeFile(codePath, code);

      // Execute test cases
      const results = [];
      for (const testCase of testCases) {
        const result = await this.testRunner.runTestCase(
          executionDir,
          config,
          testCase
        );
        results.push(result);
      }

      // If no test cases provided, run once with no input
      if (testCases.length === 0) {
        const result = await this.testRunner.runTestCase(
          executionDir,
          config,
          { input: '', expectedOutput: '' }
        );
        results.push(result);
      }

      const finalResult = {
        results,
        summary: this.generateSummary(results)
      };

      // Cache the results
      cacheService.set(cacheKey, finalResult);

      return finalResult;
    } catch (error) {
      logger.error(`Execution error: ${error.message}`);
      throw error;
    } finally {
      await cleanupExecution(executionDir);
    }
  }

  generateSummary(results) {
    const totalTests = results.length;
    const passedTests = results.filter(r => r.passed).length;
    const totalTime = results.reduce((sum, r) => sum + r.executionTime, 0);

    return {
      totalTests,
      passedTests,
      failedTests: totalTests - passedTests,
      totalExecutionTime: totalTime,
      averageExecutionTime: totalTime / totalTests
    };
  }
}

export const executionService = new ExecutionService();