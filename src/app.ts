import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routs
app.use('/api/v1/', router);

// handle global error
app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: {
      path: req.originalUrl,
      message: '❌ Api not Found ❌',
    },
  });
});
export default app;
