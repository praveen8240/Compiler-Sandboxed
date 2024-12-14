import express from 'express';
import { executeCode, getExecutionStatus } from '../controllers/executionController.js';

const router = express.Router();

router.post('/execute', executeCode);
router.get('/status/:executionId', getExecutionStatus);

export { router };