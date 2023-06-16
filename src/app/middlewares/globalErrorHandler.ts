/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../errors/handleValidationError';
import ApiError from '../../errors/ApiError';
import config from '../../config';
import { errorlogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import handleCastError from '../../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? console.log('globalErrorHandler+=+=+=', error)
    : errorlogger.error('globalErrorHandler+=+=+=', error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMassages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMassages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMassages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMassages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMassages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMassages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMassages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
