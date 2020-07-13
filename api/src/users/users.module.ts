import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './users.controller';
import { UserAuthController } from './users.auth.controller';
import { jwtConstants } from '../auth/constants';
import { User } from './schemas/user.entity';

import { FacebookStrategyMiddleware } from '../auth/middlewares/facebook.signin';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [UserController, UserAuthController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FacebookStrategyMiddleware)
      .forRoutes(
        { path: 'auth/signin/facebook', method: RequestMethod.GET },
        { path: 'auth/facebook/callback', method: RequestMethod.GET },
      );
  }
}
