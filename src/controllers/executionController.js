import { v4 as uuidv4 } from 'uuid';
import { executionService } from '../services/executionService.js';
import { executionQueue } from '../services/queue/executionQueue.js';
import { logger } from '../utils/logger.js';
import { TestCase } from '../types/execution.js';

export const executeCode = async (req, res) => {
  const { code, language, testCases = [] } = req.body;
  const executionId = uuidv4();

  try {
    logger.info(`Starting execution ${executionId} for language: ${language}`);

    // Convert raw test cases to TestCase objects
    const formattedTestCases = testCases.map(tc =>
      new TestCase(tc.input, tc.expectedOutput)
    );

    // Add to execution queue
    const executionTask = {
      executionId,
      execute: () => executionService.executeLanguage(
        code,
        language,
        executionId,
        formattedTestCases
      )
    };

    const result = await executionQueue.addExecution(executionTask);

    res.json({
      success: true,
      executionId,
      result
    });
  } catch (error) {
    logger.error(`Error in execution ${executionId}: ${error.message}`);
    
    res.status(400).json({
      success: false,
      executionId,
      error: error.message
    });
  }
};

export const getExecutionStatus = async (req, res) => {
  const { executionId } = req.params;
  const status = executionQueue.getExecutionStatus(executionId);

  if (!status) {
    return res.status(404).json({
      success: false,
      error: 'Execution not found'
    });
  }

  res.json({
    success: true,
    status
  });
};