import { Pagination } from '@libs/ddd/infrastructure/dto/pagination.interface';
import { PAGINATION_CONFIG } from '@infrastructure/config/pagination.config';

export class PaginationHttpController {
  protected getPaginationParams<T extends Pagination>(request: T): Pagination {
    let page, limit;
    if (undefined === request.page || request.page < 0) {
      page = 1;
    } else {
      page = parseInt(request.page.toString(), 10);
    }
    if (undefined === request.limit || request.limit < 0) {
      limit = PAGINATION_CONFIG.limit;
    } else {
      limit = parseInt(request.limit.toString(), 10);
    }
    return {
      page,
      limit,
    };
  }
}
