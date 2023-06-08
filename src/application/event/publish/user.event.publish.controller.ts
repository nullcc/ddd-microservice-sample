import {
  Controller,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class UserEventPublishController {
  constructor(@Inject('KAFKA_SERVICE') private readonly client: ClientKafka) {}

  @Post('users')
  createUser() {
    return this.client.emit('user.created', { username: 'foobar' });
  }
}
