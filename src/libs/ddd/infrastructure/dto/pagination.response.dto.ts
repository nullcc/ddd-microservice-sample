import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { DataWithPaginationMeta } from '@libs/ddd/domain/ports/repository.ports';
import { Pagination } from './pagination.interface';
import { Entity } from '@libs/ddd/domain/base-classes/entity.base';
import { ResponseBase } from '@libs/ddd/interface-adapters/base-classes/response.base';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EntityProps {}

export class PaginationResponse<
  T extends Entity<EntityProps>,
  R extends ResponseBase,
> implements Pagination
{
  constructor(data: DataWithPaginationMeta<T[]>, entityResponseCls: Type<R>) {
    this.data = data.data.map((element) => new entityResponseCls(element));
    this.count = data.count;
    this.page = data.page;
    this.limit = data.limit;
  }

  @ApiProperty({
    description: 'Entities',
  })
  data: R[];

  @ApiProperty({
    description: 'Total count',
  })
  count: number;

  @ApiProperty({
    description: 'Page number',
  })
  page: number;

  @ApiProperty({
    description: 'Page limit',
  })
  limit: number;
}
