import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import { ReactiveFormsModule } from '@angular/forms';
import { server } from '../mocks/server';
import { rest } from 'msw';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  it('can register with the default faction', async () => {
    const callsign = faker.internet.userName();
    const token = faker.string.uuid();
    server.use(
      rest.post('/register', (req, res, ctx) =>
        res(ctx.json({ token, agent: { symbol: callsign } }))
      )
    );
    await render(AppComponent, {
      imports: [HttpClientModule, ReactiveFormsModule],
    });
    userEvent.click(screen.getByRole('button', { name: /register/i }));
    userEvent.type(await screen.findByLabelText(/callsign/i), callsign);
    userEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(await screen.findByText(token)).toBeInTheDocument();
    expect(screen.getByText(callsign)).toBeInTheDocument();
  });

  it('can login', async () => {
    const callsign = faker.internet.userName();
    const token = faker.string.uuid();
    await render(AppComponent);
    userEvent.click(screen.getByRole('button', { name: /login/i }));
    userEvent.type(screen.getByLabelText(/token/i), token);
    userEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findByText(token)).toBeInTheDocument();
    expect(screen.getByText(callsign)).toBeInTheDocument();
  });
});
