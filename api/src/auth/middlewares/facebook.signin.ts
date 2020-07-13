import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { use, authenticate } from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

use(
  new FacebookStrategy(
    {
      clientID: '625858095007421',
      clientSecret: 'd90fb830b87e6af5c6b0a7c57fa5c8eb',
      callbackURL: 'http://localhost:8989/auth/facebook/callback',
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile, 'profile');

      return cb(null, profile);
    },
  ),
);

@Injectable()
export class FacebookStrategyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...');

    authenticate('facebook', (err, user, profile = { _json: '' }) => {
      if (err) {
        res.status(400).send({ error: '123' });
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      req.auth = user;
      req.body = {
        email: profile._json.email,
        password: `Facebook${profile.id}`,
        nickname: profile.name.givenName,
        image: profile.photos[0].value,
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      res.status(200).send({ status: 'ok' });
      //   user ? ((req.auth = user), next()) : next();
    })(req, res, next);
  }
}
