import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemonList from '../data';

// const isPokemonFavorite = {
//   4: true,
//   10: false,
//   23: false,
//   25: true,
//   65: false,
//   78: false,
//   143: false,
//   148: false,
//   151: false,
// };

describe('Pokemon.js', () => {
  it('should renderize a card with the info about a certain Pokémon', () => {
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
});
