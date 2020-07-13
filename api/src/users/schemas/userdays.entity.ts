import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { IsEmail, IsDate } from 'class-validator';

@Entity()
export class UserDays {
  @ObjectIdColumn()
  _id: any;
  @Column()
  uid: string;
  @Column()
  date: string;
  @Column({ default: [] })
  tasks: Array<any>;
  @IsDate()
  @Column()
  createDate: Date;
}
