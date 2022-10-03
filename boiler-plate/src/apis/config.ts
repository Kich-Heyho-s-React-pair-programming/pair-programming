import { ResponseData } from 'apis';

export const API_DOMAIN = '';

export class ApiThrowError extends Error {
  data: ResponseData;
  constructor(message: string, data: ResponseData) {
    super(message);
    this.name = 'BackhrowError';
    this.data = data;
  }
}
