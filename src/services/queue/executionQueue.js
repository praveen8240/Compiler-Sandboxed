import Queue from 'better-queue';
import { ExecutionStatus } from '../../types/execution.js';

class ExecutionQueue {
  constructor() {
    this.queue = new Queue(async (task, cb) => {
      try {
        const result = await task.execute();
        cb(null, result);
      } catch (error) {
        cb(error);
      }
    }, {
      concurrent: process.env.concurrent,
      maxRetries: process.env.maxretries,
      retryDelay: process.env.delaytime
    });

    this.activeExecutions = new Map();
  }

  async addExecution(executionTask) {
    const { executionId } = executionTask;
    
    this.activeExecutions.set(executionId, {
      status: ExecutionStatus.QUEUED,
      timestamp: Date.now()
    });

    return new Promise((resolve, reject) => {
      this.queue.push(executionTask, (err, result) => {
        if (err) {
          this.activeExecutions.set(executionId, {
            status: ExecutionStatus.FAILED,
            error: err.message,
            timestamp: Date.now()
          });
          reject(err);
        } else {
          this.activeExecutions.set(executionId, {
            status: ExecutionStatus.COMPLETED,
            result,
            timestamp: Date.now()
          });
          resolve(result);
        }
      });
    });
  }

  getExecutionStatus(executionId) {
    return this.activeExecutions.get(executionId);
  }
}

export const executionQueue = new ExecutionQueue();