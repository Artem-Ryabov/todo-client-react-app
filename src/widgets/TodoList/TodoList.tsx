import { useState, useEffect } from 'react';
import useFetch from '@/shared/lib/hooks/useFetch';
import { httpMethods } from '@/shared/lib/constants/httpMethod';
import TodoCard from '@/features/TodoCard';
import { useNavigate } from 'react-router-dom';
import paths from '@/app/Router/paths';

function TodoList(): JSX.Element {
  const [todos, setTodos] = useState<any[]>([]);
  const nav = useNavigate();
  const { isLoading, data, error } = useFetch<{ content: any[] }>(
    'http://localhost:5555/api/v1/todo',
    httpMethods.GET
  );

  useEffect(() => {
    if (data?.content != null) {
      setTodos([...data.content]);
    }
  }, [data]);

  useEffect(() => {
    if (error != null) {
      nav(paths.login);
    }
  }, [error]);
  
  return (
    <>
      <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
        {todos.map(t => (
          <TodoCard
            key={t.id}
            id={t.id}
            priority={{ id: t.idPriority, name: t.priority }}
            note={t.note}
            done={t.done}
            markTodo={() => void 0}
            deleteTodo={() => void 0}
          />
        ))}
      </div>
    </>
  );
}

export default TodoList;