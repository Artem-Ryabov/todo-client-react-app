import { httpMethods } from '@/shared/lib/constants/httpMethod';
import { getToken } from '@/shared/lib/helpers/token';
import { Content } from '@/shared/lib/models/Content';
import { NewTask } from '@/shared/lib/models/NewTask';
import { Task } from '@/shared/lib/models/Task';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5555/api/v1'
  }),
  tagTypes: ['Todo'],
  endpoints: build => ({
    getTodos: build.query<Content<Task[]>, void>({
      query: () => ({
        url: '/todo',
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }),
      providesTags: () => ['Todo']
    }),
    addTodo: build.mutation<Content<Task[]>, NewTask>({
      query: task => ({
        url: '/todo',
        method: httpMethods.POST,
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
        body: task
      }),
      // invalidatesTags: ['Todo']
    }),
    deleteTodo: build.mutation<Content<Task[]>, number>({
      query: id => ({
        url: `/todo/${id}`,
        method: httpMethods.DELETE,
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }),
      // invalidatesTags: ['Todo']
    }),
    markTodo: build.mutation<Content<Task[]>, { id: number, done: boolean }>({
      query: ({ id, done }) => ({
        url: `/todo/${id}/${done ? 'complete' : 'start'}`,
        method: httpMethods.PUT,
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }),
      invalidatesTags: ['Todo']
    })
  })
});

export default todoApi;

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useMarkTodoMutation
} = todoApi;
