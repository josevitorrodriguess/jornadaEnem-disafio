import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      response
        .status(exception.getStatus())
        .json(exception.getResponse());
    } else {
      // Handle unexpected errors
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          error: process.env.NODE_ENV === 'development' ? exception.message : undefined
        });
    }
  }
}
