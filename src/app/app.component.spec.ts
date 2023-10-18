import { HttpClientModule } from '@angular/common/http';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from '../mocks/server';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

describe('AppComponent', () => {
  it('can register with the default faction', async () => {
    const symbol = faker.internet.userName();
    const token = faker.string.uuid();
    server.use(
      rest.post('/register', (req, res, ctx) =>
        res(ctx.json({ token, agent: { symbol } }))
      )
    );
    await render(AppComponent, {
      routes: appRoutes,
      imports: [HttpClientModule],
      initialRoute: 'auth/login',
    });
    userEvent.click(screen.getByRole('link', { name: /register/i }));
    userEvent.type(await screen.findByLabelText(/callsign/i), symbol);
    userEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(await screen.findByText(token)).toBeInTheDocument();
    expect(screen.getByText(symbol)).toBeInTheDocument();
    expect(screen.queryByLabelText(/callsign/i)).not.toBeInTheDocument();
  });

  it('can login', async () => {
    const symbol = faker.internet.userName();
    const token = faker.string.uuid();
    server.use(
      rest.get('/my/agent', (req, res, ctx) => {
        console.log(req.headers.get('Authorization'));
        return res(ctx.json({ symbol }));
      })
    );
    await render(AppComponent, {
      routes: appRoutes,
      imports: [HttpClientModule],
      initialRoute: 'auth/login',
    });
    userEvent.type(screen.getByLabelText(/token/i), token);
    userEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findByText(token)).toBeInTheDocument();
    expect(screen.getByText(symbol)).toBeInTheDocument();
  });
});
