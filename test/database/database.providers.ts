import { createConnection } from 'typeorm';
import { Provider } from '@nestjs/common';
import { typeormConfigTest } from '@config/ormconfig-test';

export const fixturesDatabaseConnectionSymbol = Symbol(
  'FixturesDatabaseConnectionSymbol',
);

export const fixturesDatabaseConnectionProvider: Provider = {
  provide: fixturesDatabaseConnectionSymbol,
  useValue: (async () => {
    return await createConnection({
      ...typeormConfigTest,
      name: 'fixtures',
    });
  })(),
};
