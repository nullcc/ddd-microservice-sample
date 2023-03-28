import { Inject, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { fixturesDatabaseConnectionSymbol } from './database.providers';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject(fixturesDatabaseConnectionSymbol)
    public connection: Connection,
  ) {}

  async getRepository<T>(entity): Promise<Repository<T>> {
    return this.connection.getRepository(entity);
  }
}
