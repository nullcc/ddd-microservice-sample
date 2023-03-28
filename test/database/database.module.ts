import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { typeormConfigTest } from '@config/ormconfig-test';
import { fixturesDatabaseConnectionProvider } from './database.providers';
import { TestUtils } from '../test.utils';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfigTest)],
  providers: [DatabaseService, fixturesDatabaseConnectionProvider, TestUtils],
})
export class DatabaseModule {}
