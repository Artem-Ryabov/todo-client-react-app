export interface Task {
  id: number;
  note: string;
  done: boolean;
  date: string;
  idPriority: number;
  priority?: string;
  description?: string;
}