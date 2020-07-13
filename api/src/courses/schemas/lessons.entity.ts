import { Column } from 'typeorm';
import { IsDate } from 'class-validator';

export class Operation {
  @Column()
  name: string;
  @Column()
  tool: string;
  @Column()
  count: number;
  @Column()
  time: number;
  @Column()
  tasks: Array<object>;
  @IsDate()
  @Column()
  createDate: Date;
}
