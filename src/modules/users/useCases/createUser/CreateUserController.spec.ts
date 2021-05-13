import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '../../../../app';
import createConnection from '../../../../shared/infra/typeorm';

let connection: Connection;

describe('Create an user', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create an user', async () => {
    const response = await request(app).post('/api/v1/users').send({
      name: 'Magnus',
      email: 'magnus@email.com',
      password: '1234'
    });

    expect(response.status).toBe(201);
  });
});