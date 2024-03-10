import { render, screen } from '@testing-library/react';
import { MarvelImage } from './MarvelImage';
import Characters from 'app/data/mock/characters.json';

const mockCharacter = Characters.data.results[0];

const renderComponent = () =>
  render(
    <MarvelImage
      src={mockCharacter.thumbnail.path}
      extension={mockCharacter.thumbnail.extension}
      format="portrait_uncanny"
      alt={`${mockCharacter.name} thumbnail`}
    />
  );

describe('Component: MarvelImage', () => {
  it('Should render', () => {
    renderComponent();
    const imageElement = screen.getByAltText(`${mockCharacter.name} thumbnail`);
    expect(imageElement).toBeInTheDocument();
  });
  it('Should render with the correct source', () => {
    renderComponent();
    const imageElement: HTMLImageElement = screen.getByAltText(
      `${mockCharacter.name} thumbnail`
    );
    expect(imageElement.src).toBe(
      `${mockCharacter.thumbnail.path}/portrait_uncanny.${mockCharacter.thumbnail.extension}`
    );
  });
});
