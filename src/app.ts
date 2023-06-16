import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
import { generateFacultyId } from './app/modules/user/user.utils';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semester', AcademicSemesterRoutes);
app.use('/api/v1', routes);

//Testing
/*
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // Promise.reject((new Error('Unhandled Promise Rejection')))
  // console.log(x)
  throw new Error('Testing error logger')
})
*/
// Global Error Handler
app.use(globalErrorHandler);

// Handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
