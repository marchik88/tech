import { TaskInput } from './tasks.input';

export class OperationInput {
  name: string;
  count: number;
  time: number;
  tasks: Array<TaskInput>;
  createDate: Date;
}
