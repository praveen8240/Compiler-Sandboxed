export const ExecutionStatus = {
  QUEUED: 'QUEUED',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export class TestCase {
  constructor(input, expectedOutput) {
    this.input = input;
    this.expectedOutput = expectedOutput;
  }
}

export class ExecutionResult {
  constructor(output, executionTime, passed = false, error = null) {
    this.output = output;
    this.executionTime = executionTime;
    this.passed = passed;
    this.error = error;
  }
}