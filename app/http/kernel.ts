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

export class HttpKernel extends Kernel {
  /**
   * Global registry for all of the controller classes.
   * Read more - https://tryintent.com/docs/controllers
   */
  public controllers(): Type<any>[] {
    const controllers = [UserController, MainController, AuthController];
    return [UserController ,MainController, AuthController];
  }

  /**
   * Register all of your global middlewares here.
   * Middlewares added in the return array will be
   * applied to all routes by default.
   *
   * Read more - https://tryintent.com/docs/middlewares
   */
  public middlewares(): Type<IntentMiddleware>[] {
    return [CorsMiddleware];
  }

  /**
   * Register all of your route based middlewares here.
   * You can apply middlewares to group of routes, controller classes
   * or exclude them.
   *
   * Read more - https://tryintent.com/docs/middlewares
   */
  public routeMiddlewares(configurator: MiddlewareConfigurator) {
    return;
  }

  /**
   * Register all of your global guards here.
   * Guards added in the return array will be
   * applied to all routes by default.
   *
   * Read more - https://tryintent.com/docs/guards
   */
  public guards(): Type<IntentGuard>[] {
    return [];
  }

  /**
   * @param app
   */
  public async boot(app: Server): Promise<void> {}
}
