import { render, screen } from '@testing-library/react';
import { LoadingBar } from './LoadingBar';

const renderComponent = () => render(<LoadingBar />);

describe('Component: LoadingBar', () => {
  it('Should render', () => {
    renderComponent();
    const loadingElement = screen.getByTestId('loading-bar');
    expect(loadingElement).toBeInTheDocument();
  });
});
