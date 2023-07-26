import { Priority } from '@/shared/lib/models/Priority';

interface TodoProps {
  id: number;
  priority: Priority;
  note: string;
  done: boolean;
  markTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

function TodoCard({ id, priority, note, done, markTodo: markTodo, deleteTodo }: TodoProps): JSX.Element {
  return (
    <div style={{display: 'flex', gap: '5px'}}>
      <span>priority: {priority.name}</span>
      <span>{note}</span>
      <input type='checkbox' checked={done} onChange={() => markTodo(id)} />
      <button onClick={() => deleteTodo(id)}></button>
    </div>
  );
}

export default TodoCard;