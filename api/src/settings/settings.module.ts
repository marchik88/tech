import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsController } from './settings.controller';
import { Settings } from './schemas/settings.entity';
import { User } from '../users/schemas/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Settings]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
