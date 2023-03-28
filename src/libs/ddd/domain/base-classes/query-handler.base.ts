import { Result } from '@libs/ddd/domain/utils/result.util';

export abstract class Query {}

export interface PaginationQueryProps {
  paginated?: boolean;
  page?: number;
  limit?: number;
}

export class PaginationQuery extends Query {
  constructor(props: PaginationQueryProps) {
    super();
    this.paginated = props.paginated;
    this.page = props.page;
    this.limit = props.limit;
  }

  readonly paginated?: boolean;

  readonly page?: number;

  readonly limit?: number;
}

export abstract class QueryHandlerBase {
  // For consistency with a CommandHandlerBase and DomainEventHandler
  abstract handle(query: Query): Promise<Result<unknown>>;

  execute(query: Query): Promise<Result<unknown>> {
    return this.handle(query);
  }
}
