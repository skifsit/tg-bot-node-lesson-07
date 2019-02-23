import { createTestConfig } from '../../config';

import { createPgDB, initializePgDB, PgDBT, destroyPgDb } from '../db';

describe('Check create, initialize and destroy DB', () => {
  let config;
  let pgDB: PgDBT;

  beforeAll(async () => {
    config = createTestConfig();
    pgDB = createPgDB(config.db_section);
    await initializePgDB(pgDB);
  })

  test('Create db test', () => {

    expect(pgDB).toBeDefined();

    expect(pgDB).toHaveProperty('db', expect.any(Object));
    expect(pgDB).toHaveProperty('pgp', expect.any(Function));
  })

  afterAll(async () => {
    await destroyPgDb(pgDB)
  })
})
