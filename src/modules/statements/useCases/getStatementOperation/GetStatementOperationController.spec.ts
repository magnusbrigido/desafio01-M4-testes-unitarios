import request from 'supertest';
import { Connection } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcryptjs';

import { app } from '../../../../app';
import createConnection from '../../../../shared/infra/typeorm';

let connection: Connection;

describe('get a statement', () => {
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

  it('Should return a deposit statement', async () => {
    const responseToken = await request(app).post('/api/v1/sessions').send({
      email: 'admin@finapp.com',
      password: '1234'
    });

    const { token } = responseToken.body;

    const responseDeposit = await request(app).post('/api/v1/statements/deposit')
      .send({
        amount: 100,
        description: 'Deposit statement'
      })
      .set({
        Authorization: `Bearer ${ token }`
      });

    const { id } = responseDeposit.body;

    const response = await request(app).get(`/api/v1/statements/${id}`)
      .set({
        Authorization: `Bearer ${ token }`
      });

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(200);
  });

  it('Should return a withdraw statement', async () => {
    const responseToken = await request(app).post('/api/v1/sessions').send({
      email: 'admin@finapp.com',
      password: '1234'
    });

    const { token } = responseToken.body;

    const responseWithdraw = await request(app).post('/api/v1/statements/withdraw')
      .send({
        amount: 25,
        description: 'withdraw statement'
      })
      .set({
        Authorization: `Bearer ${ token }`
      });

    const { id } = responseWithdraw.body;

    const response = await request(app).get(`/api/v1/statements/${id}`)
      .set({
        Authorization: `Bearer ${ token }`
      });

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(200);
  });
});