import { render, screen } from '@testing-library/react';
import { HorizontalScrollViewer } from './HorizontalScrollViewer';
import Comics from 'app/data/mock/comics.json';

const mockComics = Comics.data.results;

const renderComponent = () =>
  render(<HorizontalScrollViewer comics={mockComics} />);

describe('Component: HorizontalScrollViewer', () => {
  it('Should render with the main element', () => {
    renderComponent();
    const mainElement = screen.getByTestId('horizontal-scroll');
    expect(mainElement).toBeInTheDocument();
  });
  it('Should render with the correct title', () => {
    renderComponent();
    const titleElement = screen.getByText('Comics');
    expect(titleElement).toBeInTheDocument();
  });
  it('Should render with all the comics', () => {
    renderComponent();
    const scrollingDivElement = screen.getByTestId('scrolling-comics');
    expect(scrollingDivElement.childElementCount).toBe(mockComics.length);
  });
});
