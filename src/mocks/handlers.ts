import { faker } from '@faker-js/faker';
import { PathParams, rest } from 'msw';
import { RegisterRequest, RegisterResponse } from '@auth/register/types';

export const handlers = [
  rest.post<RegisterRequest, PathParams<never>, RegisterResponse>(
    '/register',
    async (req, res, ctx) => {
      const { symbol, faction } = await req.json<RegisterRequest>();
      return res(
        ctx.json({
          data: {
            agent: {
              accountId: faker.string.uuid(),
              symbol: symbol.toUpperCase(),
              startingFaction: faction,
            },
            token: faker.string.uuid(),
          },
        })
      );
    }
  ),
  rest.get('/my/agent', async (req, res, ctx) =>
    res(
      ctx.json({
        data: {
          accountId: faker.string.uuid(),
          symbol: faker.internet.userName().toUpperCase(),
        },
      })
    )
  ),
];
