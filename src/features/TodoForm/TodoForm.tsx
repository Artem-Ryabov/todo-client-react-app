import changeInput from '@/shared/lib/helpers/changeInput';
import useFetch from '@/shared/lib/hooks/useFetch';
import { NewTask } from '@/shared/lib/models/NewTask';
import { useCallback, useEffect, useState } from 'react';

interface TodoFormProps {
  submit: (task: NewTask) => void;
}

function TodoForm({ submit }: TodoFormProps): JSX.Element {
  const [note, setNote] = useState('');
  const [priority, setPriority] = useState<any[]>([]);
  const [desc, setDesc] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<number>(0);
  const { isLoading, data, error } = useFetch<any[]>(
    'http://localhost:5555/api/v1/todo/priority'
  );

  useEffect(() => setPriority(data?.content ?? []), [data]);

  const select = useCallback(
    (e: any) => setSelectedPriority(parseInt(e.target?.value ?? 0)),
    [setSelectedPriority]
  );

  const addTodo = useCallback(() => {
    const task: NewTask = {
      note,
      idPriority: selectedPriority,
    };
    submit(task);
  }, [note, selectedPriority, desc]);

  return (
    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
      <select onChange={select}>
        {priority.map(p => (
          <option
            key={p.id}
            value={p.id}
          >
            {p.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={note}
        onChange={changeInput(setNote)}
      />
      <input
        type="text"
        value={desc}
        onChange={changeInput(setDesc)}
      />
      <button onClick={() => addTodo()}>Add</button>
    </div>
  );
}

export default TodoForm;
