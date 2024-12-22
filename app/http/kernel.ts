import {
  CorsMiddleware,
  IntentGuard,
  IntentMiddleware,
  Kernel,
  MiddlewareConfigurator,
  Type,
} from '@intentjs/core';
import { MainController } from './controllers/app';
import { AuthController } from './controllers/auth';
import { UserController } from './controllers/user';
import { Server } from '@intentjs/hyper-express';
import bodyParser from 'body-parser';

export class HttpKernel extends Kernel {
  /**
   * Global registry for all of the controller classes.
   * Read more - https://tryintent.com/docs/controllers
   */
  public controllers(): Type<any>[] {
    return [UserController, MainController, AuthController];
  }

  /**
   * Register all of your global middlewares here.
   * Middlewares added in the return array will be
   * applied to all routes by default.
   */
  public middlewares(): Type<IntentMiddleware>[] {
    return [CorsMiddleware];
  }

  /**
   * Register all of your route-based middlewares here.
   * You can apply middlewares to groups of routes, controller classes,
   * or exclude them.
   */
  public routeMiddlewares(configurator: MiddlewareConfigurator) {
    // Add body parser middleware here
    // configurator.use(bodyParser);  // Adds JSON body parsing middleware
    return [bodyParser.json()]
  }

  /**
   * Register all of your global guards here.
   * Guards added in the return array will be
   * applied to all routes by default.
   */
  public guards(): Type<IntentGuard>[] {
    return [];
  }

  /**
   * @param app
   */
  public async boot(app: Server): Promise<void> {}
}
