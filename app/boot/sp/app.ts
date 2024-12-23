import { IntentApplicationContext, ServiceProvider } from '@intentjs/core';
import { UserDbRepository } from 'app/repositories/userDbRepository';
import { UserService } from 'app/services/userServives';
import { AuthService } from 'app/services/auth';
import { FollowDbRepository } from 'app/repositories/followDbRepository';
import { NotificationDbRepository } from 'app/repositories/notificationDbRepository';
import { PostDbRepository } from 'app/repositories/postDbRepository';

export class AppServiceProvider extends ServiceProvider {
  /**
   * Register any application services here.
   */
  register() {
    /**
     * Binding the UserService with the application.
     *
     * Read more - https://tryintent.com/docs/providers
     */
    this.bind(UserService);

    this.bind(AuthService);
    /**
     * Binding the UserDbRepository with a non-class based token 'USER_DB_REPO'.
     *
     * Read more - https://tryintent.com/docs/providers#class-based-providers
     */
    this.bindWithClass('USER_DB_REPO', UserDbRepository);
    this.bindWithClass('FOLLOW_DB_REPO', FollowDbRepository);
    this.bindWithClass("NOTIFICATION_DB_REPO", NotificationDbRepository);
    this.bindWithClass("POST_DB_REPO", PostDbRepository);
  }

  /**
   * Bootstrap any application service here.
   */
  boot(app: IntentApplicationContext) {}
}
