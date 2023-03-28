import { DomainEvent } from './domain-event.base';
import { DomainEventClass, DomainEvents } from './domain-events';
import { Logger } from '@libs/ddd/domain/ports/logger.port';

export abstract class DomainEventHandler {
  constructor(
    private readonly event: DomainEventClass,
    protected readonly logger: Logger,
  ) {}

  abstract handle(event: DomainEvent): Promise<void>;

  public listen(): void {
    DomainEvents.subscribe(this.event, this);
  }
}
