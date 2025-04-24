import express from 'express';
import cors from 'cors';

import contactsRouter from './routers/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';
import authRouter from './routers/auth.js';
import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(logger);
  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);

  app.get('/', (req, res) => {
    res.json({
      message: 'Server start successfully',
    });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);
  app.use('/uploads', express.static(UPLOAD_DIR));

  const port = Number(getEnvVar('PORT', 3000));
  app.listen(port, () => console.log(`Server running on port ${port}`));
};
