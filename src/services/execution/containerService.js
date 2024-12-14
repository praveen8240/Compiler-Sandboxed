import { Docker } from 'docker-cli-js';
import { logger } from '../../utils/logger.js';
import { writeFile } from 'fs/promises';
import path from 'path';

const docker = new Docker();

export class ContainerService {
  async runContainer(executionDir, config, input) {
    const containerName = path.basename(executionDir);
    
    if (input) {
      await writeFile(path.join(executionDir, 'input.txt'), input);
    }

    try {
      const result = await docker.command(`run --name ${containerName} \
        --memory=${process.env.MAX_MEMORY} \
        --cpus=${process.env.DOCKER_CPU_LIMIT} \
        --network none \
        --rm \
        -v ${executionDir}:/code \
        ${config.image} \
        bash -c "${this.buildCommand(config)}"`);

      return result.raw;
    } catch (error) {
      logger.error(`Container execution error: ${error.message}`);
      throw error;
    }
  }

  buildCommand(config) {
    // Redirect input from file if it exists
    return `if [ -f /code/input.txt ]; then \
      ${config.command} < /code/input.txt; \
    else \
      ${config.command}; \
    fi`;
  }
}