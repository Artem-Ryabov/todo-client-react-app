export const httpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
} as const;

type ValueOf<T> = T[keyof T];

export type HttpMethods = ValueOf<typeof httpMethods>;