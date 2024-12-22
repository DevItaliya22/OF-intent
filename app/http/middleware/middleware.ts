import { ConfigService, Inject, IntentMiddleware, MiddlewareNext } from '@intentjs/core';
import { Request, Response } from '@intentjs/hyper-express';
import { verify } from 'jsonwebtoken';
import { Unauthorized } from '@intentjs/core';
import { UserDbRepository } from 'app/repositories/userDbRepository';

export class AuthMiddleware extends IntentMiddleware {
    constructor(
        private config: ConfigService,
        @Inject('USER_DB_REPO') private users: UserDbRepository,
      ) {
        super();
      }
  async use(req: Request, res: Response, next: MiddlewareNext): Promise<void> {
    try {
      const authHeader = req.header('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Unauthorized();
      }

      const token = authHeader.split(' ')[1];
      const secret = this.config.get<string>('auth.secret');
      const payload = verify(token, secret, {
        issuer: this.config.get<string>('app.url'),
      });

      // Attach the payload to the request object
      (req as any).user = payload;
      console.log("Payload from auth middleware", payload);
      console.log("User from auth middleware", req.user);
      next();
    } catch (error) {
      console.error('Auth Middleware Error:', error);
      throw new Unauthorized();
    }
  }
}
