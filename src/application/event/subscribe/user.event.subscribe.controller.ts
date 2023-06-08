import {
  Controller,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { AppService } from '@src/app.service';

@Controller()
export class UserEventSubscribeController
  implements OnModuleDestroy, OnModuleInit
{
  constructor(
    private readonly service: AppService,
    @Inject('KAFKA_SERVICE') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('user.created');
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @MessagePattern('user.created')
  userCreatedEventHandler(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    console.log(`Topic: ${context.getTopic()}`);
    console.log('Message:', message);
    return [];
  }
}
