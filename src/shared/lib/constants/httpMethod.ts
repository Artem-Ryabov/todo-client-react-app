import ValueOf from '../types/valueof';

export const httpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
} as const;

export type HttpMethods = ValueOf<typeof httpMethods>;