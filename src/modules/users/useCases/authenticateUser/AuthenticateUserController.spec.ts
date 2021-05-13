import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcryptjs';

import { app } from '../../../../app';
import createConnection from '../../../../shared/infra/typeorm';

let connection: Connection

describe('Authenticates an user', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash('1234', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, created_at, updated_at)
        values('${id}', 'admin', 'admin@finapp.com', '${password}', 'now()', 'now()')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to authenticate an user', async () => {
    const response = await request(app).post('/api/v1/sessions').send({
      email: 'admin@finapp.com',
      password: '1234'
    });

    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  })
});