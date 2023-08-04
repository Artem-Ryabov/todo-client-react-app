import { Priority } from '@/shared/lib/models/Priority';
import { useState } from 'react';
import { Todo } from './lib/models/Todo';

interface TodoProps {
  todo: Todo;
  markTodo: (id: number, done: boolean) => void;
  deleteTodo: (id: number) => void;
}

function TodoCard({
  todo: { id, priority, note, done },
  markTodo,
  deleteTodo
}: TodoProps): JSX.Element {
  return (
    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
      <span>priority: {priority}</span>
      <span>{note}</span>
      <input
        type="checkbox"
        checked={done}
        onChange={() => markTodo(id, !done)}
      />
      <button onClick={() => deleteTodo(id)}>Delete</button>
    </div>
  );
}

export default TodoCard;
