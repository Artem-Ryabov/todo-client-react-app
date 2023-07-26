import { useEffect, useState } from 'react';
import './App.css';
import TodoCard from '@/features/todo/TodoCard';
import LoginForm from '@/widgets/LoginForm';
import useFetch from '@/shared/lib/hooks/useFetch';
import { httpMethods } from '@/shared/lib/constants/httpMethod';

function App(): JSX.Element {
  const [todos, setTodos] = useState<any[]>([]);
  const { isLoading, data, error } = useFetch<{ content: any[] }>(
    'http://localhost:5555/api/v1/todo',
    httpMethods.GET
  );

  useEffect(() => {
    if (data != null) {
      setTodos([...data.content]);
    }
  }, [data]);

  return (
    <div>
      <div>
        <LoginForm />
      </div>
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
    </div>
  );
}

export default App;

