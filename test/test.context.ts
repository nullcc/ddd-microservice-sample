import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionManager } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '@src/app.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { TestUtils } from './test.utils';
import { fixturesDatabaseConnectionProvider } from './database/database.providers';
import { ExceptionInterceptor } from '@infrastructure/interceptors/exception.interceptor';
import { typeormConfigTest } from '@config/ormconfig-test';

export class TestContext {
  private _server: any;
  private _app: INestApplication;
  private _moduleFixture: TestingModule;
  private _testUtils: TestUtils;

  async setup() {
    this._moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeormConfigTest),
        AppModule,
        DatabaseModule,
      ],
      providers: [
        TestUtils,
        DatabaseService,
        fixturesDatabaseConnectionProvider,
      ],
    }).compile();
    this._app = this._moduleFixture.createNestApplication();
    this._app.useGlobalInterceptors(new ExceptionInterceptor());
    await this._app.init();
    this._server = this._app.getHttpServer();
    this._testUtils = this._moduleFixture.get<TestUtils>(TestUtils);
    await this._testUtils.reloadFixtures();
  }

  async teardown() {
    const conn = getConnectionManager().get('default');
    if (conn.isConnected) {
      await conn.close();
    }
    await this._app.close();
    this._server.close();
  }

  async closeDbConnection() {
    await this._testUtils.closeDbConnection();
  }

  get app(): INestApplication {
    return this._app;
  }
}
