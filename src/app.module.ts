import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@domain/auth/auth.module';
import { AuthMiddleware } from '@infrastructure/util/middlewares/auth.middleware';
import { EventModule } from '@application/event/event.module';

@Module({
  imports: [AuthModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
