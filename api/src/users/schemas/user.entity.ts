import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { IsEmail, IsDate } from 'class-validator';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: any;
  @IsEmail()
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  token: string;
  @Column()
  photo: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ default: 'worker' })
  role: string;
  @IsDate()
  @Column()
  createDate: Date;
}
