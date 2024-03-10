import { render, screen } from '@testing-library/react';
import { NotFound } from './NotFound';

const renderComponent = () => render(<NotFound />);

describe('Page: NotFound', () => {
  it('Should render', () => {
    renderComponent();
    const notFoundElement = screen.getByTestId('page-not-found');
    expect(notFoundElement).toBeInTheDocument();
  });
  it('Should render the Not Found message', () => {
    renderComponent();
    const messageElement = screen.getByText('Not found');
    expect(messageElement).toBeInTheDocument();
  });
});
