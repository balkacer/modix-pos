import {
  BadGatewayException,
  HttpException,
  InternalServerErrorException
} from '@nestjs/common';
import axios, { AxiosError } from 'axios';

export const mapAxiosErrorToHttpException = (error: unknown): HttpException => {
  if (!axios.isAxiosError(error)) {
    return new InternalServerErrorException('Unexpected upstream service error');
  }

  const statusCode = error.response?.status;
  const responseData = error.response?.data;

  if (!statusCode) {
    return new BadGatewayException('Upstream service is unavailable');
  }

  if (typeof responseData === 'object' && responseData !== null) {
    return new HttpException(responseData, statusCode, {
      cause: error
    });
  }

  return new HttpException(
    {
      statusCode,
      message: 'Upstream service request failed'
    },
    statusCode,
    {
      cause: error
    }
  );
};
