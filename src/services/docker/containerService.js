import { Docker } from 'docker-cli-js';
import { logger } from '../../utils/logger.js';

const docker = new Docker();

const checkDockerConnection = async () => {
  try {
    await docker.command('version');
    return true;
  } catch (error) {
    logger.error('Docker connection failed:', error.message);
    return false;
  }
};

export const runContainer = async (containerName, config, executionDir) => {
  try {
    const isDockerRunning = await checkDockerConnection();
    if (!isDockerRunning) {
      throw new Error('Docker is not running. Please start Docker Desktop and try again.');
    }

    const result = await docker.command(`run --name ${containerName} \
      --memory=${process.env.MAX_MEMORY} \
      --cpus=${process.env.DOCKER_CPU_LIMIT} \
      --network none \
      --rm \
      -v ${executionDir}:/code \
      ${config.image} \
      ${config.command}`);
    
    return result.raw;
  } catch (error) {
    logger.error(`Container execution error: ${error.message}`);
    
    if (error.message.includes('Cannot connect to the Docker daemon')) {
      throw new Error('Docker is not running. Please start Docker Desktop and try again.');
    }
    
    throw new Error('Code execution failed: ' + error.message);
  } finally {
    // Cleanup: Remove container if it still exists
    try {
      await docker.command(`rm -f ${containerName}`);
    } catch (e) {
      // Ignore cleanup errors
    }
  }
};