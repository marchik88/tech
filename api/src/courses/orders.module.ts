import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './orders.controller';
import { LessonController } from './lessons.controller';
import { TaskController } from './task.controller';
import { Order } from './schemas/order.entity';
import { User } from '../users/schemas/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [OrderController, LessonController, TaskController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
