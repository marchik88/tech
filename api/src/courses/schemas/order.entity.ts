import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { IsDate } from 'class-validator';

@Entity()
export class Order {
  @ObjectIdColumn()
  _id: any;
  @Column()
  name: string;
  @Column()
  mainHeader: string;
  @Column()
  header: string;
  @Column()
  lessons: Array<any>;
  @Column()
  closed: boolean;
  @Column()
  updated: object;
  @IsDate()
  @Column()
  createDate: Date;
}
