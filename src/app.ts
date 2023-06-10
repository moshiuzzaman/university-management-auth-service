import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/users/user.routes';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routs
app.use('/api/v1/users/', UserRoutes);

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//  throw new Error("dfldjff")
// })

app.use(globalErrorHandler);

export default app;
