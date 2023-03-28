import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemonList from '../data';

describe('Pokemon.js', () => {
  it('should render a card with information about a specific Pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite />);
    const pikachuName = screen.getByText(/pikachu/i);
    expect(pikachuName).toBeInTheDocument();

    const pikachuType = screen.getByText(/electric/i);
    expect(pikachuType).toBeInTheDocument();

    const pikachuWeight = screen.getByText(/Average weight: 6.0 kg/i);
    expect(pikachuWeight).toBeInTheDocument();

    const pikachuImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pikachuImg.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pikachuImg.alt).toBe('Pikachu sprite');
    expect(pikachuImg).toBeInTheDocument();
  });

  it('should have a link to pokemon details', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemonList[1] }
      isFavorite
    />);

    const linkToDetails = screen.getByRole('link', { name: /details/i });
    userEvent.click(linkToDetails);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemon/4');
  });

  it('should exist a star icon on the favorited pokemons', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonList[2] }
      isFavorite
    />);

    const starIcon = screen.getByRole('img', {
      name: /caterpie is marked as favorite/i,
    });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
    expect(starIcon.alt).toBe('Caterpie is marked as favorite');
  });
});
