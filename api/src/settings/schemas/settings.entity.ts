import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { IsDate } from 'class-validator';

@Entity()
export class Settings {
  @ObjectIdColumn()
  _id: any;
  @Column()
  type: string;
  @Column()
  mode: string;
  @Column()
  text: any;
  @IsDate()
  @Column()
  createDate: Date;
}
