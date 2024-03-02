import { it, describe, beforeAll, afterAll, expect, beforeEach } from 'vitest';
import { app } from '../../../../server';
import { execSync } from 'child_process';
import request from 'supertest';

describe('Create User (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all');
    execSync('npm run knex migrate:latest');
  });

  it('should be able to create a new user', async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
    };

    const response = await request(app.server).post('/users').send(user);

    const cookie = response.get('Set-Cookie');

    expect(response.status).toBe(201);

    expect(cookie).toEqual(
      expect.arrayContaining([expect.stringContaining('sessionId')])
    );
  });
});
