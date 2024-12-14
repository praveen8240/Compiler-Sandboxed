import { mkdir, rm } from 'fs/promises';
import { logger } from './logger.js';

export const ensureDirectory = async (dir) => {
  try {
    await mkdir(dir, { recursive: true });
  } catch (error) {
    logger.error(`Failed to create directory ${dir}: ${error.message}`);
    throw error;
  }
};

export const cleanupExecution = async (dir) => {
  try {
    await rm(dir, { recursive: true, force: true });
  } catch (error) {
    logger.error(`Failed to cleanup directory ${dir}: ${error.message}`);
  }
};