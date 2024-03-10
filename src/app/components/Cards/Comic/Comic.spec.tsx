import { render, screen } from '@testing-library/react';
import { Comic } from './Comic';
import Comics from 'app/data/mock/comics.json';

const mockComic = Comics.data.results[0];
const onSaleDate = mockComic.dates.find(
  (date: { [key: string]: string }) => date.type === 'onsaleDate'
);
const comicYear = onSaleDate ? onSaleDate.date.slice(0, 4) : '';

const renderComponent = () => render(<Comic comic={mockComic} />);

describe('Component: Comic', () => {
  it('Should render', () => {
    renderComponent();
    const mainElement = screen.getByTestId('comic-card');
    expect(mainElement).toBeInTheDocument();
  });
  it('Should render with the correct thumbnail', () => {
    renderComponent();
    const imageElement: HTMLImageElement = screen.getByAltText(
      `${mockComic.title} front page`
    );
    expect(imageElement.src).toBe(
      `${mockComic.thumbnail.path}/portrait_incredible.${mockComic.thumbnail.extension}`
    );
  });
  it('Should render with the correct title', () => {
    renderComponent();
    const titleElement = screen.getByText(mockComic.title);
    expect(titleElement).toBeInTheDocument();
  });
  it('Should render with the correct year', () => {
    renderComponent();
    const titleElement = screen.getByText(comicYear);
    expect(titleElement).toBeInTheDocument();
  });
});
