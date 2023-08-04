import { useState, useEffect, useCallback } from 'react';
import useFetch from '@/shared/lib/hooks/useFetch';
import { httpMethods } from '@/shared/lib/constants/httpMethod';
import TodoCard from '@/features/TodoCard';
import { useNavigate } from 'react-router-dom';
import paths from '@/app/lib/router/paths';
import TodoForm from '@/features/TodoForm';
import useFetchMethod from '@/shared/lib/hooks/useFetchMothod';
import { NewTask } from '@/shared/lib/models/NewTask';
import { Task } from '@/shared/lib/models/Task';
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useMarkTodoMutation
} from './lib/redux/service';

function useLoadTodo() {
  const [todos, setTodos] = useState<Task[]>([]);
  // const { isLoading, data, error } = useFetch<any[]>(
  //   'http://localhost:5555/api/v1/todo'
  // );
  const { isLoading, data, error } = useGetTodosQuery();

  useEffect(() => {
    if (data?.content != null) {
      setTodos([...data.content]);
    }
  }, [data]);

  return { todos, setTodos, isLoadingTodo: isLoading, todoError: error };
}

function useAddTodo() {
  // const { isLoading, data, callFetch, error } = useFetchMethod<any[]>(
  //   'http://localhost:5555/api/v1/todo',
  //   httpMethods.POST
  // );
  const [callFetch, { isLoading, data, error }] = useAddTodoMutation();

  const addTodo = useCallback((task: NewTask) => {
    callFetch(task);
  }, []);

  return {
    isAdded: isLoading,
    newTodos: data?.content,
    addTodo,
    addingError: error
  };
}

function useDeleteTodo() {
  // const { isLoading, data, callFetch, error } = useFetchMethod<any[]>(
  //   'http://localhost:5555/api/v1/todo',
  //   httpMethods.DELETE
  // );
  const [callFetch, { isLoading, data, error }] = useDeleteTodoMutation();

  const deleteTodo = useCallback((id: number) => {
    callFetch(id);
  }, []);

  return {
    isDeleted: isLoading,
    filteredTodos: data?.content,
    deleteTodo,
    deletingError: error
  };
}

function useMarkTodo() {
  // const { isLoading, data, callFetch, error } = useFetchMethod<any>(
  //   'http://localhost:5555/api/v1/todo',
  //   httpMethods.PUT
  // );
  const [callFetch, { isLoading, data, error }] = useMarkTodoMutation();

  const markTodo = useCallback((id: number, done: boolean) => {
    callFetch({ id, done });
  }, []);

  return {
    isMarked: isLoading,
    updatedTodo: data?.content,
    markTodo,
    markError: error
  };
}

function TodoList(): JSX.Element {
  const nav = useNavigate();
  const { todos, setTodos, isLoadingTodo, todoError } = useLoadTodo();
  const { isAdded, newTodos, addTodo, addingError } = useAddTodo();
  const { isDeleted, filteredTodos, deleteTodo, deletingError } =
    useDeleteTodo();
  const { isMarked, updatedTodo: updatedTodos, markTodo, markError } = useMarkTodo();

  useEffect(() => {
    if (newTodos != null) {
      setTodos([...newTodos]);
    }
  }, [newTodos]);

  useEffect(() => {
    if (filteredTodos != null) {
      setTodos([...filteredTodos]);
    }
  }, [filteredTodos]);

  useEffect(() => {
    if (updatedTodos != null) {
      // setTodos([...updatedTodos]);
      // setTodos(t => {
      //   const index = t.findIndex(t => t.id === updatedTodos.id);
      //   t[index] = updatedTodos;
      //   return [...t];
      // });
    }
  }, [updatedTodos]);

  useEffect(() => {
    if (todoError != null) {
      nav(paths.login);
    }
  }, [todoError]);

  return (
    <>
      <TodoForm submit={addTodo} />
      <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
        {todos.map(t => (
          <TodoCard
            key={t.id}
            todo={{
              id: t.id,
              priority: t.priority ?? 'unknown',
              note: t.note,
              done: t.done
            }}
            markTodo={markTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </>
  );
}

export default TodoList;
