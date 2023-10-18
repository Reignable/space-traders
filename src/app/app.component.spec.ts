import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('renders', async () => {
    await render(AppComponent);
    expect(screen.getByText(/app works!/i)).toBeInTheDocument();
  });
});
