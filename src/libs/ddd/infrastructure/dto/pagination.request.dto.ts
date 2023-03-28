import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { Pagination } from './pagination.interface';

export class PaginationRequest implements Pagination {
  @ApiProperty({
    description: 'Page number',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  readonly page: number;

  @ApiProperty({
    description: 'Page limit',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  readonly limit: number;
}
