import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserEventPublishController } from '@application/event/publish/user.event.publish.controller';
import { UserEventSubscribeController } from '@application/event/subscribe/user.event.subscribe.controller';
import { AppService } from '@src/app.service';
import { KAFKA_CONFIG } from '@infrastructure/config/kafka.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_CONFIG.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: KAFKA_CONFIG.clientId,
            brokers: KAFKA_CONFIG.brokers,
          },
          consumer: {
            groupId: KAFKA_CONFIG.group.user,
          },
        },
      },
    ]),
  ],
  controllers: [UserEventPublishController, UserEventSubscribeController],
  providers: [AppService],
})
export class EventModule {}
